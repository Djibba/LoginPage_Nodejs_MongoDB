import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { Routes, RouterModule } from "@angular/router";

export const appRoutes: Routes = [
  { path: 'signin', component: LoginFormComponent },
  { path: 'signup', component: RegistrationFormComponent },
]
