import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../services/account.service';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user = new User();
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    // email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    dob: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    // gender: [''],
  });
  constructor(
    private account: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }
  value = true;

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  getProfile() {
    this.account.getProfile().subscribe((data: any) => {
      console.log(data);
      this.user = data.data;
      this.user.dob = moment(this.user.dob).format('YYYY-MM-DD');
      console.log(this.user.dob);
      // console.log(this.user.gender);
    });
  }


  updateProfile() {
    let body = {
      id: this.user.id,
      firstName:
        this.userForm.get('firstName')?.value == ''
          ? this.user.firstName
          : this.userForm.get('firstName')?.value,
      lastName:
        this.userForm.get('lastName')?.value == ''
          ? this.user.lastName
          : this.userForm.get('lastName')?.value,
      email: this.user.email,
      phone:
        this.userForm.get('phone')?.value == ''
          ? this.user.phone
          : this.userForm.get('phone')?.value,
      dob:
        this.userForm.get('dob')?.value == ''
          ? this.user.dob
          : this.userForm.get('dob')?.value,
      // gender: this.userForm.get('gender')?.value == 'true' ? true : false,
    };
    this.account.updateProfile(body).subscribe(
      (data: any) => {
        this.toastr.success('Cập nhật tài khoản thành công');
      },
      (error) =>
        this.toastr.error(error.error.message, 'Cập nhật tài khoản thất bại')
    );
  }
}
