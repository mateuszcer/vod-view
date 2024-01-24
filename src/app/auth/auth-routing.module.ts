import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'signup',
    component: SignUpPageComponent
  },
    {
      path: 'login',
      component: LoginPageComponent

    },]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
