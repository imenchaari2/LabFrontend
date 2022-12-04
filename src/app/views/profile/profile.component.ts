import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {JwtAuthService} from "app/shared/services/auth/jwt-auth.service";
import {Observable} from 'rxjs';
import {MemberService} from "../../shared/services/labServices/memberService";
import {Member} from "../../shared/models/member";
import {Student} from "../../shared/models/Student";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {

    member!: Student;
    photo: any;

    constructor(private router: ActivatedRoute,
                private memberService: MemberService,
                public jwtAuth: JwtAuthService) {
    }

    ngOnInit() {
        this.getMemberById('2');
        // this.activeView = this.router.snapshot.params["view"];
        // this.user = this.jwtAuth.user$;
    }

    private getMemberById(id: string) {
        this.memberService.getMemberById(id).subscribe(value => {
            if (!!value) {
                this.member = value;
                this.photo = 'data:image/jpeg;base64,' + value.photo.data;
            }
        });
    }


}
