import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CalendarEvent} from 'angular-calendar';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {EgretCalendarEvent} from '../../../shared/models/event.model';

interface DialogData {
    event?: EgretCalendarEvent,
    action?: string,
    date?: Date
}

@Component({
    selector: 'app-calendar-form-dialog',
    templateUrl: './calendar-form-dialog.component.html',
    styleUrls: ['./calendar-form-dialog.component.scss']
})
export class CalendarFormDialogComponent implements OnInit {
    event: EgretCalendarEvent;
    dialogTitle: string;
    buttonTitle: string;
    eventForm: UntypedFormGroup;
    action: string;

    constructor(
        public dialogRef: MatDialogRef<CalendarFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DialogData,
        private formBuilder: UntypedFormBuilder
    ) {
        console.log("data",data.event)
        console.log("data",data.action)
        this.event = data.event;
        this.action = data.action;

        if (this.action === 'edit') {
            this.buttonTitle = 'Update your event';
            this.dialogTitle = this.event.title;
        } else {
            this.dialogTitle = 'Add Event';
            this.buttonTitle = 'Add Event';

            this.event = new EgretCalendarEvent({
                start: data.date,
                end: data.date
            });
        }
        console.log(this.event)
        this.eventForm = this.buildEventForm(this.event);
    }

    ngOnInit() {
    }

    buildEventForm(event: EgretCalendarEvent) {
        return new UntypedFormGroup({
            _id: new UntypedFormControl(event._id),
            title: new UntypedFormControl(event.title),
            start: new UntypedFormControl(event.start),
            end: new UntypedFormControl(event.end),
            location: new UntypedFormControl(event.location),

            color: this.formBuilder.group({
                primary: new UntypedFormControl(event.color.primary),
                secondary: new UntypedFormControl(event.color.secondary)
            }),
        });
    }

}
