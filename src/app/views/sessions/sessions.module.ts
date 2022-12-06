import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SessionsRoutes } from "./sessions.routing";
import {Signin3Component} from "./signin3/signin3.component";
import {Signup3Component} from "./signup3/signup3.component";


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [ Signup3Component, Signin3Component]
})
export class SessionsModule { }
