import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../services/account.service';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user = new User;
  userForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],


  })
  constructor(private account: AccountService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.userForm.controls;
  }

  getProfile() {
    this.account.getProfile().subscribe((data: any) => {
      console.log("Thay đổi pas:" + data.data);
      this.user = data.data;
    })

  }
  updatePassword() {
    let body = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      dob: this.user.dob,
      gender: this.user.gender,
      password: this.userForm.get('password')?.value == "" ? this.user.oldPassword : this.userForm.get('password')?.value,
      newPassword: this.userForm.get('newPassword')?.value == "" ? this.user.newPassword : this.userForm.get('newPassword')?.value,
    }

    this.account.updateProfile(body).subscribe((data: any) => {
      this.toastr.success("Cập nhật mật khẩu thành công")
    }, error => this.toastr.error(error.error.message))
  }

}
