import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getListOrder(): Observable<any> {debugger
    return this.http.get<any>(AUTH_API + 'order/myOrders', requestOptions);
  }

  getOrderDetail(id: string): Observable<any> {
    return this.http.get<any>(AUTH_API + 'order/' + id, requestOptions);
  }

  checkout(order: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'order/checkout',
      order,
      requestOptions
    );
  }

  //cancelOrder with post method and body with id and note
  cancelOrder(order: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'order/cancelOrder',
      order,
      requestOptions
    );
  }

  checkReview(id: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'review/checkReview',
      id,
      requestOptions
    );
  }

  checkReviewProduct(id: any): Observable<any> {
    return this.http.get<any>(
      AUTH_API + 'review/checkReview/' + id,
      requestOptions
    );
  }

  async existReview(id: any) {
    const result = await this.http
      .get<any>(AUTH_API + 'review/checkReview/' + id, requestOptions)
      .toPromise();

    return result;
  }

  //checkExistReview return a boolean use async await
  async checkExistReview(id: any): Promise<boolean> {
    const result = await this.http
      .get<any>(AUTH_API + 'review/check/' + id, requestOptions)
      .toPromise();
    return result;
  }

  //checkExistReview return a boolean use async await
  async checkExistReviews(id: any): Promise<boolean> {
    const result = await this.http
      .get<any>(AUTH_API + 'review/checkReview/' + id, requestOptions)
      .toPromise();
    return result;
  }

  countMyOrder(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'order/count/myOrder', requestOptions);
  }

  listOrder(req: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'order/search',
      { ...req },
      requestOptions
    );
  }

  //payment with vnPay
  paymentVnPay(
    amount: number,
    description: string,
    bankCode: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('description', description)
      .set('bankCode', bankCode);
    return this.http.post<any>(AUTH_API + 'vnpay/checkout', { params: params });
  }

  submitOrderReceived(order: any): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'order/submit/received',
      order,
      requestOptions
    );
  }

  vnpay(pay: any) {
    return this.http.post<any>(AUTH_API + 'vnpay/payment', pay, httpOptions);
  }

  paymentInfor(
    amount: string,
    bankCode: string,
    bankTranNo: string,
    cartType: string,
    orDerInfo: string,
    payDate: string,
    responseCode: string,
    tmnCode: string,
    transactionNo: string,
    transactionStatus: string,
    txnRef: string,
    secureHash: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('vnp_Amount', amount)
      .set('vnp_BankCode', bankCode)
      .set('vnp_BankTranNo', bankTranNo)
      .set('vnp_CardType', cartType)
      .set('vnp_OrderInfo', orDerInfo)
      .set('vnp_PayDate', payDate)
      .set('vnp_ResponseCode', responseCode)
      .set('vnp_TmnCode', tmnCode)
      .set('vnp_TransactionNo', transactionNo)
      .set('vnp_TransactionStatus', transactionStatus)
      .set('vnp_TxnRef', txnRef)
      .set('vnp_SecureHash', secureHash);

    return this.http.get<any>(AUTH_API + 'vnpay/thong-tin-thanh-toan', {
      params,
    });
  }
}
