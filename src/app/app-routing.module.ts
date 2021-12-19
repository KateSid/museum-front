import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
//import { EmployeesComponent } from './employees/employees.component';
//import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { ExhibitEditComponent } from './exhibit-edit/exhibit-edit.component';
import { ExposuresComponent } from './exposures/exposures.component';
import { ExposureEditComponent } from './exposure-edit/exposure-edit.component';
import { RestorationsComponent } from './restorations/restorations.component';
import { RestorationEditComponent } from './restoration-edit/restoration-edit.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { ShowroomEditComponent } from './showroom-edit/showroom-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/:id', component: AuthorEditComponent },
  //{ path: 'employees', component: EmployeesComponent },
  //{ path: 'employees/:id', component: EmployeeEditComponent },
  { path: 'exhibits', component: ExhibitsComponent },
  { path: 'exhibits/:id', component: ExhibitEditComponent },
  { path: 'exposures', component: ExposuresComponent },
  { path: 'exposures/:id', component: ExposureEditComponent },
  { path: 'restorations', component: RestorationsComponent },
  { path: 'restorations/:id', component: RestorationEditComponent },
  { path: 'showrooms', component: ShowroomsComponent },
  { path: 'showrooms/:id', component: ShowroomEditComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
