import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Member} from 'app/shared/models/member';
import {MemberService} from 'app/shared/services/labServices/memberService';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-member-auteur',
    templateUrl: './select-member.component.html',
    styleUrls: ['./select-member.component.css']
})
export class SelectMemberComponent implements OnInit {

    members: Member[];
    membersSelected: Member[]=[];
    affectedMembers = new FormControl('');
    event = '';
    membersIds: string[];
    constructor(private memberService: MemberService,
                private matDialog: MatDialog,
                public dialogRef: MatDialogRef<SelectMemberComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
            this.event = this.data.payload.title;
        // this.affectedMembers =  new FormControl(data.payload.membersIds);
    }

    ngOnInit(): void {
        this.getListMembers();
    }

    private getListMembers() {
        this.memberService.getAllAuthors().subscribe(value => {
            if (!!value) {
                this.members = value;
            }
        });
    }

    onSubmit(): void {
        // tslint:disable-next-line:forin
            this.dialogRef.close({data: this.affectedMembers.value});


    }

}
