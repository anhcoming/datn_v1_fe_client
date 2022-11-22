import { Component, OnInit } from '@angular/core';
import { Province } from 'src/app/models/province';
import { GhnService } from 'src/app/services/ghn.service';
import { District } from '../../models/district';
import { Ward } from '../../models/ward';
import { Shipping } from '../../models/shipping';
import { Service } from 'src/app/models/service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGEX_CUSTOM } from 'src/app/models/constant';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';
import { OrderService } from 'src/app/services/order.service';
import { CreateOrder } from 'src/app/models/create-order';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartResponse } from '../../models/cart-response';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  provinces!: Province[];
  districts!: District[];
  wards!: Ward[];
  shipping!: Shipping;
  services!: Service[];
  provinceSelected!: number;
  districtSelected!: number;
  wardCodeSelected!: string;
  serviceSelected!: number;

  public cart!: Cart[];
  cartRes!: CartResponse[];
  public address: Address[] = [];

  totalPrice!: any;
  shipPrice!: number;
  total!: number;

  totalItems!: number;

  order!: CreateOrder;

  public orderId: string = '';

  idAddressDefault: string = '';

  saleDiscount!: number;
  shipDiscount!: number;
  totalPriceBeforeDiscount!: number;
  shopPrice!: number;
  totalDiscount: number = 0;

  public cod: any;
  public banking: any;
  public vnpay: any;

  db: string = 'Đường bộ';

  errorMessage: string = '';

  checkoutForm = new FormGroup({
    addressId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_CUSTOM.PHONE_NUMBER),
    ]),
    address: new FormControl('', [Validators.required]),
    note: new FormControl(''),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    shippingMethod: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    discountCode: new FormControl(''),
  });

  constructor(
    private GhnService: GhnService,
    private cartService: CartService,
    private toastr: ToastrService,
    private addressService: AddressService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getListAddress();
    this.getProvinces();
    this.getAllCart();
    this.getAddressIdDefault();
  }

  checkAddress() {
    //Check if the user has an address or not, if not, then switch to the address page to add a new address and notify that a new address is required to checkout.
    if (this.address.length == 0) {
      this.router.navigate(['/address']);
      this.toastr.warning('Vui lòng thêm địa chỉ mới để thanh toán.');
    }
  }

  //if class caddress select addvalue to address
  onChangeAddress(e: any) {
    this.addressService.getAddressById(e.target.value).subscribe({
      next: (address: any) => {
        console.log('address get Id: ', address);
        this.checkoutForm.patchValue({
          name: address.data.nameOfRecipient,
          phone: address.data.phoneNumber,
          address: address.data.exact,
          province: address.data.provinceId,
          district: address.data.districtId,
          ward: address.data.wardCode,
        });

        console.log('checkoutForm: ', this.checkoutForm.value);

        //path provinceId selected
        this.provinceSelected = address.data.provinceId;
        this.getDistricts(this.provinceSelected);
        this.districtSelected = address.data.districtId;
        this.getWards(this.districtSelected);
        this.getService(this.districtSelected);
      },
    });
  }

  //function return addressId which address isDefault = true
  getAddressIdDefault() {
    this.addressService.getAddressDefault().subscribe({
      next: (res: any) => {
        this.idAddressDefault = res.data;
        console.log('idAddressDefault: ', this.idAddressDefault);
      },
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  getAllCart() {
    this.cartService.getListCart().subscribe({
      next: (response: any) => {
        console.log('res :', response);
        this.cart = response.data.carts;
        this.totalPrice = response.data.totalPrice;
        this.totalItems = response.data.totalItems;
        console.log('cart : ', this.cart);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  getListAddress() {
    this.addressService.getListAddress().subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        this.address = res.data;
        console.log('address:', this.address);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  getProvinces() {
    this.GhnService.getProvinces().subscribe({
      next: (res: any) => {
        console.log('res province', res);
        console.log('res data provinces', res.data);
        this.provinces = res.data;
        console.log('provinces', this.provinces);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onChangeProvince(e: any) {
    this.provinceSelected = e.target.value;
    console.log('provinceSelected', this.provinceSelected);
    this.getDistricts(this.provinceSelected);
  }

  getDistricts(provinceId: number) {
    if (this.provinceSelected === null) {
      return;
    }
    this.GhnService.getDistricts(provinceId).subscribe({
      next: (res: any) => {
        console.log('res district', res);
        console.log('res data district', res.data);
        this.districts = res.data;
        console.log('districts', this.districts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onChangeDistrict(e: any) {
    this.districtSelected = e.target.value;
    console.log('districtSelected', this.districtSelected);
    this.getWards(this.districtSelected);
  }

  getWards(districtId: number) {
    if (this.districtSelected === null) {
      return;
    }
    this.GhnService.getWards(districtId).subscribe({
      next: (res: any) => {
        console.log('res ward', res);
        this.wards = res.data;
        console.log('res data ward', res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onChangeWard(e: any) {
    this.wardCodeSelected = e.target.value;
    console.log('wardCodeSelected', this.wardCodeSelected);
    this.getService(this.districtSelected);
  }

  //getShipping
  getShipping(serviceId: number, districtId: number, wardCode: string) {
    this.GhnService.getShipping(serviceId, districtId, wardCode).subscribe({
      next: (res: any) => {
        console.log('res shipping', res);
        this.shipping = {
          totalShip: res.data.total,
          service_fee: res.data.service_fee,
        };
        this.shipPrice = res.data.total;

        this.total = this.totalPrice + this.shipPrice;

        console.log('shippingPrice', this.shipPrice);
        console.log('res data shipping', res.data);
      },
      error: (err) => {
        console.log('err shipping :', err);
      },
    });
  }

  getService(toDistrict: number) {
    this.GhnService.getService(toDistrict).subscribe({
      next: (res: any) => {
        console.log('res service', res);
        this.services = res.data;
        console.log('res data service', res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  serviceChange(e: any) {
    this.serviceSelected = e.target.value;
    console.log('serviceSelected', this.serviceSelected);
    this.getShipping(
      this.serviceSelected,
      this.districtSelected,
      this.wardCodeSelected
    );
  }

  serviceChanges(value: any) {
    this.serviceSelected = value;
    console.log('serviceSelected', this.serviceSelected);
    this.getShipping(
      this.serviceSelected,
      this.districtSelected,
      this.wardCodeSelected
    );
  }

  checkout() {
    const orders = {
      addressId: this.checkoutForm.value.addressId,
      note: this.checkoutForm.value.note,
      paymentMethod: this.checkoutForm.value.paymentMethod,
      shipPrice: this.shipPrice,
      total: this.total,
      shipMethod: this.checkoutForm.value.shippingMethod,
      discountCode: this.checkoutForm.value.discountCode,
      shipPriceDiscount: this.shipDiscount,
      shopPriceDiscount: this.saleDiscount,
      shopPrice: this.totalPrice,
      cart: this.cartRes,
    };

    this.orderService.checkout(orders).subscribe({
      next: (res: any) => {
        console.log('res checkout', res);

        this.orderId = res.data;

        if (this.checkoutForm.value.paymentMethod == 'VNPAY') {
          const pay = {
            amount: this.total,
            description: this.orderId,
            bankCode: 'NCB',
          };

          this.paymentwithVNPAY(pay);
        }

        if (
          this.checkoutForm.value.paymentMethod === 'COD' ||
          this.checkoutForm.value.paymentMethod === 'ATM'
        ) {
          this.router.navigate(['/checkout/success/' + this.orderId]);
        }
      },
      error: (err) => {
        console.log('err checkout :', err);
      },
    });
  }

  paymentwithVNPAY(pay: any) {
    console.log('pay', pay);
    this.orderService.vnpay(pay).subscribe({
      next: (res: any) => {
        console.log('res paymentVnPay', res);
        const VNPAY_URL = res.data;
        window.location.href = VNPAY_URL;
      },
      error: (err) => {
        console.log('err paymentVnPay :', err);
      },
    });
  }

  verifyDiscount() {
    const data = {
      shipPrice: this.shipPrice,
      discountCode: this.checkoutForm.value.discountCode,
    };

    this.userService.verifyDiscount(data).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.saleDiscount = res.saleDiscount;
        this.shipDiscount = res.shipDiscount;
        this.shopPrice = res.saleTotal;
        this.cartRes = res.cart;
        console.log('saleDiscount', this.saleDiscount);
        console.log('shipDiscount', this.shipDiscount);
        this.total =
          this.totalPrice +
          this.shipPrice -
          this.saleDiscount -
          this.shipDiscount;
        console.log('total', this.total);
        this.totalDiscount = this.saleDiscount + this.shipDiscount;
        console.log('totalDiscount', this.totalDiscount);
      },
      error: (err) => {
        console.log('err', err);
        this.errorMessage = err.error.message;
        this.toastr.error(err.error.message);
      },
    });
  }
}
