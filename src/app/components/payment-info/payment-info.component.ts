import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInfo } from 'src/app/models/payment-info';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  public amount!: string;
  public bankCode!:string;
  public bankTranNo!:string;
  public cartType!:string;
  public orDerInfo!:string;
  public payDate!:string;
  public responseCode!:string;
  public tmnCode!:string;
  public transactionNo!:string;
  public transactionStatus!:string;
  public txnRef!:string;
  public secureHash!:string;

  public isError = false;
  public paymentInfo!: PaymentInfo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ){
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.amount = params['vnp_Amount'];
      this.bankCode = params['vnp_BankCode'];
      this.bankTranNo = params['vnp_BankTranNo'];
      this.cartType = params['vnp_CardType'];
      this.orDerInfo = params['vnp_OrderInfo'];
      this.payDate = params['vnp_PayDate'];
      this.responseCode = params['vnp_ResponseCode'];
      this.tmnCode = params['vnp_TmnCode'];
      this.transactionNo = params['vnp_TransactionNo'];
      this.transactionStatus = params['vnp_TransactionStatus'];
      this.txnRef = params['vnp_TxnRef'];
      this.secureHash = params['vnp_SecureHash'];

    })

    this.paymentInfor();
  }

  ngOnInit() {
  }

  paymentInfor(){
    this.orderService.paymentInfor(
      this.amount,
      this.bankCode,
      this.bankTranNo,
      this.cartType,
      this.orDerInfo,
      this.payDate,
      this.responseCode,
      this.tmnCode,
      this.transactionNo,
      this.transactionStatus,
      this.txnRef,
      this.secureHash
    ).subscribe({
      next: (res:any) => {
        console.log('Thong tin thanh toan',res);
        this.isError = false;
        this.paymentInfo = res.data;

      },error: (err) => {
        console.log('err thong tin thanh toan',err);
        this.isError = true;
      }
    })

  }

}
