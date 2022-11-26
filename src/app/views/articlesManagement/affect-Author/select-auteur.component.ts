import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Member} from 'app/shared/models/member';
import {MemberService} from 'app/shared/services/labServices/memberService';

@Component({
    selector: 'app-select-auteur',
    templateUrl: './select-auteur.component.html',
    styleUrls: ['./select-auteur.component.css']
})
export class SelectAuteurComponent implements OnInit {

    authors: Member[];
    author: string;
    article = '';

    constructor(private memberService: MemberService,
                private matDialog: MatDialog,
                public dialogRef: MatDialogRef<SelectAuteurComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.article = this.data.payload.title;

    }

    ngOnInit(): void {
        this.getListAuthors();
    }

    private getListAuthors() {
        this.memberService.getAllMembers().subscribe(value => {
            if (!!value) {
                this.authors = value;
            }
        });
    }


    onSubmit(): void {
        this.dialogRef.close({data: this.author});

    }

}
