import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Create with Form Builder
  signupForm = this.fb.group(
    {
      userName: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pwConfirm: ['', Validators.required],
    },
    {
      validator: this.MustMatch('password', 'pwConfirm'),
    }
  );

  constructor(private fb: FormBuilder) {}

  onSubmit() {}

  /**
   * Custom validator ensuring to form controls have matching values
   * @param controlName The first control
   * @param matchingControlName The control that must match the first
   */
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
