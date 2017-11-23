import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// third-party imports
import { AccordionModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AUTH_PROVIDERS } from 'angular2-jwt';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssignaturesListComponent } from './components/assignatures-list/assignatures-list.component';
import { AssignaturesDetailComponent } from './components/assignatures-detail/assignatures-detail.component';
import { ProvesDetailComponent } from './components/proves-detail/proves-detail.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { AssignaturesUpdateComponent } from './components/assignatures-update/assignatures-update.component';
import { AssignaturesUpdateDetailComponent } from './components/assignatures-update/assignatures-update-detail.component';
import { AlumnesListComponent } from './components/alumnes-list/alumnes-list.component';
import { AlumnesDetailComponent } from './components/alumnes-detail/alumnes-detail.component';
import { AssignaturesCreateComponent } from './components/assignatures-create/assignatures-create.component';
import { ProvesCreateComponent } from './components/proves-create/proves-create.component';
import { ProvesUpdateComponent } from './components/proves-update/proves-update.component';
import { ProvesUpdateDetailComponent } from './components/proves-update/proves-update-detail.component';
import { LoginDetailComponent } from './components/login-detail/login-detail.component';
import { SignupDetailComponent } from './components/signup-detail/signup-detail.component';
import { Ng2TagsInputItem } from "./components/tags-input/ng2-tagsinput-item";
import { Ng2TagsInput } from "./components/tags-input/ng2-tagsinput";

// Services
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AssignaturesListComponent,
    AssignaturesDetailComponent,
    ProvesDetailComponent,
    ProfileDetailComponent,
    AssignaturesUpdateComponent,
    AssignaturesUpdateDetailComponent,
    AlumnesListComponent,
    AlumnesDetailComponent,
    AssignaturesCreateComponent,
    ProvesCreateComponent,
    ProvesUpdateComponent,
    ProvesUpdateDetailComponent,

    Ng2TagsInputItem,
    Ng2TagsInput,
    LoginDetailComponent,
    SignupDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

	  // ngx-bootstrap
    AccordionModule.forRoot(),
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule,
    LoadingModule
  ],
  exports: [
    Ng2TagsInputItem,
    Ng2TagsInput
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthGuard,
    AuthenticationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
