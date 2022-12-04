import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ArticlesComponent} from "./views/articlesManagement/articles/articles.component";
import {ToolsComponent} from "./views/tools/tools.component";
import {TeachersComponent} from "./views/membersManagement/teachers/teachers.component";
import {StudentsComponent} from './views/membersManagement/studens/students.component';

export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'login'
    // },
    // {
    //     path: 'login' ,
    //     pathMatch: 'full',
    //     component: LoginComponent,
    // },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sessions',
                loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
                data: {title: 'Session'}
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {title: 'Dashboard', breadcrumb: 'DASHBOARD'}
            },
            {
                path: 'members',
                children: [
                    {
                        path: 'students',
                        pathMatch: 'full',
                        component: StudentsComponent,
                    },
                    {
                        path: 'teachers',
                        pathMatch: 'full',
                        component: TeachersComponent,
                    }
                ]
            },
            {
                path: 'tools',
                pathMatch: 'full',
                component: ToolsComponent,
            },
            {
                path: 'articles',
                pathMatch: 'full',
                component: ArticlesComponent,
            },
            {
                path: 'events',
                pathMatch: 'full',
                loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
            },

            {
                path: 'chart',
                loadChildren: () => import('./views/chart-example-view/chart-example-view.module').then(m => m.ChartExampleViewModule),
                data: {title: 'Charts', breadcrumb: 'CHARTS'}
            },
            {
                path: 'charts',
                loadChildren: () => import('./views/charts/charts.module').then(m => m.AppChartsModule),
                data: {title: 'Charts', breadcrumb: 'CHARTS'}
            },
            {
                path: 'profile',
                loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
            },

        ]
    },
    {
        path: '**',
        redirectTo: 'sessions/404'
    }
];

