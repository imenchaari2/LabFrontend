import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {
    FormControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Tool } from 'app/shared/models/tool';
@Component({
    selector: 'app-add-tool',
    templateUrl: './add-tool.component.html',
    styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent {
    tool!: Tool;
    basicForm: UntypedFormGroup;
    minFromDate = '1980-01-01';
    maxToDate = new Date();
    show = false;
    selectedValue: string;
    action: string;
    dialogTitle: string;
    buttonTitle: string;
    selectedSourceFile: File;

    constructor(private formBuilder: UntypedFormBuilder,
                public dialogRef: MatDialogRef<AddToolComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        // this.article = data.article;
        // this.action = data.action;
        if (this.data.action === 'edit') {
            this.buttonTitle = 'Update your tool';
            this.dialogTitle = this.data.payload.title;
        } else {
            this.dialogTitle = 'Add Tool';
            this.buttonTitle = 'Add Tool';
        }
        console.log(this.tool)
        this.basicForm = this.buildToolForm();

    }

    buildToolForm() {
        console.log(this.data)
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.data?.payload?.id ? this.data?.payload?.id : ''),
            source: new UntypedFormControl(!!this.data?.payload?.source ? this.data?.payload?.source : ''),
            createdDate: new UntypedFormControl(!!this.data?.payload?.createdDate ? this.data?.payload?.createdDate : ''),
        });
    }

}
