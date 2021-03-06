import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { HomeComponent }   from './components/home/home.component';

import { AlumnesListComponent } from './components/alumnes-list/alumnes-list.component';
import { AlumnesDetailComponent } from './components/alumnes-detail/alumnes-detail.component';

import { AvaluacionsCreateComponent } from './components/avaluacions-create/avaluacions-create.component';

import { AssignaturesCreateComponent } from './components/assignatures-create/assignatures-create.component';
import { AssignaturesListComponent } from './components/assignatures-list/assignatures-list.component';
import { AssignaturesDetailComponent } from './components/assignatures-detail/assignatures-detail.component';
import { AssignaturesUpdateComponent } from './components/assignatures-update/assignatures-update.component';
import { ASSIGNATURES_UPDATE_ROUTES } from './components/assignatures-update/assignatures-update.routing';

import { ClassesCreateComponent } from './components/classes-create/classes-create.component';

import { CursosCreateComponent } from './components/cursos-create/cursos-create.component';

import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

import { ProvesCreateComponent } from './components/proves-create/proves-create.component';
import { ProvesDetailComponent } from './components/proves-detail/proves-detail.component';
import { ProvesUpdateComponent } from './components/proves-update/proves-update.component';

import { LoginDetailComponent } from './components/login-detail/login-detail.component';
import { SignupDetailComponent } from './components/signup-detail/signup-detail.component';


// Services
import { AuthGuard } from './services/auth.guard';


const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginDetailComponent
  },
  {
    path: 'signup',
    component: SignupDetailComponent
  },
  {
    path: 'assignatures',
    component: AssignaturesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alumnes',
    component: AlumnesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alumnes/:id',
    component: AlumnesDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'classes/add',
    component: ClassesCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cursos/add',
    component: CursosCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'avaluacions/add',
    component: AvaluacionsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignatures/add',
    component: AssignaturesCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignatures/:id',
    component: AssignaturesDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignatures/:id/edit',
    component: AssignaturesUpdateComponent,
    canActivate: [AuthGuard],
    children: ASSIGNATURES_UPDATE_ROUTES
  },
  {
    path: 'proves/add',
    component: ProvesCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignatures/:id/proves/:id',
    component: ProvesDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignatures/:id/proves/:id/edit',
    component: ProvesUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil/:id',
    component: ProfileDetailComponent,
    canActivate: [AuthGuard]
  }
];

/*
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
*/
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);