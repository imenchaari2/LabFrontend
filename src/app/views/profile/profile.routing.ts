import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
    {
      path: 'settings',
      component: ProfileSettingsComponent,
      data: { title: 'Settings' }
    }]
  }
];
