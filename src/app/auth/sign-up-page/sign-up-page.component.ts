import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
  signupForm: FormGroup;
  registered: boolean = false;
  error: string = '';
  resolving: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signUp(): void {
    this.resolving = true;
    if (this.signupForm.valid) {
      
      this.authService.signUp(this.firstName, this.lastName, 
        this.email, this.password, this.birthdate)
        .then(data => {
          this.registered = true;
          this.resolving = false;
        })
        .catch(error => {
          this.error = error.message || 'Error signing up. Please try again.';
          this.resolving = false;
        });
    } else {
    }
  }

  get firstName(): string { return this.signupForm.get('firstName')?.value; }
  get lastName(): string { return this.signupForm.get('lastName')?.value; }
  get email(): string { return this.signupForm.get('email')?.value; }
  get birthdate(): Date { return this.signupForm.get('birthdate')?.value; }
  get password(): string { return this.signupForm.get('password')?.value; }
}
