import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {MemberService} from '../../../shared/services/labServices/memberService';
import {Member} from '../../../shared/models/member';
import {AddStudentComponent} from '../add-student/add-student.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {FilterByCreatedDatePeriodComponent} from '../filterDate/filterByCreatedDatePeriod.component';
import {Article} from '../../../shared/models/article';
import {SelectAuteurComponent} from '../../articlesManagement/affect-Author/select-auteur.component';
import {Teacher} from '../../../shared/models/Teacher';
import {Student} from '../../../shared/models/Student';
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

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
            prop: 'type',
            name: 'Type'
        },
        {
            prop: 'supervisor.fullName',
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
    type = '';
    master = 'master degree';
    thesis = 'thesis';

    cin = '';
    supervisor = '';
    myDatePipe!: any;
    base64Data: any;
    selectedCvFile: File;

    constructor(private memberService: MemberService,
                private dialog: MatDialog,
                datepipe: DatePipe,
                private _snackBar: MatSnackBar,
                private confirmService: AppConfirmService,
                private loader: AppLoaderService) {
        this.myDatePipe = datepipe;

    }

    ngOnInit(): void {
        this.getListStudents();
    }

    selectCVFile(event) {
        this.selectedCvFile = event.target.files[0];
        console.log(this.selectedCvFile);
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
        const isStudent = true;
        const dialogRef = this.dialog.open(FilterByCreatedDatePeriodComponent, {
            width: '600px',
            data: {isStudent}

        });
        dialogRef.afterClosed().subscribe(result => {
            this.rows = result.data;
        });
    }

    filterByType(event) {
            this.type = event.value;

        this.memberService.findStudentBySearch(this.firstName, this.lastName, this.cin, this.type).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }
    filterBySearchField(event) {
        if (event.value === 'thesis' || event.value === 'master degree'){
            this.type = event.value;
        }
            switch (event.target.placeholder) {
                case 'filter by Name': {
                    this.firstName = event.target.value;
                    break;
                }
                case 'filter by Cin': {
                    this.cin = event.target.value;
                    break;
                }
                default: {
                    break;
                }
            }

        this.memberService.findStudentBySearch(this.firstName, this.lastName, this.cin, this.type).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }

    getAllStudentsBySupervisorName(event) {
        switch (event.target.placeholder) {
            case 'filter by Supervisor': {
                this.supervisor = event.target.value;
                break;
            }
            default: {
                break;
            }
        }
        this.memberService.getAllStudentsBySupervisorName(this.supervisor).subscribe(value => {
            if (!!value) {
                this.rows = this.temp = value;
                console.log(this.rows);
            }
        });
        return this.rows;
    }

    affect(student: Student): void {
        const isStudent = true;
        const dialogRef = this.dialog.open(SelectAuteurComponent, {
            width: '450px',
            data: {payload: student, isStudent},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.memberService.affectSupervisorToStudent(student, result.data.id).subscribe(res => {
                    this._snackBar.open('author affected successfully !', '', {duration: 1000});
                    this.getListStudents();
                    this.refresh.next();
                });
            }
        });

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
                const cv = res.cv;
                const photo = res.photo;
                const ConvertedBirthDate = this.myDatePipe.transform(member.birthDate, 'yyyy-MM-dd');
                const ConvertedInscriptionDate = this.myDatePipe.transform(member.inscriptionDate, 'yyyy-MM-dd');
                member.birthDate = ConvertedBirthDate;
                member.inscriptionDate = ConvertedInscriptionDate;
                if (!res) {
                    // If user press cancel
                    return;
                }
                if (isNew) {
                    this.memberService.addStudent(member, cv, photo).subscribe(res => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListStudents();
                        this.refresh.next();

                    });
                } else {
                    this.memberService.updateStudent(member, member.id, cv, photo).subscribe(res => {
                        this._snackBar.open('your informations have been added successfully', '', {duration: 1000});
                        this.getListStudents();
                        this.refresh.next();
                    });
                }
            });
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
