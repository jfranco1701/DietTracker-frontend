import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ConfirmationService]
})
export class RegisterComponent implements OnInit {
  public errors: any = [];
  emailAddress: string;
  confirmEmailAddress: string;
  password: string;
  confirmPassword: string;
  lastName: string;
  firstName: string;
  recaptcha: any;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _authenticationService: AuthenticationService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  showResponse(event) {
    // call to a backend to verify against recaptcha with private key
  }

  ngOnInit() {
    this.recaptcha = (window as any).grecaptcha;

    this.registerForm = this.fb.group({
      nameGroup: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
      }),
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
    console.log(this.registerForm.get('emailGroup').get('email').value);
    this.register(
        this.registerForm.get('emailGroup').get('email').value,
        this.registerForm.get('passwordGroup').get('password').value,
        this.registerForm.get('nameGroup').get('firstName').value,
        this.registerForm.get('nameGroup').get('lastName').value
    );
  }

  register(emailAddress: string, password: string, firstName: string, lastName: string) {
    console.log('Register: ' + emailAddress + ', ' + password + ', ' + firstName + ' ' + lastName);

    this._authenticationService.register({
        'username': emailAddress, 'first_name': firstName, 'password': password,
        'email': emailAddress, 'last_name': lastName
    }).subscribe(
        data => {
          console.log(data);

          this.confirmationService.confirm({
            message: 'Thank you for registering!',
            header: 'Registration Complete!',
            accept: () => {
              this.router.navigate(['/login']);
            }
          });


        },
        err => {
          this.errors = err['error'];

          if (this.errors.email) {
            const index = this.errors.email.findIndex(x => x === 'This field must be unique.');
            if (index >= 0) {
              this.errors.email[index] = 'Email address is already in use.  Please select another.';
            }
          }
          console.log(this.errors);
        });
  }
}
