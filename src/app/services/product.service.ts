import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductDetails(id: string) {
    return this.http.get(API + 'product/' + id);
  }

  listProduct(req: any): Observable<any> {
    return this.http.post<any>(API + 'product/search', { ...req });
  }

  getListProduct(req: any): Observable<any> {
    return this.http.post<any>(API + 'product/search/v2', { ...req });
  }

  getProductRelated(productId: string): Observable<any> {
    return this.http.post<any>(
      API + 'product/relatedProduct',
      { productId },
      httpOptions
    );
  }

  getProductBestSeller(): Observable<any> {
    return this.http.get<any>(API + 'product/best-seller');
  }

  getAllProduct(): Observable<any> {
    return this.http.get<any>(API + '/product/no-page');
  }
}
