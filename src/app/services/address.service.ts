import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateAddress } from '../models/create-address';



let auth_token = window.localStorage.getItem('auth-token');

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${auth_token}`,
});

const requestOptions = { headers: headers };

const requestOption = { headers: headers, responseType: 'text' as 'json' };

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getListAddress(): Observable<any> {
    return this.http.get<any>(
      AUTH_API + 'address/list-address',
      requestOptions
    );
  }

  getAddressById(id: string): Observable<any> {
    return this.http.get<any>(AUTH_API + 'address/' + id, requestOptions);
  }

  setDefaultAddress(id: string): Observable<any> {
    return this.http.get<any>(
      `${AUTH_API}address/default/${id}`,
      requestOption
    );
  }

  updateAddress(address: CreateAddress): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'address/update',
      address,
      requestOptions
    );
  }

  createAddress(address: CreateAddress): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'address/create',
      address,
      requestOptions
    );
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete<any>(
      AUTH_API + 'address/delete/' + id,
      requestOption
    );
  }

  getAddressDefault(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'address/default', requestOptions);
  }
}
