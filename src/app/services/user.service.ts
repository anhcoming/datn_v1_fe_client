import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
let auth_token = window.localStorage.getItem('auth-token');

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${auth_token}`,
});

const headerss = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${auth_token}`,
  noLoading: 'true',
});

const requestOptions = { headers: headers };

const requestOptionss = { headers: headerss };

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUserProfile(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'user/my-profile', requestOptions);
  }

  getListDiscount(req: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'discount/my-discount',
      { ...req },
      requestOptions
    );
  }

  getTop3Notification(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'notification/top3', requestOptionss);
  }

  getAllNotification(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'notification/search', requestOptions);
  }

  readNotification(id: string): Observable<any> {
    return this.http.get<any>(
      AUTH_API + 'notification/read?id=' + id,
      requestOptions
    );
  }

  readAllNotification(): Observable<any> {
    return this.http.get<any>(
      AUTH_API + 'notification/read-all',
      requestOptions
    );
  }

  verifyDiscount(data: any) {
    return this.http.post<any>(
      'http://localhost:8080/api/v2/checkout/verify-discount',
      data,
      requestOptions
    );
  }
}
