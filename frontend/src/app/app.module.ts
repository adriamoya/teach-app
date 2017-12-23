import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// third-party imports
import { AccordionModule,
         BsDatepickerModule,
         CollapseModule,
         ModalModule,
         TabsModule,
         TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoadingModule } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';
import { TruncateModule } from 'ng2-truncate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AUTH_PROVIDERS } from 'angular2-jwt';

// Components

// import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

import { AssignaturesCreateComponent } from './components/assignatures-create/assignatures-create.component';
import { AssignaturesListComponent } from './components/assignatures-list/assignatures-list.component';
import { AssignaturesDetailComponent } from './components/assignatures-detail/assignatures-detail.component';
import { AssignaturesUpdateComponent } from './components/assignatures-update/assignatures-update.component';
import { AssignaturesUpdateGeneralComponent } from './components/assignatures-update/assignatures-update-general.component';
import { AssignaturesUpdateProvesComponent } from './components/assignatures-update/assignatures-update-proves.component';
import { AssignaturesUpdateAlumnesComponent } from './components/assignatures-update/assignatures-update-alumnes.component';

import { AlumnesListComponent } from './components/alumnes-list/alumnes-list.component';
import { AlumnesDetailComponent } from './components/alumnes-detail/alumnes-detail.component';

import { ClassesCreateComponent } from './components/classes-create/classes-create.component';

import { CursosCreateComponent } from './components/cursos-create/cursos-create.component';

import { ProvesCreateComponent } from './components/proves-create/proves-create.component';
import { ProvesDetailComponent } from './components/proves-detail/proves-detail.component';
import { ProvesUpdateComponent } from './components/proves-update/proves-update.component';
import { ProvesUpdateDetailComponent } from './components/proves-update/proves-update-detail.component';

import { LoginDetailComponent } from './components/login-detail/login-detail.component';
import { SignupDetailComponent } from './components/signup-detail/signup-detail.component';

import { Ng2TagsInputItem } from "./components/tags-input/ng2-tagsinput-item";
import { Ng2TagsInput } from "./components/tags-input/ng2-tagsinput";


// Modals
import { ModalSavedChangesComponent } from './components/_modals/modal-saved-changes.component';
import { ModalAssignaturesUpdateComponent } from './components/_modals/modal-assignatures-update.component';
import { ModalClassesCreateComponent } from './components/_modals/modal-classes-create.component';


// Services
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth.guard';
import { NotesService } from './services/notes.service';
import { ProvesService } from './services/proves.service';
import { ClassesService } from './services/classes.service';
import { CursosService } from './services/cursos.service';
import { DimensionsService } from './services/dimensions.service';
import { AvaluacionsService } from './services/avaluacions.service';
import { AssignaturesService } from './services/assignatures.service';
import { AssignaturesDataService } from './services/assignatures-data.service';
import { AlumnesService } from './services/alumnes.service';
import { AvaluacionsCreateComponent } from './components/avaluacions-create/avaluacions-create.component';


// import { ModalDataService } from './components/assignatures-update/assignatures-update-proves.component';

// entryComponents
// import { ModalProvesUpdateDeleteComponent } from './components/assignatures-update/assignatures-update-proves.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProfileDetailComponent,

    AssignaturesCreateComponent,
    AssignaturesListComponent,
    AssignaturesDetailComponent,
    AssignaturesUpdateComponent,
    AssignaturesUpdateGeneralComponent,
    AssignaturesUpdateProvesComponent,
    AssignaturesUpdateAlumnesComponent,

    AlumnesListComponent,
    AlumnesDetailComponent,

    ClassesCreateComponent,
    
    CursosCreateComponent,
    
    ProvesCreateComponent,
    ProvesDetailComponent,
    ProvesUpdateComponent,
    ProvesUpdateDetailComponent,

    // Third-party
    Ng2TagsInputItem,
    Ng2TagsInput,
    LoginDetailComponent,
    SignupDetailComponent,
    
    // Modals
    ModalSavedChangesComponent,
    ModalAssignaturesUpdateComponent,
    ModalClassesCreateComponent,
    AvaluacionsCreateComponent,
  ],
  imports: [
    // AppRoutingModule,
    APP_ROUTING,
    BrowserModule,
    // ChartsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

      // ngx-bootstrap
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule,
    LoadingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule .forRoot(),
    TruncateModule,
    ],
  exports: [
    Ng2TagsInputItem,
    Ng2TagsInput
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthGuard,
    AuthenticationService,
    NotesService,
    ProvesService,
    AvaluacionsService,
    AssignaturesService,
    AssignaturesDataService,
    AlumnesService,
    ClassesService,
    CursosService,
    DimensionsService,
    // ModalDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalAssignaturesUpdateComponent,
    ModalSavedChangesComponent,
    ModalClassesCreateComponent,
  ]
})
export class AppModule { }
