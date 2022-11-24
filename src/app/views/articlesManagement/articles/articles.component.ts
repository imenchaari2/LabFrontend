import {Component, Input, NgZone, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
// import {DialogComponent} from '../dialog/dialog.component';
// import {SelectAuteurComponent} from '../select-auteur/select-auteur.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MemberService} from "../../../shared/services/labServices/memberService";
import {Article} from "../../../shared/models/article";
import {ArticleService} from "../../../shared/services/labServices/articleService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppConfirmService} from "../../../shared/services/app-confirm/app-confirm.service";
import {AppLoaderService} from "../../../shared/services/app-loader/app-loader.service";
import {AddArticleComponent} from "../add-article/add-article.component";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {FilterByRecruitDayPeriodComponent} from "../../membersManagement/filterDate/filterByRecruitDayPeriod.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource: MatTableDataSource<Article>;
  public refresh: Subject<any> = new Subject();
  @Input() auteur!: string;
  rows: any[];
  temp = [];
  columns = [
    {
      prop: 'title',
      name: 'title'
    },
    {
      prop: 'type',
      name: 'type'
    },
    {
      prop: 'url',
      name: 'url'
    },
    {
      prop: 'pdfSource',
      name: 'Pdf source'
    },
    {
      prop: 'createdDate',
      name: 'Date'
    },
    {
      prop: 'information.email',
      name: 'Author'
    },
    {
      prop: 'actions',
      name: 'Actions'
    }
  ];

  constructor(private articleService: ArticleService, private memberService: MemberService , private dialog: MatDialog,
              private snack: MatSnackBar,
              private confirmService: AppConfirmService,
              private loader: AppLoaderService,
              private router: Router,
              private ngZone: NgZone,

  private _snackBar: MatSnackBar,
) {
  }
  ngOnInit(): void {
    this.getListArticles();
  }
  private getListArticles() {
    this.articleService.getAllArticles().subscribe(value => {
      if (!!value) {
        this.rows = this.temp = value;
        console.log(this.rows);
      }
    });
    return this.rows;
  }
  openPopUp(data: any = {}, isNew?) {
    const title = isNew ? 'Add new article' : 'Update article';
    const action = isNew ? 'add' : 'edit';
    const dialogRef: MatDialogRef<any> = this.dialog.open(AddArticleComponent, {
      width: '720px',
      disableClose: true,
      data: {title, action, payload: data}
    });
    dialogRef.afterClosed()
        .subscribe(res => {
          const article = res.article;
          if (!res) {
            // If user press cancel
            return;
          }
          if (isNew) {
              console.log(article)
            this.articleService.addArticle(article).subscribe(res => {
              this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
              this.getListArticles();
              this.refresh.next();

            });
          } else {
            this.articleService.updateArticle(article, article.articleId).subscribe(res => {
              this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
              this.getListArticles();
              this.refresh.next();
            });
          }
        });
  }
  // affect(article: any): void {
  //   const dialogRef = this.matDialog.open(SelectAuteurComponent, {
  //     width: '250px',
  //     height: '250px',
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result.data)
  //     if (result) {
  //       this.articleService.updateArticle(article, result.data).then(async () => {
  //         // await this.fetchDataSource();
  //       });
  //     }
  //   });
  //
  // }

  deleteItem(title, id: string) {
    this.confirmService.confirm({message: `Delete ${title}?`})
        .subscribe(result => {
          if (result) {
            this.articleService.deleteArticle(id).subscribe(async () => {
              this.snack.open('Article deleted!', 'OK', {duration: 4000});
              this.getListArticles();
              this.refresh.next();
            });
          }
        });
  }
  openDialog(): void {
    const isArchived = false;
    const dialogRef = this.dialog.open(FilterByRecruitDayPeriodComponent, {
      width: '600px',
      data: {isArchived}

    });
    dialogRef.afterClosed().subscribe(result => {
      this.rows = result.data;
    });
  }
  filterBySearchField(event) {
    // switch (event.target.placeholder) {
    //     case 'filter by Name': {
    //         this.fullName = event.target.value;
    //         break;
    //     }
    //     case 'filter by Grade': {
    //         this.grade = event.target.value;
    //         break;
    //     }
    //     case 'filter by Department': {
    //         this.department = event.target.value;
    //         break;
    //     }
    //     default: {
    //         break;
    //     }
    // }
    // this.employeeService.filterBySearchFields(this.fullName, this.grade, this.department, false).subscribe(value => {
    //     if (!!value) {
    //         this.rows = this.temp = value;
    //         console.log(this.rows);
    //     }
    // });
    // return this.rows;
  }
}
