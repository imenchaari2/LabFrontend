import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ColorPickerModule } from 'ngx-color-picker';
import { AppCalendarComponent } from './app-calendar.component';
import { CalendarRoutes } from "./app-calendar.routing";
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {SelectMemberComponent} from "./affect-Member/select-member.component";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FlexLayoutModule,
        ColorPickerModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        RouterModule.forChild(CalendarRoutes),
        MatTooltipModule,
        MatSelectModule
    ],
  providers: [],
  // entryComponents: [CalendarFormDialogComponent],
  declarations: [
    AppCalendarComponent,
    CalendarFormDialogComponent,
      SelectMemberComponent
  ]
})
export class AppCalendarModule { }
