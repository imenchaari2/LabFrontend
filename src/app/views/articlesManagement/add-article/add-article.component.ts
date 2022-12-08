import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {
    FormControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../../shared/models/article";
@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent{
    article!: Article;
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
                public dialogRef: MatDialogRef<AddArticleComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        // this.article = data.article;
        // this.action = data.action;
        if (this.data.action === 'edit') {
            this.buttonTitle = 'Update your article';
            this.dialogTitle = this.data.payload.title;
        } else {
            this.dialogTitle = 'Add Article';
            this.buttonTitle = 'Add Article';
        }
        console.log(this.article)
        this.basicForm = this.buildArticleForm();

    }
    selectSourceFile(event) {
        this.selectedSourceFile = event.target.files[0];
        console.log(this.selectedSourceFile);
    }

    buildArticleForm() {
        console.log(this.data)
        return new UntypedFormGroup({
            articleId: new UntypedFormControl(!!this.data?.payload?.articleId ? this.data?.payload?.articleId : ''),
            title: new UntypedFormControl(!!this.data?.payload?.title ? this.data?.payload?.title : ''),
            createdDate: new UntypedFormControl(!!this.data?.payload?.createdDate ? this.data?.payload?.createdDate : ''),
            // pdfSource: new UntypedFormControl(!!this.data?.payload?.pdfSource ? this.data?.payload?.pdfSource : ''),
            type: new UntypedFormControl(!!this.data?.payload?.type ? this.data?.payload?.type : ''),
            url: new UntypedFormControl(!!this.data?.payload?.url ? this.data?.payload?.url : ''),
        });
    }

}
