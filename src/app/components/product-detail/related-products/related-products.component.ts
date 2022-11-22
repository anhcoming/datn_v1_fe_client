import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductRelated } from '../../../models/product-related';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
})
export class RelatedProductsComponent implements OnInit {
  productRelated!: ProductRelated[];
  id: string;

  constructor(
    private product: ProductService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  slideConfig = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  ngOnInit() {
    this.getRelatedProduct();
  }

  getRelatedProduct() {
    this.product.getProductRelated(this.id).subscribe({
      next: (response: any) => {
        this.productRelated = response.data;
        console.log('productRelated: ', this.productRelated);
      },
      error: (err) => {
        console.log('err getRelatedProduct : ', err);
      },
    });
  }
}
