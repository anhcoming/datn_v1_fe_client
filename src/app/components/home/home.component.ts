import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../services/product.service';
import { ProductSeller } from '../../models/product-seller';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productSeller!: ProductSeller[];
  blog: any;

  constructor(
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private service: BlogService,
  ) {}

  ngOnInit(): void {
    this.getProductBestSeller();
    this.getBlogList();
    this.getAllProduct();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  slides = [
    { id: 1, img: '../../assets/img/slider/single-slide-1.png' },
    { id: 2, img: '../../assets/img/slider/single-slide-hm1-2.png' },
  ];

  saveProduct(e:any){
    // debugger
    localStorage.setItem("PRICE",JSON.stringify(e.price))
console.log(e)
  }
  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 10000,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  getBlogList() {
    this.service.getBlogList().subscribe((data: any) => {
      console.log(data.data);
      this.blog = data.data;
    });
  }
  getProductBestSeller() {
    this.productService.getProductBestSeller().subscribe({
      next: (res: any) => {
        this.productSeller = res.data;
        // console.log('productSeller : ', this.productSeller);
      },
      error: (err) => {
        console.log('error : ', err);
      },
    });
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (res: any) => {
        this.productSeller = res.data;
        console.log('productSeller : ', this.productSeller);
      },
      error: (err) => {
        console.log('error : ', err);
      },
    });
  }
}
