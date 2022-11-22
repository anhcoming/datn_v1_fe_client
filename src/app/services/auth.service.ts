import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private helper: JwtHelperService,private http: HttpClient){ }

  login(formData: any): Observable<any> {
    return this.http.post(AUTH_API + 'login',formData, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token') as string;
    return !this.helper.isTokenExpired(token);
  }

}
