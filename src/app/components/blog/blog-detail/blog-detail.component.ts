import { ProductSeller } from './../../../models/product-seller';
import { ProductService } from './../../../services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from './../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})

export class BlogDetailComponent implements OnInit {

  //request
  reqV2: any = {
    textSearch: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    sizeIds: [],
    colorIds: [],
    pageReq: {
      page: 0,
      pageSize: 9,
      sortField: '',
      sortDirection: '',
    },
  };

  req: any = {
    id: "",
    active: true,
    textSearch: "",
    topicId: null,
    pageReq: {
      page: 0,
      pageSize: 5,
      sortField: "",
      sortDirection: ""

    }
  };
  content: any
  trustedUrl: any;
  post: any
  id: any;
  blog :any;
  topic: any;
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;
  public productSeller!: ProductSeller[];
  tip: any;
  message = "hello"
  topicName = ""
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute, private service: BlogService, private sanitizer: DomSanitizer) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBlogPostDetail();
    this.getBlogListV2();
    this.getProductBestSeller()
  }
  getBlogPostDetail() {
    this.service.getBlogPostDetail(this.id).subscribe((data: any) => {
      console.log(data.data);
      this.post = data.data[0];
      this.content = data.data[0].content;
      this.req.topicId = data.data[0].topicId;

    })
  }
  getProductBestSeller() {
    this.productService.getProductBestSeller().subscribe({
      next: (res: any) => {
        this.productSeller = res.data;
        console.log('productSeller : ', this.productSeller);
      },
      error: (err) => {
        console.log('error : ', err);
      },
    });
  }
  getBlogListV2() {
    this.service.getBlogListV2(this.req).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.tip = data.data;
      }, error: (err) => {
        console.log(err);
      },
    })
  }

  getBlogListV3(req: any) {
    this.topicName = "BÀI VIẾT MỚI NHẤT";
    this.service.getBlogListV2(req).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.blog = data.data;

        this.page = data.page;
        this.pageSize = data.pageSize;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        console.log(this.page, this.totalPages, this.pageSize, this.totalElements);

      }, error: (err) => {
        console.log(err);
      },
    })
  }

  openTopic(item: any) {
    this.req.topicId = item.id;
    this.getBlogListV3(this.req);
    console.log("ID", item);
    this.topicName = item.name
  }


  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false
  };


  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
