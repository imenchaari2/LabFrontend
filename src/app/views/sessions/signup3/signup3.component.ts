import {UntypedFormGroup, Validators} from "@angular/forms";
import {UntypedFormBuilder} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {egretAnimations} from "app/shared/animations/egret-animations";
import {JwtAuthService} from "../../../shared/services/auth/jwt-auth.service";
import {User} from "../../../shared/models/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: "app-signup3",
    templateUrl: "./signup3.component.html",
    styleUrls: ["./signup3.component.scss"],
    animations: egretAnimations
})
export class Signup3Component implements OnInit {
    signupForm: UntypedFormGroup;
    member: {};

    constructor(private fb: UntypedFormBuilder,
                private router: Router,
                private authService: JwtAuthService,
                private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    onSubmit() {
        if (!this.signupForm.invalid) {
            console.log("hhhhhhhhhh")
            this.authService.signup(this.signupForm.value.email, this.signupForm.value.password).subscribe(res => {
                console.log(res);
                this._snackBar.open('admin registred successfully !', '', {duration: 1000});
                this.router.navigateByUrl('sessions/signin3');

            });
        }

    }
}
