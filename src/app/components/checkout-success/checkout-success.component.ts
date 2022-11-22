import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail';
import { ProductOrder } from 'src/app/models/product-order';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
})
export class CheckoutSuccessComponent implements OnInit {
  id!: string;
  public orderDetail!: OrderDetail;
  public productOrder: ProductOrder[] = [];

  public user!: User;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getOrderDetail(this.id);
    this.getProfile();
  }

  getOrderDetail(id: string): any {
    this.orderService.getOrderDetail(id).subscribe({
      next: (res: any) => {
        this.orderDetail = res.data;
        this.productOrder = res.data.product;
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  printOrderInfo() {
    window.print();
  }

  getProfile() {
    this.account.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.data;
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
}
