import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppLoaderService} from "../../../shared/services/app-loader/app-loader.service";
import {MemberService} from "../../../shared/services/labServices/memberService";
import {Member} from "../../../shared/models/member";
import {AddTeacherComponent} from "../add-Teacher/add-teacher.component";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {JwtAuthService} from "../../../shared/services/auth/jwt-auth.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
    rows: any[];
    temp = [];
    columns = [
        {
            prop: 'data:image/jpeg;base64,',
            name: 'Photo'
        },
        {
            prop: 'firstName',
            name: 'First Name'
        },
        {
            prop: 'lastName',
            name: 'Last Name'
        },
        {
            prop: 'cin',
            name: 'Cin'
        },
        {
            prop: 'grade',
            name: 'Grade'
        },
        {
            prop: 'email',
            name: 'Email'
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
            prop: 'etablishment',
            name: 'Etablishment'
        },
        {
            prop: 'actions',
            name: 'Actions'
        }
    ];
    member: Member;
    firstName = '';
    lastName = '';
    grade = '';
    cin = '';
    etablishment = '';
    myDatePipe: any;
    public refresh: Subject<any> = new Subject();

    constructor(private memberService: MemberService,
                private dialog: MatDialog,
                private snack: MatSnackBar,
                datepipe: DatePipe,
                private confirmService: AppConfirmService,
                private loader: AppLoaderService,
                private authService: JwtAuthService,
                private router: Router,
                private ngZone: NgZone) {
        this.myDatePipe = datepipe;

    }

    ngOnInit(): void {
        this.getListTeachers();
        console.log(this.authService.getUser())
    }

    private getListTeachers() {
        this.memberService.getAllTeachers().subscribe(value => {
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

        const dialogRef: MatDialogRef<any> = this.dialog.open(AddTeacherComponent, {
            width: '720px',
            disableClose: true,
            data: {title, action, payload: data}
        });
        dialogRef.afterClosed()
            .subscribe(res => {
                const member = res.member;
                const cv = res.cv;
                const photo = res.photo;
                member.birthDate = this.myDatePipe.transform(member.birthDate, 'yyyy-MM-dd');
                if (!res) {
                    // If user press cancel
                    return;
                }
                if (isNew) {
                    console.log(member)
                    this.memberService.addTeacher(member, cv, photo).subscribe(res => {
                        this.snack.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListTeachers();
                        this.refresh.next();

                    });
                } else {
                    this.memberService.updateTeacher(member, member.id,cv, photo).subscribe(res => {
                        this.snack.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListTeachers();
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
                        this.snack.open('Teacher deleted!', 'OK', {duration: 4000});
                        this.getListTeachers();
                        this.refresh.next();


                    });
                }
            });
    }

    filterBySearchField(event) {
        switch (event.target.placeholder) {
            case 'filter by firstName': {
                this.firstName = event.target.value;
                break;
            }
            case 'filter by lastName': {
                this.lastName = event.target.value;
                break;
            }
            case 'filter by Cin': {
                this.cin = event.target.value;
                break;
            }
            case 'filter by Grade': {
                this.grade = event.target.value;
                break;
            }
            case 'filter by Etablishment': {
                this.etablishment = event.target.value;
                break;
            }
            default: {
                break;
            }
        }
        this.memberService.findTeacherBySearch(this.firstName, this.lastName, this.cin, this.etablishment, this.grade).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
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
}
