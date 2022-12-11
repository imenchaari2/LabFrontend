import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Member} from 'app/shared/models/member';
import {MemberService} from 'app/shared/services/labServices/memberService';
import {Teacher} from "../../../shared/models/Teacher";

@Component({
    selector: 'app-select-auteur',
    templateUrl: './select-auteur.component.html',
    styleUrls: ['./select-auteur.component.css']
})
export class SelectAuteurComponent implements OnInit {

    supervisors: Teacher[];
    members: Member[];
    member: string;
    supervisor: string;
    article = '';
    student = '';
    tool = '';

    constructor(private memberService: MemberService,
                private matDialog: MatDialog,
                public dialogRef: MatDialogRef<SelectAuteurComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.isStudent === false) {
            this.article = this.data.payload.title;
        }
        else {
            this.student = this.data.payload.firstName +" "+this.data.payload.lastName
        }

    }

    ngOnInit(): void {
        if (this.data.isTool === true) {
            this.getListMembers();
        } else if (this.data.isStudent === true) {
            this.getListSupervisors();
        }
    }
    private getListMembers() {
        this.memberService.getAllAuthors().subscribe(value => {
            if (!!value) {
                this.members = value;
            }
        });
    }
    private getListSupervisors() {
        this.memberService.getAllTeachers().subscribe(value => {
            if (!!value) {
                this.supervisors = value;
            }
            console.log(this.supervisors)
        });
    }


    onSubmit(): void {
        if (this.data.isTool === true) {
            this.dialogRef.close({data: this.member});
        } else if (this.data.isStudent === true) {
            this.dialogRef.close({data: this.supervisor});
        }

    }

}
