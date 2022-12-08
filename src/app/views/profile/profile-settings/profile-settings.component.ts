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

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: 'upload_url'});
    public hasBaseDropZoneOver: boolean = false;
    selectedPhotoFile: File;
    member!: Member;
    public refresh: Subject<any> = new Subject();

    constructor(private memberService: MemberService,
                private _snackBar: MatSnackBar,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                public jwtAuth: JwtAuthService
    ) {
    }

    ngOnInit() {
        this.member = this.jwtAuth.getUser();
        console.log(this.jwtAuth.getUser());
        this.getMemberById(this.member.id);
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    selectPhotoFile(event) {
        this.selectedPhotoFile = event.target.files[0];
        console.log(this.selectedPhotoFile);
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
    private getMemberById(id: string) {
        this.memberService.getMemberById(id).subscribe(value => {
            if (!!value) {
                this.member = value;
            }
        });
    }
}
