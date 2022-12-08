import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {isSameDay, isSameMonth} from 'date-fns';
import {egretAnimations} from '../../shared/animations/egret-animations';
import {EgretCalendarEvent} from '../../shared/models/event.model';
import {CalendarFormDialogComponent} from './calendar-form-dialog/calendar-form-dialog.component';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {EventService} from '../../shared/services/labServices/eventService';
import {JwtAuthService} from "../../shared/services/auth/jwt-auth.service";
import {MemberService} from "../../shared/services/labServices/memberService";
import {Student} from "../../shared/models/Student";
import {SelectAuteurComponent} from "../articlesManagement/affect-Author/select-auteur.component";
import {SelectMemberComponent} from "./affect-Member/select-member.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "../../shared/models/member";

@Component({
    selector: 'app-calendar',
    templateUrl: './app-calendar.component.html',
    styleUrls: ['./app-calendar.component.css'],
    animations: egretAnimations,
})
export class AppCalendarComponent implements OnInit {
    public view = 'month';
    public viewDate = new Date();
    private dialogRef: MatDialogRef<CalendarFormDialogComponent>;
    public activeDayIsOpen = true;
    public refresh: Subject<any> = new Subject();
    public eventsByMember: EgretCalendarEvent[] = [];
    public events: EgretCalendarEvent[] = [];
    private actions: CalendarEventAction[];
    role: string;
    fullName: string;
    membersIds: string[]=[];
    affectedMembers: Member[];

    constructor(
        public dialog: MatDialog,
        private confirmService: AppConfirmService,
        private eventService: EventService,
        private memberService: MemberService,
        private authService: JwtAuthService,
        private _snackBar: MatSnackBar,
    ) {
        this.role = this.authService.getUser().role;
        this.actions = [
            {
                label: '<i class="material-icons icon-sm">edit</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.handleEvent('edit', event);
                },
            },
            {
                label: '<i class="material-icons icon-sm">close</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.removeEvent(event);
                },
            },
        ];
    }

    ngOnInit() {
        this.loadEvents();
        this.loadEventsByMember();
    }

    private initEvents(events): EgretCalendarEvent[] {
        return events.map((event) => {
            event.actions = this.actions;
            return new EgretCalendarEvent(event);
        });
    }

    public loadEvents() {

        this.eventService.getAllEvents().subscribe((events: EgretCalendarEvent[]) => {
            this.events = this.initEvents(events);
            console.log(this.events)
        });
    }

    public loadEventsByMember() {
        this.eventService.getEventById(this.authService.getUser().id).subscribe((events: EgretCalendarEvent[]) => {
            this.eventsByMember = this.initEvents(events);
        });
    }

    public removeEvent(event) {
        this.confirmService
            .confirm({
                title: 'Delete ' + event.title + '?',
            })
            .subscribe((res) => {
                if (!res) {
                    return;
                }

                this.eventService.deleteEvent(event._id).subscribe((events) => {
                    console.log("delete", events)
                    this.loadEvents();
                    this.loadEventsByMember();
                    this.refresh.next();
                });
            });
    }

    public addEvent() {
        this.dialogRef = this.dialog.open(CalendarFormDialogComponent, {
            panelClass: 'calendar-form-dialog',
            data: {
                action: 'add',
                date: new Date(),
            },
            width: '450px',
        });
        this.dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
            const responseEvent = res.event;
            responseEvent.memberId = this.authService.getUser().id;
            this.eventService.addEvent(responseEvent, this.authService.getUser().id).subscribe((events) => {
                this.loadEvents();
                this.loadEventsByMember();
                console.log(this.events);

                this.refresh.next(true);
            });
        });
    }

    affect(event: EgretCalendarEvent): void {
        const isEvent = true;
        const dialogRef = this.dialog.open(SelectMemberComponent, {
            width: '450px',
            data: {payload: event, isEvent, affectedMembers: event.membersIds},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // result.data.toArray().mapArray()
                this.affectedMembers = result.data;
                this.affectedMembers.map(member => {
                    this.membersIds.push(member.id);
                });
                this.eventService.affectMembersToEvent(event._id, this.membersIds).subscribe(res => {
                    this._snackBar.open('author affected successfully !', '', {duration: 1000});
                    this.loadEvents();
                    this.refresh.next();
                });
            }
        });

    }

    public handleEvent(action: string, event: CalendarEvent): void {
        this.dialogRef = this.dialog.open(CalendarFormDialogComponent, {
            panelClass: 'calendar-form-dialog',
            data: {event, action},
            width: '450px',
        });

        this.dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
            const dialogAction = res.action;
            const responseEvent = res.event;

            if (dialogAction === 'save') {
                this.eventService.updateEvent(responseEvent, responseEvent._id).subscribe((events) => {
                    this.loadEventsByMember();
                    this.loadEvents();
                    this.refresh.next();
                });
            } else if (dialogAction === 'delete') {
                this.removeEvent(event);
            }
        });
    }

    public dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

}
