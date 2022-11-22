import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const AUTH_API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let auth_token = window.localStorage.getItem('auth-token');

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${auth_token}`
});

const requestOptions = { headers: headers };
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  register(body: any): Observable<Object> {
    return this.http.post(AUTH_API + 'no-auth/customer/register', body, httpOptions);
  }

  getProfile(): Observable<Object> {
    return this.http.get(AUTH_API + 'user/personal', requestOptions);
  }

  updateProfile(body:any):Observable<Object>{
    return this.http.post(AUTH_API+'user/update-profile',body,requestOptions);
  }
}
