import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: matchPasswords,
      }
    );
  }

  ngSubmit(): void { }

  get username(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }
}
