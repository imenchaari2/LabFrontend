
import { Routes } from "@angular/router";
import {Signup3Component} from "./signup3/signup3.component";
import {Signin3Component} from "./signin3/signin3.component";


export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signup3",
        component: Signup3Component,
        data: { title: 'Signup3' }
      },
      {
        path: "signin3",
        component: Signin3Component,
        data: { title: "Signin3" }
      }
    ]
  }
];
