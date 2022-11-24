import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
    imageUrl!: string;
    limitExceeded: string;
    textColor: string;
    notApprouved = 0;
    total = 0;
    duration_APP: any;
    not_approved_authorization = 0;
    duration_NotAPP: any;
    approved_authorization = 0;
    Approuved = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    ) {
    }

    ngOnInit(): void {
        this.data?.payload?.information?.files.forEach(image => {
            this.imageUrl = image.url;
        });
        console.log(this.data);
        if (this.data.sold > 0) {
            this.limitExceeded = 'No';
            this.textColor = 'text-green';
        } else {
            this.limitExceeded = 'yes';
            this.textColor = 'text-red';
        }
        this.data.payload.leavesList.forEach(leave => {
            if (leave.stateLeave.toString() === 'REFUSEE') {

                this.notApprouved += 1;
                this.total += leave.nbDaysLeave;
            }
            if (leave.stateLeave.toString() === 'VALIDEE') {

                this.Approuved += 1;
                /*this.total += leave.nbDaysLeave;*/
            }
        });
        this.data.payload.authorizationsList.forEach(authorization => {
            if (authorization.stateAuthorization.toString() === 'EN_ATTENTE') {
                this.not_approved_authorization += 1;
            } else {
                this.approved_authorization += 1;
            }
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}
