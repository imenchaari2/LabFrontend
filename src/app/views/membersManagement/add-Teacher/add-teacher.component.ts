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


@Component({
    selector: 'app-add-teacher',
    templateUrl: './add-teacher.component.html',
    styleUrls: ['./add-teacher.component.scss']
})

export class AddTeacherComponent {

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

    randomPassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
        let pass = '';
        for (let x = 0; x < length; x++) {
            const i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        this.randomPass = pass;
    }

    buildTeacherForm() {
        console.log(this.data)
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.data?.payload?.id ? this.data?.payload?.id : ''),
            firstName: new UntypedFormControl(!!this.data?.payload?.firstName ? this.data?.payload?.firstName : ''),
            lastName: new UntypedFormControl(!!this.data?.payload?.lastName ? this.data?.payload?.lastName : ''),
            cin: new UntypedFormControl(!!this.data?.payload?.cin ? this.data?.payload?.cin : ''),
            email: new UntypedFormControl(!!this.data?.payload?.email ? this.data?.payload?.email : ''),
            password: new UntypedFormControl(!!this.data?.payload?.password ? this.data?.payload?.password : ''),
            birthDate: new UntypedFormControl(!!this.data?.payload?.birthDate ? this.data?.payload?.birthDate : ''),
            grade: new UntypedFormControl(!!this.data?.payload?.grade ? this.data?.payload?.grade : ''),
            etablishment: new UntypedFormControl(!!this.data?.payload?.etablishment ? this.data?.payload?.etablishment : ''),
            cv: new UntypedFormControl(!!this.data?.payload?.cv ? this.data?.payload?.cv : ''),
        });
    }

}
