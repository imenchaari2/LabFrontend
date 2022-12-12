import {Component, NgZone, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {HttpErrorResponse} from "@angular/common/http";
import {MemberService} from "../../../shared/services/labServices/memberService";
import {Student} from "../../../shared/models/Student";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtAuthService} from "../../../shared/services/auth/jwt-auth.service";
import {Member} from "../../../shared/models/member";
import {FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {CustomValidators} from "ngx-custom-validators";
import {Teacher} from "../../../shared/models/Teacher";
import {User} from "../../../shared/models/user";

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: 'upload_url'});
    public hasBaseDropZoneOver: boolean = false;
    selectedPhotoFile: File;
    student!: Student;
    teacher!: Teacher;
    admin!: Member;
    public refresh: Subject<any> = new Subject();
    basicForm: FormGroup;
    show = false;
    role = '';
    selectedCvFile: File;
    types = [
        {type: 'master degree'},
        {type: 'thesis'}
    ];
    connectedUser!: User;

    constructor(private memberService: MemberService,
                private formBuilder: UntypedFormBuilder,
                private _snackBar: MatSnackBar,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                public jwtAuth: JwtAuthService
    ) {
        this.role = this.jwtAuth.getUser().role;
        this.connectedUser = this.jwtAuth.getUser();
        if (this.jwtAuth.getUser().role === 'ROLE_ADMIN') {
            this.basicForm = this.buildAdminForm();
        } else if (this.jwtAuth.getUser().role === 'ROLE_STUDENT') {
            this.basicForm = this.buildStudentForm();
        } else {
            this.basicForm = this.buildTeacherForm();
        }
    }

    ngOnInit() {
        if (this.jwtAuth.getUser().role === 'ROLE_ADMIN') {
            this.getMemberById(this.jwtAuth.getUser().id);
        } else if (this.jwtAuth.getUser().role === 'ROLE_STUDENT') {
            this.getMemberById(this.jwtAuth.getUser().id);
        } else {
            this.getMemberById(this.jwtAuth.getUser().id);
        }
    }


    private getMemberById(id: string) {
        this.memberService.getMemberById(id).subscribe(value => {
            if (!!value) {
                if (this.jwtAuth.getUser().role === 'ROLE_ADMIN') {
                    this.admin = value;
                    this.basicForm = this.buildAdminForm();
                    console.log("hhhhhhhhhhhhhhhh", this.admin)

                } else if (this.jwtAuth.getUser().role === 'ROLE_STUDENT') {
                    this.student = value;
                    this.basicForm = this.buildStudentForm();
                } else {
                    this.teacher = value;
                    this.basicForm = this.buildTeacherForm();
                }
            }
        });
    }

    buildStudentForm() {
        const password = new UntypedFormControl(!!this.student?.password ? this.student?.password : '');
        const confirmPassword = new UntypedFormControl(!!this.student?.password ? this.student?.password : '', CustomValidators.equalTo(password));
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.student?.id ? this.student?.id : ''),
            firstName: new UntypedFormControl(!!this.student?.firstName ? this.student?.firstName : ''),
            lastName: new UntypedFormControl(!!this.student?.lastName ? this.student?.lastName : ''),
            cin: new UntypedFormControl(!!this.student?.cin ? this.student?.cin : ''),
            type: new UntypedFormControl(!!this.student?.type ? this.student?.type : ''),
            email: new UntypedFormControl(!!this.student?.email ? this.student?.email : ''),
            birthDate: new UntypedFormControl(!!this.student?.birthDate ? this.student?.birthDate : ''),
            diploma: new UntypedFormControl(!!this.student?.diploma ? this.student?.diploma : ''),
            inscriptionDate: new UntypedFormControl(!!this.student?.inscriptionDate ? this.student?.inscriptionDate : ''),
            password,
            confirmPassword,

        });
    }

    buildTeacherForm() {
        const password = new UntypedFormControl('');
        const NewPassword = new UntypedFormControl('');
        const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(NewPassword));
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.teacher?.id ? this.teacher?.id : ''),
            firstName: new UntypedFormControl(!!this.teacher?.firstName ? this.teacher?.firstName : ''),
            lastName: new UntypedFormControl(!!this.teacher?.lastName ? this.teacher?.lastName : ''),
            cin: new UntypedFormControl(!!this.teacher?.cin ? this.teacher?.cin : ''),
            email: new UntypedFormControl(!!this.teacher?.email ? this.teacher?.email : ''),
            birthDate: new UntypedFormControl(!!this.teacher?.birthDate ? this.teacher?.birthDate : ''),
            grade: new UntypedFormControl(!!this.teacher?.grade ? this.teacher?.grade : ''),
            etablishment: new UntypedFormControl(!!this.teacher?.etablishment ? this.teacher?.etablishment : ''),
            password,
            NewPassword,
            confirmPassword,

        });
    }

    buildAdminForm() {
        const password = new UntypedFormControl(!!this.admin?.password ? this.admin?.password : '');
        const NewPassword = new UntypedFormControl('');
        const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(NewPassword));
        return new UntypedFormGroup({
            id: new UntypedFormControl(!!this.admin?.id ? this.admin?.id : ''),
            firstName: new UntypedFormControl(!!this.admin?.firstName ? this.admin?.firstName : ''),
            lastName: new UntypedFormControl(!!this.admin?.lastName ? this.admin?.lastName : ''),
            cin: new UntypedFormControl(!!this.admin?.cin ? this.admin?.cin : ''),
            email: new UntypedFormControl(!!this.admin?.email ? this.admin?.email : ''),
            birthDate: new UntypedFormControl(!!this.admin?.birthDate ? this.admin?.birthDate : ''),
            password,
            confirmPassword,
            NewPassword
        });
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    selectPhotoFile(event) {
        this.selectedPhotoFile = event.target.files[0];
        console.log(this.selectedPhotoFile);
    }
    selectCVFile(event) {
        this.selectedCvFile = event.target.files[0];
        console.log(this.selectedCvFile)
    }

    private updatePhoto(idMember: string, idPhoto: string, photo: File) {

        this.memberService.updatePhoto(idMember, idPhoto, photo).subscribe(
            event => {
                this._snackBar.open('your profile photo has been updated successfully', '', {duration: 1000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
    private updatePhotoAdmin(idMember: string,  photo: File) {

        this.memberService.updatePhotoAdmin(idMember, photo).subscribe(
            event => {
                this._snackBar.open('your profile photo has been updated successfully', '', {duration: 1000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
    private updateCV(idMember: string, idCv: string, Cv: File) {

        this.memberService.updateCV(idMember, idCv, Cv).subscribe(
            event => {
                this._snackBar.open('your cv has been updated successfully', '', {duration: 1000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
    private updateCVAdmin(idMember: string,  cv: File) {

        this.memberService.updateCVAdmin(idMember, cv).subscribe(
            event => {
                this._snackBar.open('your cv has been updated successfully', '', {duration: 1000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    password() {
        this.show = !this.show;
    }

    changePassword(idMember: string, currentPass: string, newPass: string) {
        this.memberService.changePassword(idMember, currentPass, newPass).subscribe(value => {
            if (!!value && value.message === 'password changed successfully') {
                this._snackBar.open(value.message + '!', 'OK', {duration: 4000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            } else {
                this._snackBar.open(value.message + '!', 'OK', {duration: 4000});

            }
        });
    }

    updateTeacherInfos(teacherId: string) {
        this.memberService.updateTeacherInfos(teacherId, this.buildMember()).subscribe(value => {
            console.log(value);
            if (!!value ) {
                this._snackBar.open(' your informations are updated successfully !', 'OK', {duration: 4000});
                this.refresh.next();

            } else {
                this._snackBar.open( ' no !', 'OK', {duration: 4000});

            }
        })
    }
    updateStudentInfos(studentId: string, student: Student) {
            this.memberService.updateStudentInfos(studentId, student).subscribe(value => {
            console.log(value);
            if (!!value ) {
                this._snackBar.open(' your informations are updated successfully !', 'OK', {duration: 4000});
                this.refresh.next();

            } else {
                this._snackBar.open( ' no !', 'OK', {duration: 4000});

            }
        });
    }
    updateAdminInfos(adminId: string) {
        this.memberService.updateMember(adminId, this.buildMember()).subscribe(value => {
            console.log(value);
            if (!!value ) {
                this._snackBar.open(' your informations are updated successfully !', 'OK', {duration: 4000});
                this.ngZone.run(() => this.router.navigateByUrl('profile')).then(r => console.log(r));
                window.location.reload();
            } else {
                this._snackBar.open( ' no !', 'OK', {duration: 4000});

            }
        });
    }
    buildMember(): any {
        return{
            firstName: this.basicForm.value.firstName,
            lastName: this.basicForm.value.lastName,
            email: this.basicForm.value.email,
            cin: this.basicForm.value.cin,
            birthDate: this.basicForm.value.birthDate,
            grade: this.basicForm.value.grade,
            etablishment: this.basicForm.value.etablishment,
            diploma: this.basicForm.value.diploma,
            inscriptionDate: this.basicForm.value.inscriptionDate,
            type: this.basicForm.value.type,
            password: this.basicForm.value.password,
        };
    }
}
