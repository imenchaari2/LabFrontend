import{Component, Inject, NgZone, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Member} from "../../../shared/models/member";
import {FileUploader} from "ng2-file-upload";
import {CustomValidators} from "ngx-custom-validators";


@Component({
    selector: 'app-add-teacher',
    templateUrl: './add-teacher.component.html',
    styleUrls: ['./add-teacher.component.scss']
})

export class AddTeacherComponent {
    public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
    member!: Member;
    basicForm: FormGroup;
    minFromDate = '1980-01-01';
    maxToDate = new Date();
    randomPass: string;
    show = false;
    selectedValue: string;
    action: string;
    dialogTitle: string;
    buttonTitle: string;
    roles = [
        {role: 'teacher'},
        {role: 'student'}
    ];
    selectedCvFile: File;
    selectedPhotoFile: File;
    constructor(private formBuilder: UntypedFormBuilder,
                public dialogRef: MatDialogRef<AddTeacherComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
                ) {
        if (this.data.action === 'edit') {
            this.buttonTitle = 'update Teacher';
            this.dialogTitle = this.data.payload.firstName + ' ' + this.data.payload.lastName;
        } else {
            this.dialogTitle = 'Add new Teacher';
            this.buttonTitle = 'Add new Teacher';
        }
        console.log(this.member)
        this.basicForm = this.buildTeacherForm();

    }

    password() {
        this.show = !this.show;
    }

    buildTeacherForm() {
        console.log(this.data)
        const password = new UntypedFormControl(!!this.data?.payload?.password ? this.data?.payload?.password : '');
        const confirmPassword = new UntypedFormControl(!!this.data?.payload?.password ? this.data?.payload?.password : '', CustomValidators.equalTo(password));
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.data?.payload?.id ? this.data?.payload?.id : ''),
            firstName: new UntypedFormControl(!!this.data?.payload?.firstName ? this.data?.payload?.firstName : ''),
            lastName: new UntypedFormControl(!!this.data?.payload?.lastName ? this.data?.payload?.lastName : ''),
            cin: new UntypedFormControl(!!this.data?.payload?.cin ? this.data?.payload?.cin : ''),
            email: new UntypedFormControl(!!this.data?.payload?.email ? this.data?.payload?.email : ''),
            birthDate: new UntypedFormControl(!!this.data?.payload?.birthDate ? this.data?.payload?.birthDate : ''),
            grade: new UntypedFormControl(!!this.data?.payload?.grade ? this.data?.payload?.grade : ''),
            etablishment: new UntypedFormControl(!!this.data?.payload?.etablishment ? this.data?.payload?.etablishment : ''),
            role: new UntypedFormControl(!!this.data?.payload?.role ? this.data?.payload?.role : ''),
            password,
            confirmPassword,
        });
    }
    selectCVFile(event) {
        this.selectedCvFile = event.target.files[0];
        console.log(this.selectedCvFile);
    }
    selectPhotoFile(event) {
        this.selectedPhotoFile = event.target.files[0];
        console.log(this.selectedPhotoFile);
    }
}
