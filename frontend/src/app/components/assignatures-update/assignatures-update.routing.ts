import { Routes } from '@angular/router';
import { AssignaturesUpdateGeneralComponent } from './assignatures-update-general.component';
import { AssignaturesUpdateProvesComponent } from './assignatures-update-proves.component';
import { AssignaturesUpdateAlumnesComponent } from './assignatures-update-alumnes.component';

export const ASSIGNATURES_UPDATE_ROUTES: Routes = [
  { 
  	path: 'general', 
  	component: AssignaturesUpdateGeneralComponent
  },
  { 
  	path: 'proves', 
  	component: AssignaturesUpdateProvesComponent
  },
  { 
  	path: 'alumnes', 
  	component: AssignaturesUpdateAlumnesComponent
  },
  { 
  	path: '**', 
  	pathMatch: 'full', 
  	redirectTo: 'general'
  },
];

// no hace falta dado que no queremos navegar al root
// export const app_routing = RouterModule.forRoot(app_routes);
