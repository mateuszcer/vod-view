import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthComponent } from './auth/auth.component';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    SignUpPageComponent,
    ConfirmSignupComponent,
    LoginPageComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    ProgressSpinnerModule
  ],
})
export class AuthModule { }

