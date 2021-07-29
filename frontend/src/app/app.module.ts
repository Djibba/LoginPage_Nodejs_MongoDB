import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

const appRoutes: Routes = [
  { path: 'signin', component: LoginFormComponent },
  { path: 'signup', component: RegistrationFormComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
