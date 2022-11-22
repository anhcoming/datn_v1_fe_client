import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  show = false;
  blog: any
  blogListByTopic: any
  topic: any
  tip: any
  id: any;
  topicName = ""


  //page
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;

  //request
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

  constructor(private http: HttpClient, private service: BlogService) {
    this.getBlogListV2(this.req);
    this.getTopicList();
    this.getPostTips();

  }

  ngOnInit(): void {

  }

  // getBlogList() {
  //   this.topicName = "BÀI VIẾT MỚI NHẤT";
  //   this.service.getBlogList().subscribe((data: any) => {
  //     console.log(data.data);
  //     this.blog = data.data;
  //   })
  // }

  getBlogListV2(req: any) {
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
    this.getBlogListV2(this.req);
    console.log("ID", item);
    this.topicName = item.name
  }

  reload() {
    window.location.reload()
  }

  getTopicList() {
    this.service.getTopicList().subscribe((data: any) => {
      console.log(data.data);
      this.topic = data.data;
    })
  }

  ///mẹo hữu ích
  getPostTips() {
    this.service.getPostTips().subscribe((data: any) => {
      console.log(data.data);
      this.tip = data.data;
    })
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

  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    this.getBlogListV2(this.req);
  }

}



