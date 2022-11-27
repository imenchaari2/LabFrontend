import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Member} from "../../../shared/models/member";
import {MemberService} from "../../../shared/services/labServices/memberService";
import {Student} from 'app/shared/models/Student';
import {FileUploader} from "ng2-file-upload";
import {CustomValidators} from "ngx-custom-validators";

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss']
})

export class AddStudentComponent {

    public uploader: FileUploader = new FileUploader({url: 'upload_url'});
    title = '';
    member!: Member;
    basicForm: FormGroup;
    minFromDate = '1980-01-01';
    maxToDate = new Date();
    randomPass: string;
    show = false;
    selectedValue: string;
    eventForm: FormGroup;
    action: string;
    dialogTitle: string;
    buttonTitle: string;
    selectedCvFile: File;
    selectedPhotoFile: File;
    constructor(private formBuilder: UntypedFormBuilder,
                public dialogRef: MatDialogRef<AddStudentComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
        if (this.data.action === 'edit') {
            this.buttonTitle = 'update Student';
            this.dialogTitle = this.data.payload.firstName + ' ' + this.data.payload.lastName;
        } else {
            this.dialogTitle = 'Add new Student';
            this.buttonTitle = 'Add new Student';
        }
        console.log(this.member)
        this.basicForm = this.buildStudentForm();

    }

    password() {
        this.show = !this.show;
    }

    randomPassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
        let pass = '';
        for (let x = 0; x < length; x++) {
            const i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        this.randomPass = pass;
    }

    buildStudentForm() {
        console.log(this.data);
        const password = new UntypedFormControl(!!this.data?.payload?.password ? this.data?.payload?.password : '');
        const confirmPassword = new UntypedFormControl(!!this.data?.payload?.password ? this.data?.payload?.password : '', CustomValidators.equalTo(password));
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.data?.payload?.id ? this.data?.payload?.id : ''),
            firstName: new UntypedFormControl(!!this.data?.payload?.firstName ? this.data?.payload?.firstName : ''),
            lastName: new UntypedFormControl(!!this.data?.payload?.lastName ? this.data?.payload?.lastName : ''),
            cin: new UntypedFormControl(!!this.data?.payload?.cin ? this.data?.payload?.cin : ''),
            email: new UntypedFormControl(!!this.data?.payload?.email ? this.data?.payload?.email : ''),
            birthDate: new UntypedFormControl(!!this.data?.payload?.birthDate ? this.data?.payload?.birthDate : ''),
            diploma: new UntypedFormControl(!!this.data?.payload?.diploma ? this.data?.payload?.diploma : ''),
            inscriptionDate: new UntypedFormControl(!!this.data?.payload?.inscriptionDate ? this.data?.payload?.inscriptionDate : ''),
            // cv: new UntypedFormControl(!!this.data?.payload?.cv ? this.data?.payload?.cv : ''),
            // photo: new UntypedFormControl(!!this.data?.payload?.photo ? this.data?.payload?.photo : ''),
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
