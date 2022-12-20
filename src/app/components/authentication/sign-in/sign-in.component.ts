import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  roles!: string;
  helper = new JwtHelperService();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  login() {
    //decode jwt
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    this.http.post(AUTH_API + 'login', formData).subscribe(
      (res: any) => {
        const { accessToken, refreshToken } = res;
        this.tokenStorage.saveToken(accessToken);
        this.tokenStorage.saveRefreshToken(refreshToken);
        const decodedToken = this.helper.decodeToken(accessToken);
        console.log('decodedToken : ', decodedToken);
        this.tokenStorage.saveUser(decodedToken);
        this.roles = this.tokenStorage.getUser().role;
        this.toastr.success('Đăng nhập thành công !!');
        window.location.reload();
      },
      (err:any) => {
        console.log('error', err);
        this.toastr.error('Đăng nhập thất bại !!');
      }
    );
        this.router.navigate(['/home']);
  }
}
