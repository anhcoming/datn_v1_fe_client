import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../services/product.service';
import { ProductDetail } from '../../models/product-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { Productoption } from 'src/app/models/productoption';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProductOptionIdRes } from '../../models/productOptionIdRes';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductImage } from 'src/app/models/productImage';
import { ProductRelated } from '../../models/product-related';
import { FavouriteService } from '../../services/favourite.service';
import { Favourite } from 'src/app/models/favourite';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public productDetail!: ProductDetail;
  id!: string;
  public reviews!: Review[];
  public productOptions!: Productoption[];
  sizes: any;
  colors: any;
  quantity: any = 1;
  sizeSelected: string = '';
  colorSelected: string = '';
  productOptionId: string = '';
  priceOption!: {
    minPrice: any,
    maxPrice: any
  };
  productOptionRes!: ProductOptionIdRes;
  description: string[] = [];
  sizeColorSelected!: boolean;
  quantityProduct!: number;
  priceProduct!: string;
  haft1: any
  haft2: any
  haft3: any
  haft4: any
  haft5: any
  checked1 = ''
  checked2 = ''
  checked3 = ''
  checked4 = ''
  checked5 = ''
  isFavourite = false;

  listFavourite: Favourite[] = [];

  public imageProduct!: ProductImage[];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  //page
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;
  avg: any
  req: any = {
    pageReq: {
      page: 0,
      pageSize: 5,
      sortField: '',
      sortDirection: '',
    },
  };

  constructor(
    private product: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cart: CartService,
    private auth: AuthService,
    private favourite: FavouriteService,
    private toastr: ToastrService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getProductDetail();
    this.getListSize();
    this.getListReviews();
    // this.getRelatedProduct();
  }

  getProductDetail() {
    this.product.getProductDetails(this.id).subscribe({
      next: (response: any) => {
        console.log('data : ', response.data);
        this.productDetail = response.data;
        this.description = response.data.description.split('.');
        this.productOptions = response.data.productOptions;
        this.avg = Number(this.productDetail.avgRating).toFixed(1)
        let haft = '-half-o'
        let checked = 'checked'
        if (this.avg < 1) {
          this.haft1 = haft
        }
        else if (this.avg == 1) {
          this.checked1 = checked
        } else if (this.avg > 1 && this.avg <= 1.5 ||this.avg > 1.5 && this.avg < 2) {
          this.checked1 = this.checked2 = checked
          this.haft2 = haft
        }
        else if (this.avg == 2) {
          this.checked1 =  this.checked2 = checked
        }  else if (this.avg == 3) {
          this.checked1 =  this.checked2 =  this.checked3 = checked
        }  else if (this.avg == 4) {
          this.checked1 =  this.checked2 =this.checked3 =  this.checked4 = checked
        }  else if (this.avg == 5) {
          this.checked1 =  this.checked2 =this.checked3 =  this.checked4 =this.checked5= checked
        } else if (this.avg > 2 && this.avg <= 2.5 || this.avg > 2.5 && this.avg <= 3) {
          this.checked1 = this.checked2= this.checked3 = checked
          this.haft3= haft
        } else if (this.avg > 3 && this.avg <= 3.5 || this.avg > 3.5 && this.avg < 4) {
          this.checked1 = this.checked2= this.checked3 = this.checked4 = checked
          this.haft4= haft
        } else if (this.avg > 4 && this.avg <= 4.5 || this.avg > 4.5 && this.avg <= 5) {
          this.checked1 =  this.checked2 =this.checked3 =  this.checked4 =this.checked5 = checked
          this.haft5 = haft
        }


        console.log('product-detail:', this.productDetail);
        console.log('productOptions:', this.productOptions);
        // this.priceOption = response.data.productOptions[0].price;
        let data = JSON.parse(localStorage.getItem("PRICE") || "")
        //  debugger
        if (data.min) {
          this.priceOption = data.min == data.max ? data.min : data.min + "₫ - " + data.max
        } else {
          this.priceOption = data
        }

        console.log("MINMAX", data);

        this.imageProduct = response.data.productOptions.map((item: any) => {
          return {
            id: item.id,
            url: item.image,
          };
        });
        console.log('imageProduct:', this.imageProduct);
      },
      error: (err) => {
        console.log('err : ', err);
      },
    });
  }

  getListSize() {
    this.cart.getListSizeByProductId(this.id).subscribe({
      next: (response: any) => {
        this.sizes = response.data;
      },
    });
  }

  addToCart() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    if (this.sizeSelected == '' && this.colorSelected == '') {
      this.toastr.error('Vui lòng chọn kích cỡ và màu sắc');
      return;
    }

    if (this.sizeSelected == '') {
      this.toastr.error('Vui lòng chọn kích cỡ');
      return;
    }
    if (this.colorSelected == '') {
      this.toastr.error('Vui lòng chọn màu sắc');
      return;
    }

    this.cart
      .findProductOptionId(this.colorSelected, this.sizeSelected, this.id)
      .subscribe({
        next: (response: any) => {
          console.log('findProductOptionRes: ', response);
          this.productOptionRes = response.data;
          this.quantityProduct = response.data.quantity;
          localStorage.setItem('QUANTITY', this.quantity.toString())
          localStorage.setItem('PRODUCTOPTIONID', this.productOptionRes.productOptionId.toString())
          console.log('productOptionRes: ', this.productOptionRes);
          this.cart
            .addToCart(this.productOptionRes.productOptionId, this.quantity)
            .subscribe({
              next: (response) => {
                if (
                  this.quantityProduct < this.quantity ||
                  this.quantityProduct == 0
                ) {
                  this.toastr.error('Số lượng sản phẩm không đủ');
                  return;
                }
                console.log('response: ', response);
                // this.toastr.success('Sản phẩm đã được thêm vào giỏ hàng !!');
                this.router.navigate(['/cart']);
              },
              error: (err) => {
                console.log('err add to cart : ', err);
                this.toastr.error(err.error.message)
              },
            });
        },
        error: (err) => {
          console.log('err findProductOption : ', err);
        },
      });
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity <= 1) {
      return;
    }

    this.quantity--;
  }

  changeSize(e: any) {
    this.sizeSelected = e.target.value;
    this.cart.getListColorBySize(this.sizeSelected, this.id).subscribe({
      next: (response: any) => {
        console.log('response colors: ', response);
        this.colors = response.data;
      },
      error: (err) => {
        console.log('err : ', err);
      },
    });
  }

  changeColor(e: any) {
    this.colorSelected = e.target.value;
    console.log('colorSelected: ', this.colorSelected);

    this.sizeColorSelected = true;

    this.cart
      .findProductOptionId(this.colorSelected, this.sizeSelected, this.id)
      .subscribe({
        next: (response: any) => {
          console.log('findProductOptionRes: ', response);
          this.quantityProduct = response.data.quantity;
          this.priceProduct = response.data.price;
          this.priceOption = response.data.price
          console.log('priceProduct: ', this.priceProduct);
          console.log('quantityProduct: ', this.quantityProduct);
        },
        error: (err) => {
          console.log('err findProductOption : ', err);
        },
      });
  }

  addToFavourite() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    this.favourite.createFavourite(this.id).subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        this.isFavourite = response.data;
      },
      error: (err) => {
        console.log('err : ', err);
      },
    });
  }

  getListFavourite() {
    this.favourite.getListFavourite().subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        this.listFavourite = response.data;
        this.checkFavourite();
      },
      error: (err) => {
        console.log('err : ', err);
      },
    });
  }

  changeQuantity(e: any) {
    this.quantity = e.target.value;

    if (this.quantity == '' || this.quantity < 1) {
      this.quantity = 1;
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

  //check productId is favourite set isFavourite = true else set isFavourite = false
  checkFavourite() {
    this.listFavourite.forEach((element) => {
      if (element.productId == this.id) {
        this.isFavourite = true;
      }
    });
  }

  getListReviews() {
    this.req.productId = this.id;

    this.ratingService.search(this.req).subscribe({
      next: (response: any) => {
        console.log('this req listRviews: ', this.req);
        console.log('response: ', response);
        this.reviews = response.data;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        console.log('listReviews: ', this.reviews);
      },
    });
  }

  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    console.log('req page change', this.req);
    this.getListReviews();
  }

  //filter review
  filterReview(e: any) {
    if (e.target.value == '') {
      this.ratingService.search(this.req).subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          this.reviews = response.data;
        },
        error: (err) => {
          console.log('err : ', err);
        },
      });
    } else {
      this.req.rate = Number(e.target.value);
      this.req.productId = this.id;
      this.ratingService.search(this.req).subscribe({
        next: (response: any) => {
          console.log('this.req', this.req);
          this.reviews = response.data;
          console.log('response: ', response);
        },
      });
    }
  }
}
