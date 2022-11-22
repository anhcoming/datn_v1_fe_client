import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  constructor(private http: HttpClient) {
    this.getCategoryProduct();
  }

  getCategoryProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(AUTH_API+
      'suggest/category-list'
    );
  }

  getSize(cateId: string, height: string, weight: string): Observable<object> {
    return this.http.get(AUTH_API+
      'suggest/search?categoryId=' +
        cateId +
        '&height=' +
        height +
        '&weight=' +
        weight
    );
  }

  getListSize() {
    return this.http.get(AUTH_API + 'no-auth/size/no-page');
  }
}
