import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail';
import { ProductOrder } from 'src/app/models/product-order';
import { RatingService } from 'src/app/services/rating.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  id!: string;
  public orderDetail!: OrderDetail;
  public productOrder: ProductOrder[] = [];
  review:any= []
  check: boolean = false;
  starRating = 0;

  productId!: string;

  ratingForm = new FormGroup({
    starRating: new FormControl(0, [Validators.required]),
    contentRating: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private order: OrderService,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getOrderDetail(this.id);
  }

  checkReviewExist(productId: any) {
    this.order.checkReviewExist(productId, this.id)
  }

  getOrderDetail(id: string): any {
    this.order.getOrderDetail(id).subscribe({
      next: (res: any) => {
        console.log('res order detail', res);
        this.orderDetail = res.data;
        this.productOrder = res.data.product;
        console.log('this.productOrder : ', this.productOrder);
        for (let i = 0; i < this.productOrder.length; i++) {
          this.order.checkReviewExist(this.productOrder[i].productId, this.id).subscribe((res) => {
            // console.log("REview", res.data[0]?.reviewId)
            let review = res.data[0]?.reviewId
            this.productOrder[i].reviewId = review
            console.log(this.productOrder)
            console.log("Soos ddee",this.productOrder.length)
            if( this.productOrder.length>1){
              if(this.productOrder[i].productId == this.productOrder[i-1].productId){
                this.productOrder.splice(i,1000)
              }
            }
         
          })
        }
     
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  get f() {
    return this.ratingForm.controls;
  }

  showModalRating(id: any) {
    this.productId = id;
    console.log('productId', this.productId);
  }

  rating() {
    console.log(this.ratingForm.value);
    const rating = {
      content: this.ratingForm.value.contentRating,
      rating: this.ratingForm.value.starRating,
      productId: this.productId,
      orderId: this.id,
    };

    console.log('rating', rating);

    this.ratingService.createRating(rating).subscribe({
      next: (res: any) => {
        console.log('res rating', res);
        this.getOrderDetail(this.id);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
}
