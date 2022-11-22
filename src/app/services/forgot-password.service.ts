import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {

  }
  forgotPassword(email: string): Observable<any> {
    return this.http.get(API + "no-auth/forgot-password/send-mail?email=" + email)
  }


  resetPassword(body:any): Observable<any> {
    return this.http.post(API+"no-auth/reset-password",body)
  }
}
