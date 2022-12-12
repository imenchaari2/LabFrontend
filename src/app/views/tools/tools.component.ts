import {Component, NgZone, OnInit} from '@angular/core';
import {MemberService} from "../../shared/services/labServices/memberService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppConfirmService} from "../../shared/services/app-confirm/app-confirm.service";
import {AppLoaderService} from "../../shared/services/app-loader/app-loader.service";
import {Router} from "@angular/router";
import {JwtAuthService} from "../../shared/services/auth/jwt-auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {Article} from "../../shared/models/article";
import {Observable, Subject} from "rxjs";
import {Member} from "../../shared/models/member";
import {AddArticleComponent} from "../articlesManagement/add-article/add-article.component";
import {SelectMemberComponent} from "../app-calendar/affect-Member/select-member.component";
import {FilterByCreatedDatePeriodComponent} from "../membersManagement/filterDate/filterByCreatedDatePeriod.component";
import {ToolService} from "../../shared/services/labServices/ToolService";
import {Tool} from "../../shared/models/tool";
import {SelectAuteurComponent} from "../articlesManagement/affect-Author/select-auteur.component";
import {FormControl} from "@angular/forms";
import {AddToolComponent} from "./add-tool/add-tool.component";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  public refresh: Subject<any> = new Subject();
  memeber!: Member;
  rows: any[];
  temp = [];
  columns = [
    {
      prop: 'source',
      name: 'Source'
    },
    {
      prop: 'createdDate',
      name: 'Date'
    },
    {
      prop: 'memberName',
      name: 'Member Name'
    },
    {
      prop: 'actions',
      name: 'Actions'
    }
  ];
  role: string;
  currentUserId: string;
  authorName = '';
  myControl = new FormControl('');
  supervisors: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private memberService: MemberService,
              private toolService: ToolService,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private confirmService: AppConfirmService,
              private loader: AppLoaderService,
              private router: Router,
              private ngZone: NgZone,
              private _snackBar: MatSnackBar,
              private authService: JwtAuthService) {
    this.role = this.authService.getUser().role;
    this.currentUserId = this.authService.getUser().id;
  }

  ngOnInit(): void {
    this.getListTools();
  }
  async getListTools() {
    this.toolService.getAllTools().subscribe(value => {
      if (!!value) {
        console.log(value);
        this.rows = this.temp = value;
      }
    });
    return this.rows;
  }

  contains(tool: Tool, id: string): boolean {
    return tool.memberId === id;
  }
  openPopUp(data: any = {}, isNew?) {
    const title = isNew ? 'Add new tool' : 'Update tool';
    const action = isNew ? 'add' : 'edit';
    const dialogRef: MatDialogRef<any> = this.dialog.open(AddToolComponent, {
      width: '720px',
      disableClose: true,
      data: {title, action, payload: data}
    });
    dialogRef.afterClosed()
        .subscribe(res => {
          const tool = res.tool;
          if (!res) {
            // If user press cancel
            return;
          }
          if (isNew) {
            console.log(tool);
            this.toolService.addTool(tool,this.currentUserId).subscribe(async () => {
              this._snackBar.open('your tool has been added successfully', '', {duration: 1000});
              await this.getListTools();
              this.refresh.next();

            });
          } else {
            this.toolService.updateTool(tool.id, tool).subscribe(async () => {
              this._snackBar.open('your tool has been updated successfully', '', {duration: 1000});
              await this.getListTools();
              this.refresh.next();
            });
          }
        });
  }

  affect(tool: Tool): void {
    const isTool = true;
    const dialogRef = this.dialog.open(SelectAuteurComponent, {
      width: '450px',
      data: {payload: tool, isTool},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.data)
        this.toolService.affectMemberToTool(result.data.id , tool.id ).subscribe(res => {
          this.getListTools();
          this.refresh.next();

          this._snackBar.open('member affected successfully !', '', {duration: 1000});


        });
      }
    });

  }

  deleteItem(id: string) {
    this.confirmService.confirm({message: `Delete this tool ?`})
        .subscribe(result => {
          if (result) {
            this.toolService.deleteTool(id).subscribe(async () => {
              this.snack.open('Tool deleted!', 'OK', {duration: 4000});
              await this.getListTools();
              this.refresh.next();
            });
          }
        });
  }

  openDialog(): void {
    const isTool = true;
    const dialogRef = this.dialog.open(FilterByCreatedDatePeriodComponent, {
      width: '600px',
      data: {isTool}

    });
    dialogRef.afterClosed().subscribe(result => {
      this.rows = result.data;
    });
  }
  filterByAuthorName(event) {
    switch (event.target.placeholder) {
      case 'filter by Member': {
        this.authorName = event.target.value;
        break;
      }
      default: {
        break;
      }
    }
    this.toolService.findToolByAuthorName(this.authorName).subscribe(value => {
      if (!!value) {
        this.rows = this.temp = value;
        console.log(this.rows);
      }
    });
    return this.rows;
  }

}
