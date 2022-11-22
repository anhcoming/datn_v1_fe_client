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

const requestOptions = { headers: headers };

const requestOption = { headers: headers, responseType: 'text' as 'json' };

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(private http: HttpClient) {}

  getListFavourite(): Observable<any> {
    return this.http.get<any>(
      AUTH_API + 'favourite/listFavourite',
      requestOptions
    );
  }

  //CreateFavourite post mapping with productId
  createFavourite(productId: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'favourite',
      { productId },
      requestOptions
    );
  }

  deleteFavourite(id: string): Observable<any> {
    return this.http.delete<any>(
      AUTH_API + 'favourite/delete/' + id,
      requestOption
    );
  }
}
