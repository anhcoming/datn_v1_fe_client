import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

let auth_token = window.localStorage.getItem('auth-token');

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${auth_token}`
});

const requestOptions = { headers: headers };

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(productOptionId:string,quantity:number) {
    return this.http.post(AUTH_API + 'cart/add-to-cart', {productOptionId,quantity}, requestOptions);
  }

  getListColorBySize(sizeId:string,productId:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("sizeId",sizeId);
    queryParams = queryParams.append("productId",productId);
    return this.http.get(AUTH_API + 'product-option/findColor', {params: queryParams});
  }

  getListSizeByProductId(productId:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("productId",productId);
    return this.http.get(AUTH_API + 'product-option/findSize', {params: queryParams});
  }

  findProductOptionId(colorId: string,sizeId:string,productId:string){
    return this.http.post(AUTH_API + 'product-option/findId', {colorId,sizeId,productId}, httpOptions);
  }

  getListCart(){
    return this.http.get(AUTH_API + 'cart/listCart', requestOptions);
  }

  updateCart(productOptionId: string, quantity: number){
    return this.http.post(AUTH_API + 'cart/update-cart', {productOptionId,quantity}, requestOptions);
  }

  deleteCart(productOptionId: string){
    return this.http.delete(AUTH_API + 'cart/delete/' + productOptionId, requestOptions);
  }

  countItemInCart() {
    return this.http.get(AUTH_API + 'cart/countCartItem', requestOptions);
  }



}
