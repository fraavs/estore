import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../../../services/users/user-service.service';
import { user } from 'src/app/home/types/user.type';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
  providers: [UserService],
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;
  constructor(private fb: FormBuilder, private userService: UserService) { }

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

  ngSubmit(): void {
    const user: user = {
      username: this.username?.value,
      email: this.email?.value,
      firstName: this.firstName?.value,
      lastName: this.userSignupForm.get('lastName')?.value,
      password: this.password?.value,
    }

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMessage = 'User created successfully.';
          this.alertType = 0;
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
    }, 
      error: (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      },
    });
   }

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
