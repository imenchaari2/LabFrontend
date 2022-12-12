import {Component, NgZone, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
// import {DialogComponent} from '../dialog/dialog.component';
// import {SelectMemberComponent} from '../select-auteur/select-auteur.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MemberService} from '../../../shared/services/labServices/memberService';
import {Article} from '../../../shared/models/article';
import {ArticleService} from '../../../shared/services/labServices/articleService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AddArticleComponent} from '../add-article/add-article.component';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Teacher} from '../../../shared/models/Teacher';
import {SelectAuteurComponent} from '../affect-Author/select-auteur.component';
import {Member} from '../../../shared/models/member';
import {
    FilterByCreatedDatePeriodComponent
} from '../../membersManagement/filterDate/filterByCreatedDatePeriod.component';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from "@angular/common";
import {SelectMemberComponent} from "../../app-calendar/affect-Member/select-member.component";
import {JwtAuthService} from "../../../shared/services/auth/jwt-auth.service";

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
    dataSource: MatTableDataSource<Article>;
    public refresh: Subject<any> = new Subject();
    auteur!: Member;
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
            prop: 'authorName',
            name: 'Author'
        },
        {
            prop: 'actions',
            name: 'Actions'
        }
    ];
    title = '';
    type = '';
    authorName = '';
    myControl = new FormControl('');
    supervisors: string[] = [];
    options: Teacher[] = [];
    filteredOptions: Observable<string[]>;
    myDatePipe!: any;
    membersIds: string[] = [];
    affectedMembers: Member[];
    role: string;
    currentUserId: string;

    constructor(private articleService: ArticleService, private memberService: MemberService, private dialog: MatDialog,
                private snack: MatSnackBar,
                datepipe: DatePipe,
                private confirmService: AppConfirmService,
                private loader: AppLoaderService,
                private router: Router,
                private ngZone: NgZone,
                private _snackBar: MatSnackBar,
                private authService: JwtAuthService,
    ) {
        this.myDatePipe = datepipe;
        this.role = this.authService.getUser().role;
        this.currentUserId = this.authService.getUser().id;

    }

    ngOnInit(): void {
        this.getAllMembers();
        this.getListArticles();
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );

    }

    contains(article: Article, id: string): boolean {
        return article.membersIds.indexOf(id) !== -1;
    }

    onDownloadFile(filename: string): void {
        this.memberService.download(filename).subscribe(
            event => {
                console.log(event);
                // this.resportProgress(event);
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.supervisors.filter(option => option.toLowerCase().includes(filterValue));
    }

    private getAllMembers() {
        this.memberService.getAllAuthors().subscribe(value => {
            if (!!value) {
                value.map(member => {
                    this.supervisors.push(member.firstName + ' ' + member.lastName);
                });
            }
        });
    }

    async getListArticles() {
        this.articleService.getAllArticles().subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
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
                const source = res.source;
                article.createdDate = this.myDatePipe.transform(article.createdDate, 'yyyy-MM-dd');
                if (!res) {
                    // If user press cancel
                    return;
                }
                if (isNew) {
                    console.log(article);
                    this.articleService.addArticle(this.currentUserId,article, source).subscribe(async () => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        await this.getListArticles();
                        this.refresh.next();

                    });
                } else {
                    this.articleService.updateArticle(article, article.articleId, source).subscribe(async () => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        await this.getListArticles();
                        this.refresh.next();
                    });
                }
            });
    }

    affect(article: Article): void {
        const isArticle = true;
        const dialogRef = this.dialog.open(SelectMemberComponent, {
            width: '450px',
            data: {payload: article, isArticle},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result.data)
                this.affectedMembers = result.data;
                this.affectedMembers.map(member => {
                    this.membersIds.push(member.id);
                });
                this.articleService.affectAuthorsToArticle(article.articleId, this.membersIds).subscribe(res => {
                    this.getListArticles();
                    this.refresh.next();

                    this._snackBar.open('members affected successfully !', '', {duration: 1000});


                });
            }
        });

    }

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
        const isStudent = false;
        const dialogRef = this.dialog.open(FilterByCreatedDatePeriodComponent, {
            width: '600px',
            data: {isStudent}

        });
        dialogRef.afterClosed().subscribe(result => {
            this.rows = result.data;
        });
    }

    filterBySearchField(event) {
        switch (event.target.placeholder) {
            case 'filter by Title': {
                this.title = event.target.value;
                break;
            }
            case 'filter by Type': {
                this.type = event.target.value;
                break;
            }

            default: {
                break;
            }
        }
        this.articleService.findArticleBySearch(this.title, this.type).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }

    filterByAuthorName(event) {
        switch (event.target.placeholder) {
            case 'filter by Author': {
                this.authorName = event.target.value;
                break;
            }
            default: {
                break;
            }
        }
        this.articleService.findArticleByAuthorName(this.authorName).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }
}
