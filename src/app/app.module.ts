import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthorsComponent } from './authors/authors.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { ExhibitEditComponent } from './exhibit-edit/exhibit-edit.component';
import { ExposuresComponent } from './exposures/exposures.component';
import { ExposureEditComponent } from './exposure-edit/exposure-edit.component';
import { RestorationsComponent } from './restorations/restorations.component';
import { RestorationEditComponent } from './restoration-edit/restoration-edit.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { ShowroomEditComponent } from './showroom-edit/showroom-edit.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    AuthorsComponent,
    AuthorEditComponent,
    EmployeesComponent,
    EmployeeEditComponent,
    ExhibitsComponent,
    ExhibitEditComponent,
    ExposuresComponent,
    ExposureEditComponent,
    RestorationsComponent,
    RestorationEditComponent,
    ShowroomsComponent,
    ShowroomEditComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
