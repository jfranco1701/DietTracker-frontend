import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailAddress: string;
  confirmEmailAddress: string;
  password: string;
  confirmPassword: string;
  lastName: string;
  firstName: string;
  recaptcha: any;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  showResponse(event) {
    // call to a backend to verify against recaptcha with private key
}

  ngOnInit() {
    this.recaptcha = (window as any).grecaptcha;

    this.registerForm = this.fb.group({
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]]
      },
      {
        validator: this.checkEmails('email', 'confirmEmail')
      }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: this.checkPasswords('password', 'confirmPassword')
      })
    });
  }

  checkEmails(emailField: string, confirmEmailField: string) {
    return (group: FormGroup) => {
      const email = group.controls[emailField],
      confirmEmail = group.controls[confirmEmailField];

      if (email.value !== confirmEmail.value) {
        return confirmEmail.setErrors({notEqual: true});
      } else {
        return confirmEmail.setErrors(null);
      }
    };
  }

  checkPasswords(passwordField: string, confirmPasswordField: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordField],
      confirmPassword = group.controls[confirmPasswordField];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({notEqual: true});
      } else {
        return confirmPassword.setErrors(null);
      }
    };
  }

  onSubmit() {
    console.log(this.registerForm.value, this.registerForm.valid);
  }

}
