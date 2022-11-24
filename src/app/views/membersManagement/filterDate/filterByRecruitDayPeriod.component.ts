import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe, formatDate} from "@angular/common";
import {DateAdapter} from '@angular/material/core'
import {MemberService} from "../../../shared/services/labServices/memberService";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-filterByRecruitDayPeriod',
    templateUrl: './filterByRecruitDayPeriod.component.html',
    styleUrls: ['./filterByRecruitDayPeriod.component.scss'],
})
export class FilterByRecruitDayPeriodComponent {

    basicForm: FormGroup;
    myDatepipe!: any;
    isArchived = false;

    constructor(private formBuilder: FormBuilder,
                datepipe: DatePipe,
                public dialogRef: MatDialogRef<FilterByRecruitDayPeriodComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private memberService: MemberService) {
        this.myDatepipe = datepipe;
        this.basicForm = this.formBuilder.group({
            recruitDayGT: new FormControl('', [Validators.required]),
            recruitDayLT: new FormControl('', [Validators.required]),
            archiveDayGT: new FormControl('', [Validators.required]),
            archiveDayLT: new FormControl('', [Validators.required]),
        });

    }

    applyRecruitePeriodFilter() {
        const ConvertedrecruitDayGT = this.myDatepipe.transform(this.basicForm.value.recruitDayGT, 'yyyy-MM-dd');
        const ConvertedrecruitDayLT = this.myDatepipe.transform(this.basicForm.value.recruitDayLT, 'yyyy-MM-dd');
        // this.memberService.filterByRecruitDayPeriod(ConvertedrecruitDayGT, ConvertedrecruitDayLT).subscribe(value => {
        //     if (!!value) {
        //         console.log(value);
        //         this.dialogRef.close({data: value});
        //     }
        // });
    }
    applyArchivePeriodFilter() {
        const ConvertedArchiveDayGT = this.myDatepipe.transform(this.basicForm.value.archiveDayGT, 'yyyy-MM-dd');
        const ConvertedArchiveDayLT = this.myDatepipe.transform(this.basicForm.value.archiveDayLT, 'yyyy-MM-dd');
        // this.memberService.filterByArchivePeriod(ConvertedArchiveDayGT, ConvertedArchiveDayLT).subscribe(value => {
        //     if (!!value) {
        //         console.log(value);
        //         this.dialogRef.close({data: value});
        //     }
        // });
    }

    close(): void {
        this.dialogRef.close();
    }


}
