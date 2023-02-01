import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  public orders: Order[] = [];
  reason: string = '';
  orderId: string = '';
  orderIdSubmit: string = '';
  @ViewChild('exampleModal') modal: any;

  numberOrder: number = 0;

  form = new FormGroup({
    note: new FormControl(''),
  });

  public status: any[] = [
    {
      statusId: 'PENDING',
      statusName: 'Chờ xác nhận',
    },
    {
      statusId: 'CANCELED',
      statusName: 'Đã hủy',
    },
    {
      statusId: 'REJECTED',
      statusName: 'Bị từ chối',
    },
    {
      statusId: 'ACCEPTED',
      statusName: 'Được chấp nhận',
    },
    {
      statusId: 'SHIPPING',
      statusName: 'Đang giao hàng',
    },
    {
      statusId: 'EXCHANGE',
      statusName: 'Đổi hàng',
    },
    {
      statusId: 'REFUND',
      statusName: 'Trả hàng',
    },
    {
      statusId: 'RECEIVED',
      statusName: 'Đã giao',
    },
  ];

  //page
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;

  req: any = {
    textSearch: '',
    status: '',
    pageReq: {
      page: 0,
      pageSize: 5,
      sortField: '',
      sortDirection: '',
    },
  };

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.searchListOrder(this.req);
    this.countMyOrder();
  }

  searchListOrder(req: any) {
    this.orderService.listOrder(req).subscribe({
      next: (res: any) => {
        console.log('res list search order: ', res);
        this.orders = res.data;

        this.page = res.page;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  cancelOrder(id: string) {
    console.log('orderId: ', id);
    this.orderId = id;
  }

  submitOrder(id: string) {
    console.log('orderIdSubmit: ', id);
    this.orderIdSubmit = id;
  }

  countMyOrder() {
    this.orderService.countMyOrder().subscribe({
      next: (res: any) => {
        this.numberOrder = res.data;
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  confirmReasonOrder() {
    console.log('orderId value:', this.orderId);
    console.log('reason: ', this.reason);

    const data = {
      orderId: this.orderId,
      note: this.reason,
    };

    this.orderService.cancelOrder(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Hủy đơn hàng thành công');
        this.searchListOrder(this.req);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

    this.resetReason();
    this.hideModal();
  }

  submitOrderReceived() {
    //print value form
    console.log('form value: ', this.form.value);

    //print value note in form
    console.log('note in form: ', this.form.get('note')?.value);

    const data = {
      orderId: this.orderIdSubmit,
      note: this.form.get('note')?.value,
    };

    console.log('data: ', data);

    this.orderService.submitOrderReceived(data).subscribe({
      next: () => {
        this.searchListOrder(this.req);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

    //after submit
    this.form.reset();
  }

  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    this.searchListOrder(this.req);
  }

  hideModal() {
    this.modal.nativeElement.click();
  }

  resetReason() {
    this.reason = '';
  }

  search(e: any) {
    this.req.textSearch = e.target.value;
    console.log('search change : ', this.req);
    this.searchListOrder(this.req);
  }

  changeStatus(e: any) {
    this.req.status = e.target.value;
    this.req.pageReq.page = 0;
    console.log('status change : ', this.req);
    this.searchListOrder(this.req);
  }
}
