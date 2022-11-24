import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {MemberService} from '../../../shared/services/labServices/memberService';
import {Member} from '../../../shared/models/member';
import {AddStudentComponent} from '../add-student/add-student.component';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {FilterByRecruitDayPeriodComponent} from "../filterDate/filterByRecruitDayPeriod.component";

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    rows: any[];
    temp = [];
    columns = [
        {
            prop: 'firstName',
            name: 'First Name'
        },
        {
            prop: 'lastName',
            name: 'Last Name'
        },
        {
            prop: 'email',
            name: 'Email'
        },
        {
            prop: 'cin',
            name: 'Cin'
        },
        {
            prop: 'cv',
            name: 'Cv'
        },
        {
            prop: 'birthDate',
            name: 'Birth date'
        },
        {
            prop: 'createdDate',
            name: 'Created day'
        },
        {
            prop: 'inscriptionDate',
            name: 'Inscription date'
        },
        {
            prop: 'diploma',
            name: 'Diploma'
        },
        {
            prop: 'supervisor.firstName',
            name: 'Supervisor'
        },
        {
            prop: 'actions',
            name: 'Actions'
        }
    ];
    member: Member;
    public refresh: Subject<any> = new Subject();

    firstName = '';
    lastName = '';
    diploma = '';
    cin = '';

    constructor(private memberService: MemberService,
                private dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private confirmService: AppConfirmService,
                private loader: AppLoaderService,
                private router: Router,
                private ngZone: NgZone,) {
    }

    ngOnInit(): void {
        this.getListStudents();
    }

    private getListStudents() {
        this.memberService.getAllStudents().subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }

    openPopUp(data: any = {}, isNew?) {
        const title = isNew ? 'Add new member' : 'Update member';
        const action = isNew ? 'add' : 'edit';

        const dialogRef: MatDialogRef<any> = this.dialog.open(AddStudentComponent, {
            width: '720px',
            disableClose: true,
            data: {title, action, payload: data}
        });
        dialogRef.afterClosed()
            .subscribe(res => {
                const member = res.member;

                if (!res) {
                    // If user press cancel
                    return;
                }
                if (isNew) {
                    console.log(member)
                    this.memberService.addStudent(member).subscribe(res => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListStudents();
                        this.refresh.next();

                    });
                } else {
                    this.memberService.updateStudent(member, member.id).subscribe(res => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListStudents();
                        this.refresh.next();
                    });
                }
            });
    }
    deleteItem(row, id: string) {
        this.confirmService.confirm({message: `Delete ${row.firstName + ' ' + row.lastName}?`})
            .subscribe(result => {
                if (result) {
                    this.loader.open();
                    this.memberService.deleteMember(id).subscribe(async () => {
                        this.loader.close();
                        this._snackBar.open('Student deleted!', 'OK', {duration: 4000});
                        this.getListStudents();
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
        switch (event.target.placeholder) {
            case 'filter by Name': {
                this.firstName = event.target.value;
                break;
            }
            case 'filter by Cin': {
                this.cin = event.target.value;
                break;
            }
            case 'filter by Diploma': {
                this.diploma = event.target.value;
                break;
            }
            default: {
                break;
            }
        }
        this.memberService.findStudentBySearch(this.firstName, this.lastName, this.cin, this.diploma).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }
}
