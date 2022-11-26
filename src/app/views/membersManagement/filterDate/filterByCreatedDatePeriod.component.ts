import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe, formatDate} from '@angular/common';
import {ArticleService} from "../../../shared/services/labServices/articleService";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-filterByCreatedDatePeriod',
    templateUrl: './filterByCreatedDatePeriod.component.html',
    styleUrls: ['./filterByCreatedDatePeriod.component.scss'],
})
export class FilterByCreatedDatePeriodComponent {

    basicForm: FormGroup;
    myDatepipe!: any;
    isArchived = false;

    constructor(private formBuilder: FormBuilder,
                datepipe: DatePipe,
                public dialogRef: MatDialogRef<FilterByCreatedDatePeriodComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private articleService: ArticleService
    ) {
        this.myDatepipe = datepipe;
        this.basicForm = this.formBuilder.group({
            createdDateGT: new FormControl('', [Validators.required]),
            createdDateLT: new FormControl('', [Validators.required]),
            archiveDayGT: new FormControl('', [Validators.required]),
            archiveDayLT: new FormControl('', [Validators.required]),
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
    // applyArchivePeriodFilter() {
    //     const ConvertedArchiveDayGT = this.myDatepipe.transform(this.basicForm.value.archiveDayGT, 'yyyy-MM-dd');
    //     const ConvertedArchiveDayLT = this.myDatepipe.transform(this.basicForm.value.archiveDayLT, 'yyyy-MM-dd');
    //     // this.memberService.filterByArchivePeriod(ConvertedArchiveDayGT, ConvertedArchiveDayLT).subscribe(value => {
    //     //     if (!!value) {
    //     //         console.log(value);
    //     //         this.dialogRef.close({data: value});
    //     //     }
    //     // });
    // }

    close(): void {
        this.dialogRef.close();
    }


}
