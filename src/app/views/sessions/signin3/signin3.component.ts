import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {JwtAuthService} from "../../../shared/services/auth/jwt-auth.service";
import {LocalStoreService} from "../../../shared/services/local-store.service";
import {MemberService} from "../../../shared/services/labServices/memberService";
import {Member} from "../../../shared/models/member";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

interface User {
    id: string;
    email: string;
    role: string;
}

@Component({
    selector: 'app-signin3',
    templateUrl: './signin3.component.html',
    styleUrls: ['./signin3.component.scss']
})
export class Signin3Component implements OnInit {

    signinForm: UntypedFormGroup;
    member: {};

    constructor(private fb: UntypedFormBuilder,
                private router: Router,
                private authService: JwtAuthService,
                private localStorage: LocalStoreService,
                private memberService: MemberService) {
    }

    ngOnInit() {

        const password = new UntypedFormControl('', Validators.required);
        const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(password));

        this.signinForm = this.fb.group(
            {
                email: ["", [Validators.required, Validators.email]],
                password: password,
                agreed: [false, Validators.required]
            }
        );
    }

    onSubmit() {
        if (!this.signinForm.invalid) {
            this.authService.signin(this.signinForm.value.email, this.signinForm.value.password).subscribe(res => {
                this.member = {
                    id: res.id,
                    role: res.roles[0],
                    email: res.username
                };
                this.authService.setUserAndToken(res.token, this.member as User, true);
                this.router.navigateByUrl('dashboard');

            });
        }

    }
}
