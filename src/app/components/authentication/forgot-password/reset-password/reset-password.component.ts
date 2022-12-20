import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from './../../../../services/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  resetForm = new FormGroup({
    otp: new FormControl(''),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    dupPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get f() {
    return this.resetForm.controls;
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private service: ForgotPasswordService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    console.log('token', this.token);
  }
  resetPassword() {
    let body = {
      token: this.token,
      password: this.resetForm.get('newPassword')?.value,
    };
    this.service.resetPassword(body).subscribe(
      (data) => {},
      (err) => {
        if (err.status == 400) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.success('Mời bạn đăng nhập lại');
          this.toastr.success('Cập nhật mật khẩu thành công');
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
