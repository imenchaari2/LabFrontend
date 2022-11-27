import {NgModule, ErrorHandler} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
// import { GestureConfig } from '@angular/material/core';
import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';


import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/inmemory-db/inmemory-db.service';

import {rootRouterConfig} from './app.routing';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorHandlerService} from './shared/services/error-handler.service';
import {TokenInterceptor} from './shared/interceptors/token.interceptor';
import {ToolsComponent} from "./views/tools/tools.component";
import {ArticlesComponent} from "./views/articlesManagement/articles/articles.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddArticleComponent} from "./views/articlesManagement/add-article/add-article.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TeachersComponent} from "./views/membersManagement/teachers/teachers.component";
import {AddTeacherComponent} from "./views/membersManagement/add-Teacher/add-teacher.component";
import {AddStudentComponent} from "./views/membersManagement/add-student/add-student.component";
import { StudentsComponent } from './views/membersManagement/studens/students.component';
import {CalendarCommonModule, CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SelectAuteurComponent} from "./views/articlesManagement/affect-Author/select-auteur.component";
import { FilterByCreatedDatePeriodComponent } from './views/membersManagement/filterDate/filterByCreatedDatePeriod.component';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { DatePipe } from '@angular/common';
import {FileUploadModule} from "ng2-file-upload";
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        PerfectScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
        RouterModule.forRoot(rootRouterConfig, {useHash: false, relativeLinkResolution: 'legacy'}),
        MatTableModule,
        MatIconModule,
        MatChipsModule,
        NgxDatatableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        FlexModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        SharedPipesModule,
        MatDividerModule,
        MatTooltipModule,
        CalendarCommonModule,
        MatDialogModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        FormsModule,
        FileUploadModule,
    ],
    declarations: [
        AppComponent,
        StudentsComponent,
        TeachersComponent,
        ToolsComponent,
        ArticlesComponent,
        AddStudentComponent,
        AddTeacherComponent,
        AddArticleComponent,
        FilterByCreatedDatePeriodComponent,
        SelectAuteurComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        // REQUIRED IF YOU USE JWT AUTHENTICATION
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
