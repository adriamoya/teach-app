import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { AlumnesListComponent } from './alumnes-list/alumnes-list.component';
import { AlumnesDetailComponent } from './alumnes-detail/alumnes-detail.component';
import { AssignaturesCreateComponent } from './assignatures-create/assignatures-create.component';
import { AssignaturesListComponent } from './assignatures-list/assignatures-list.component';
import { AssignaturesDetailComponent } from './assignatures-detail/assignatures-detail.component';
import { AssignaturesUpdateComponent } from './assignatures-update/assignatures-update.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProvesCreateComponent } from './proves-create/proves-create.component';
import { ProvesDetailComponent } from './proves-detail/proves-detail.component';
import { ProvesUpdateComponent } from './proves-update/proves-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
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