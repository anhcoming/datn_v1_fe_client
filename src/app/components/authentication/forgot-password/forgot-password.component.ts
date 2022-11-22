import { ForgotPasswordService } from './../../../services/forgot-password.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  show = false;
  errorMessage = ""
  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email])

  })
  spinnerText = "Đang kiểm tra email của bạn..."
  constructor(private service: ForgotPasswordService, private toastr: ToastrService, private fb: FormBuilder, private spinner: NgxSpinnerService
  ) {
  }
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
  }
  check() {
    this.errorMessage = ""
  }
  forgotPassword() {
    this.spinner.show()
    const email = this.form.get('email')?.value;
    this.service.forgotPassword(email).subscribe((data) => {
      this.spinner.hide();
      this.show = true;
    }, err => {
      this.spinner.hide()
      this.show = false
      if (err.status == 404) {
        this.errorMessage = "Email của bạn chưa được đăng ký"
      } else if (err.status == 400) {
        this.errorMessage = "Bạn đã gửi yêu cầu Reset mật khẩu quá 5 lần một ngày"
      }
    }
    )

  }


}
