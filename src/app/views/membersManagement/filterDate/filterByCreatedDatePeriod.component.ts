import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe, formatDate} from '@angular/common';
import {ArticleService} from "../../../shared/services/labServices/articleService";
import {MemberService} from "../../../shared/services/labServices/memberService";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-filterByCreatedDatePeriod',
    templateUrl: './filterByCreatedDatePeriod.component.html',
    styleUrls: ['./filterByCreatedDatePeriod.component.scss'],
})
export class FilterByCreatedDatePeriodComponent {

    basicForm: FormGroup;
    myDatepipe!: any;
    isStudent = false;

    constructor(private formBuilder: FormBuilder,
                datepipe: DatePipe,
                public dialogRef: MatDialogRef<FilterByCreatedDatePeriodComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private articleService: ArticleService,
                private memberService: MemberService,
    ) {
        this.myDatepipe = datepipe;
        this.basicForm = this.formBuilder.group({
            createdDateGT: new FormControl('', [Validators.required]),
            createdDateLT: new FormControl('', [Validators.required]),
            inscriptionDateGT: new FormControl('', [Validators.required]),
            inscriptionDateLT: new FormControl('', [Validators.required]),
        });

    }

    applyCreatedDatePeriodFilter() {
        const ConvertedcreatedDateGT = this.myDatepipe.transform(this.basicForm.value.createdDateGT, 'yyyy-MM-dd');
        const ConvertedcreatedDateLT = this.myDatepipe.transform(this.basicForm.value.createdDateLT, 'yyyy-MM-dd');
        this.articleService.findArticleByCreatedDatePeriod(ConvertedcreatedDateGT, ConvertedcreatedDateLT).subscribe(value => {
            if (!!value) {
                console.log(value);
                this.dialogRef.close({data: value});
            }
        });
    }
    applyInscriptionDatePeriodFilter() {
        const ConvertedInscriptionDateGT = this.myDatepipe.transform(this.basicForm.value.inscriptionDateGT, 'yyyy-MM-dd');
        const ConvertedInscriptionDateLT = this.myDatepipe.transform(this.basicForm.value.inscriptionDateLT, 'yyyy-MM-dd');
        this.memberService.findStudentByInscriptionDateBetween(ConvertedInscriptionDateGT, ConvertedInscriptionDateLT).subscribe(value => {
            if (!!value) {
                console.log(value);
                this.dialogRef.close({data: value});
            }
        });
    }

    close(): void {
        this.dialogRef.close();
    }


}
