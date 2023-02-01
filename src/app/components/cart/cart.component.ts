import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../../services/cart.service';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart!: Cart[];
  cartV2: any
  totalPrice!: string;
  quantity!: any;
  public address: Address[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCartV2();
    this.getListAddress();
   
  }

  getAllCart() {
    this.cartService.getListCart().subscribe({
      next: (response: any) => {
        console.log('res :', response);
        this.cart = response.data.carts;
        debugger
        this.cartV2 = response.data.carts
        this.totalPrice = response.data.totalPrice;
        console.log('cart : ', this.cart);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  getAllCartV2() {
    this.cartService.getListCart().subscribe({
      next: (response: any) => {
        console.log('res :', response);
        this.cart = response.data.carts;
        debugger
        this.cartV2 = response.data.carts
        this.totalPrice = response.data.totalPrice;
        console.log('cart : ', this.cart);
        let quantity = localStorage.getItem('QUANTITY')
        let productOptionId = localStorage.getItem('PRODUCTOPTIONID')
        for (let i = 0; i < this.cartV2.length; i++) {
          debugger
          console.log("cartv2", this.cartV2);
          console.log(Number(quantity), Number(this.cartV2[i].quantityAvailable))
          let totalCurrent =  Number(this.cartV2[i].quantity)
          if (this.cartV2[i].productOptionId == productOptionId) {
            console.log("Tổng", totalCurrent);
            if (totalCurrent > this.cartV2[i].quantityAvailable) {
              this.toastr.error(
                'Số lượng sản phẩm không được lớn hơn ' + this.cartV2[i].quantityAvailable
              );
              this.cart[i].quantity = this.cart[i].quantityAvailable
              this.cartService
                .updateCart(this.cartV2[i].productOptionId,  this.cart[i].quantityAvailable)
                .subscribe({
                  next: () => {
                    // this.getAllCart();
                  },
                });
            }
          }else{
            this.cart[i].quantity = this.cart[i].quantity 
              this.cartService
                .updateCart(this.cartV2[i].productOptionId, this.cart[i].quantity )
                .subscribe({
                  next: () => {
                    // this.getAllCart();
                  },
                });
          }
        }
        console.log(quantity, productOptionId)
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

  increment(cart: Cart) {
    this.cartService
      .updateCart(cart.productOptionId!, cart.quantity! + 1)
      .subscribe({
        next: () => {
          this.getAllCart();
        },error:()=>{
          this.toastr.error('Vượt quá số lượng hiện có')
        }
      });
  }

  decrement(cart: Cart): void {
    //if quantity = 1 then click decrement will delete item
    if (cart.quantity == 1) {
      this.deleteItem(cart.productOptionId);
    }

    this.cartService
      .updateCart(cart.productOptionId!, cart.quantity! - 1)
      .subscribe({
        next: () => {
          this.getAllCart();
          this.toastr.success('Update cart success !!!');
        },
      });
  }

  deleteItem(id: any) {
    this.cartService.deleteCart(id).subscribe({
      next: (response: any) => {
        console.log('res :', response);
        this.getAllCart();
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  changeQuantity(e: any, cart: Cart) {
    console.log('e : ', e);
    console.log('cart : ', cart);

    if (e.target.value > Number(cart.quantityAvailable)) {
      this.toastr.error(
        'Số lượng sản phẩm không được lớn hơn ' + cart.quantityAvailable
      );
      e.target.value = cart.quantity;
    }

    if (e.target.value < 1) {
      this.toastr.error('Số lượng phải lớn hơn 0');
      e.target.value = 1;
    }

    //check quantity
    this.cartService
      .updateCart(cart.productOptionId!, e.target.value)
      .subscribe({
        next: () => {
          this.getAllCart();
          this.toastr.success('Update cart success !!!');
        },
      });

    if (e.target.value == '') {
      this.cartService.updateCart(cart.productOptionId!, 1).subscribe({
        next: () => {
          this.getAllCart();
          this.toastr.success('Update cart success !!!');
        },
      });
    }
  }

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  //redirect to checkout page
  checkout() {  
    if (this.address.length == 0) {
      //Notify with Sweetalert2
      Swal.fire({
        title: 'Bạn chưa có địa chỉ nhận hàng',
        text: 'Vui lòng thêm địa chỉ nhận hàng',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/user/address']);
        }
      });
    } else {
      this.router.navigate(['/checkout']);
    }

  }
}
