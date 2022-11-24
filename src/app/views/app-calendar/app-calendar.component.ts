import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { isSameDay, isSameMonth } from 'date-fns';
import { egretAnimations } from '../../shared/animations/egret-animations';
import { EgretCalendarEvent } from '../../shared/models/event.model';
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import { AppConfirmService } from '../../shared/services/app-confirm/app-confirm.service';
import {EventService} from '../../shared/services/labServices/eventService';

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
  public events: EgretCalendarEvent[] = [];
  private actions: CalendarEventAction[];

  constructor(
    public dialog: MatDialog,
    private confirmService: AppConfirmService,
    private eventService: EventService,
  ) {
    this.actions = [
      {
        label: '<i class="material-icons icon-sm">edit</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('edit', event);
        },
      },
      {
        label: '<i class="material-icons icon-sm">close</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.removeEvent(event);
        },
      },
    ];
  }

  ngOnInit() {
    this.loadEvents();

  }

  private initEvents(events): EgretCalendarEvent[] {
    console.log('map', events);

    return events.map((event) => {
      event.actions = this.actions;
      return new EgretCalendarEvent(event);
    });
  }

  public loadEvents() {
    this.eventService.getAllEvents().subscribe((events: EgretCalendarEvent[]) => {
      this.events = this.initEvents(events);
    });
  }

  public removeEvent(event) {
    this.confirmService
      .confirm({
        title: 'Delete '+ event.title +'?',
      })
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.eventService.deleteEvent(event._id).subscribe((events) => {
          console.log("delete",events)
          this.loadEvents();
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
      this.eventService.addEvent(responseEvent).subscribe((events) => {
        this.loadEvents();
        console.log(this.events);

        this.refresh.next(true);
      });
    });
  }

  public handleEvent(action: string, event: CalendarEvent): void {
    this.dialogRef = this.dialog.open(CalendarFormDialogComponent, {
      panelClass: 'calendar-form-dialog',
      data: { event, action },
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
          this.loadEvents();
          this.refresh.next();
        });
      } else if (dialogAction === 'delete') {
        this.removeEvent(event);
      }
    });
  }

  public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
