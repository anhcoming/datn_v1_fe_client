import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Discount } from './../../../models/discount';

@Component({
  selector: 'app-my-discount',
  templateUrl: './my-discount.component.html',
  styleUrls: ['./my-discount.component.css'],
})
export class MyDiscountComponent implements OnInit {
  discount: Discount[] = [];

  //page
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;

  req: any = {
    pageReq: {
      page: 0,
      pageSize: 5,
      sortField: '',
      sortDirection: '',
    },
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getListDiscount();
  }

  getListDiscount() {
    this.userService.getListDiscount(this.req).subscribe({
      next: (res: any) => {
        this.discount = res.data;
        this.page = res.page;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        console.log('discount', this.discount);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageChange(event: any) {
    this.req.pageReq.page = event - 1;
    this.getListDiscount();
  }
}
