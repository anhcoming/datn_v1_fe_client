
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from '../../services/color.service';
import { SizeService } from 'src/app/services/size.service';
import { Size } from 'src/app/models/size';
import { Color } from 'src/app/models/color';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  slug: string = '';
  public listProduct!: Product[];
  public colors: Color[] = [];
  public sizes: Size[] = [];
  public colorIds: string[] = [];
  public sizeIds: string[] = [];

  public minPrice!: number;
  public maxPrice!: number;
  isFavourite = false;
  public type: any[] = [
    {
      typeId: 'MALE',
      typeName: 'Nam',
    },
    {
      typeId: 'FEMALE',
      typeName: 'Nữ',
    },
    {
      typeId: 'UNISEX',
      typeName: 'Unisex',
    },
  ];

  public typeValue = false;

  //page
  page: number = 0;
  pageSize!: number;
  totalPages: number = 0;
  totalElements!: number;

  //request
  req: any = {
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

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sizeService: SizeService,
    private colorService: ColorService,
    private favourite: FavouriteService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.slug = params['slug'];
      this.req.category = this.slug;
      this.getListProduct(this.req);
    });
    this.getListSize();
    this.getListColor();
  }

  getListSize() {
    this.sizeService.getListSize().subscribe({
      next: (response: any) => {
        console.log('size', response);
        this.sizes = response;
      },
    });
  }

  getListColor() {
    this.colorService.getListColor().subscribe({
      next: (response: any) => {
        console.log('color', response);
        this.colors = response.data;
      },
    });
  }
  saveProduct(e:any){
    // debugger
    localStorage.setItem("PRICE",JSON.stringify({min:e.minPrice,max:e.maxPrice}))
console.log(e)
  }

  getListProduct(req: any) {
    this.productService.getListProduct(req).subscribe({
      next: (response: any) => {
        this.listProduct = response.data;

        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  colorsCheckBox(e: any, colorId: string) {
    if (e.target.checked && !this.colorIds.includes(colorId)) {
      this.colorIds.push(colorId);
    } else {
      this.colorIds.splice(this.colorIds.indexOf(colorId), 1);
    }
    this.req.colorIds = this.colorIds;
    this.getListProduct(this.req);
  }

  typeCheckBox(e: any, typeId: string) {
    console.log(e, typeId);

    //if checkbox is checked add value to req.type
    if (e.target.checked) {
      this.req.type = typeId;
      this.typeValue = true;
    } else {
      this.req.type = '';
    }

    this.getListProduct(this.req);
  }

  sizesCheckBox(e: any, sizeId: string) {
    if (e.target.checked && !this.sizeIds.includes(sizeId)) {
      this.sizeIds.push(sizeId);
    } else {
      this.sizeIds.splice(this.sizeIds.indexOf(sizeId), 1);
    }
    this.req.sizeIds = this.sizeIds;
    this.getListProduct(this.req);
  }

  sortSelect(e: any) {
    const value = e.target.value;
    const arr = value.split(',');
    this.req.pageReq.sortField = arr[0];
    this.req.pageReq.sortDirection = arr[1];

    console.log('req : ', this.req);
    this.getListProduct(this.req);
  }

  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    this.getListProduct(this.req);
  }

  //search text input change
  searchTextChange(e: any) {
    this.req.textSearch = e.target.value;
    this.req.pageReq.page = 0;
    console.log('search change : ', this.req);
    this.getListProduct(this.req);
  }

  //filter price with priceMin and priceMax
  priceFilter() {
    if (this.minPrice >= this.maxPrice) {
      alert('min price must be less than max price');
      return;
    }

    this.req.minPrice = this.minPrice;
    this.req.maxPrice = this.maxPrice;
    this.req.pageReq.page = 0;
    console.log('req price filter : ', this.req);
    this.getListProduct(this.req);
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

  addToFavourite(id: any) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    this.favourite.createFavourite(id).subscribe({
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
}
