import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      username: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngSubmit(): void {}
}
