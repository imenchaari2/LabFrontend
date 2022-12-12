import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {JwtAuthService} from "app/shared/services/auth/jwt-auth.service";
import {Observable} from 'rxjs';
import {MemberService} from "../../shared/services/labServices/memberService";
import {Member} from "../../shared/models/member";
import {Student} from "../../shared/models/Student";
import {HttpErrorResponse} from "@angular/common/http";
import {Teacher} from "../../shared/models/Teacher";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {

    admin!: Member;
    member!: Member;
    student!: Student;
    teacher!: Teacher;
    photo: any;
    role = '';

    constructor(private router: ActivatedRoute,
                private memberService: MemberService,
                public jwtAuth: JwtAuthService) {
        this.role = jwtAuth.getUser().role;
    }

    ngOnInit() {
        if (this.jwtAuth.getUser().role === 'ROLE_ADMIN') {
            this.getMemberById(this.jwtAuth.getUser().id);
        } else if (this.jwtAuth.getUser().role === 'ROLE_STUDENT') {
            this.getMemberById(this.jwtAuth.getUser().id);
        } else {

            this.getMemberById(this.jwtAuth.getUser().id);
            console.log("eeeeeeeeeeeeeeeeeee", this.jwtAuth.getUser().id)
        }
    }

    private getMemberById(id: string) {
        this.memberService.getMemberById(id).subscribe(value => {
            if (!!value) {
                if(value.photo != null){
                    this.photo = 'data:image/jpeg;base64,' + value.photo.data;
                }

                if (this.jwtAuth.getUser().role === 'ROLE_ADMIN') {
                    this.admin = value;

                } else if (this.jwtAuth.getUser().role === 'ROLE_STUDENT') {
                    this.student = value;
                } else {
                    this.teacher = value;
                }
            }
        });
    }
    onDownloadFile(filename: string): void {
        this.memberService.download(filename).subscribe(
            event => {
                console.log(event);
                // this.resportProgress(event);
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

}
