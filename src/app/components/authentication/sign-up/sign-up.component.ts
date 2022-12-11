import { ToastrService } from 'ngx-toastr';
import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  submitted = false;
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    dob: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  error = []
  constructor(private router: Router, private toastr: ToastrService, private account: AccountService, private fb: FormBuilder,) { }

  ngOnInit(): void {

  }

  get f(): { [key: string]: AbstractControl; } {
    return this.userForm.controls;
  }


  signUp() {
    let body = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      gender: this.userForm.get('gender')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      dob: moment(this.userForm.get('dob')?.value).format('DD/MM/YYYY'),
      password: this.userForm.get('password')?.value
    }

    this.account.register(body).subscribe((data: any) => {
      const message = data.message;
      console.log(message);

      this.toastr.success('Đăng ký thành công !!');
      this.toastr.success('Mời bạn đăng nhập lại !!');
      this.router.navigate(['/sign-in']);
    }, (err) => {
      this.toastr.error(err.error.message)
    });
  }
}
