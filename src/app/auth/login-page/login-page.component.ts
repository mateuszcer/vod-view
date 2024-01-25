import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  signupForm: FormGroup;
  registered: boolean = false;
  error: string = '';
  errorMessages!: any[];
  resolving: boolean = false;

  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
     private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.errorMessages = [{ severity: 'error', summary: 'Error', detail: 'Invalid credentials' }];
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (!this.signupForm.valid) {
      this.error = 'Invalid data';
      return;
    }
    this.resolving = true;
    this.authService.login(this.email, this.password)
      .catch(error => {
        this.resolving = false;
        this.error = 'Error logging in. Please check your credentials and try again.';
        console.error('Error logging in:', error);
      });
  }

  get email(): string { return this.signupForm.get('email')?.value; }
  get password(): string { return this.signupForm.get('password')?.value; }
}
