import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static containsNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const containsNumber = /\d/.test(value);
      return containsNumber ? null : { containsNumber: true };
    };
  }

  static containsUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const containsUppercase = /[A-Z]/.test(value);
      return containsUppercase ? null : { containsUppercase: true };
    };
  }

  static containsLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const containsLowercase = /[a-z]/.test(value);
      return containsLowercase ? null : { containsLowercase: true };
    };
  }

  static containsSpecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const containsSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return containsSpecialCharacter ? null : { containsSpecialCharacter: true };
    };
  }
}
