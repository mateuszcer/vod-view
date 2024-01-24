import { Component, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrl: './confirm-signup.component.scss'
})
export class ConfirmSignupComponent {
  confirmationCode: string = '';
  confirmationError: string = '';

  @Input() email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  confirmSignup() {
    this.authService.confirmSignUp(this.email, this.confirmationCode)
      .then(response => {
        this.router.navigate(['/videos']);
      })
      .catch(error => {
        console.error(error);
        this.confirmationError = 'Error confirming signup. Please check your confirmation code and try again.';
      });
  }
}
