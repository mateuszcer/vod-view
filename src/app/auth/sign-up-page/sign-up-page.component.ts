import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { PasswordValidators } from '../validators/password.validators';

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
  errorMessages!: any[];
  

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    this.errorMessages = [{ severity: 'error', summary: 'Error', detail: 'Invalid signup data' }];
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), 
      PasswordValidators.containsUppercase, PasswordValidators.containsNumber, PasswordValidators.containsSpecialCharacter]],
    });
  }

  signUp(): void {

    if (this.signupForm.valid) {
      this.resolving = true;
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
      this.error = 'Invalid data';
    }
  }

  get firstName(): string { return this.signupForm.get('firstName')?.value; }
  get lastName(): string { return this.signupForm.get('lastName')?.value; }
  get email(): string { return this.signupForm.get('email')?.value; }
  get birthdate(): Date { return this.signupForm.get('birthdate')?.value; }
  get password(): string { return this.signupForm.get('password')?.value; }
}
