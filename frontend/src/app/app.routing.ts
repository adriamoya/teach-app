import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { HomeComponent }   from './components/home/home.component';
import { AlumnesListComponent } from './components/alumnes-list/alumnes-list.component';
import { AlumnesDetailComponent } from './components/alumnes-detail/alumnes-detail.component';
import { AssignaturesCreateComponent } from './components/assignatures-create/assignatures-create.component';
import { AssignaturesListComponent } from './components/assignatures-list/assignatures-list.component';
import { AssignaturesDetailComponent } from './components/assignatures-detail/assignatures-detail.component';
import { AssignaturesUpdateComponent } from './components/assignatures-update/assignatures-update.component';
import { LoginDetailComponent } from './components/login-detail/login-detail.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProvesCreateComponent } from './components/proves-create/proves-create.component';
import { ProvesDetailComponent } from './components/proves-detail/proves-detail.component';
import { ProvesUpdateComponent } from './components/proves-update/proves-update.component';
import { SignupDetailComponent } from './components/signup-detail/signup-detail.component';

const routes: Routes = [
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
    component: AssignaturesListComponent
  },
  {
    path: 'alumnes',
    component: AlumnesListComponent
  },
  {
    path: 'alumnes/:id',
    component: AlumnesDetailComponent
  },
  {
    path: 'assignatures/add',
    component: AssignaturesCreateComponent
  },
  {
    path: 'assignatures/:id',
    component: AssignaturesDetailComponent
  },
  {
    path: 'assignatures/:id/edit',
    component: AssignaturesUpdateComponent
  },
  {
    path: 'proves/add',
    component: ProvesCreateComponent
  },
  {
    path: 'assignatures/:id/:id',
    component: ProvesDetailComponent
  },
  {
    path: 'assignatures/:id/:id/edit',
    component: ProvesUpdateComponent
  },
  {
    path: 'perfil/:id',
    component: ProfileDetailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
