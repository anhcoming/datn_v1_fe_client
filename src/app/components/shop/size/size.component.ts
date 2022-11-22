import { SizeService } from './../../../services/size.service';
import { map, Observable, startWith } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  image: string;
}
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  constructor(private size: SizeService,) {

  }
  getSizeCate = "S";
  nameControl = new FormControl('');
  products: Product[] = [];
  image = [];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.getCategoryProduct();
  }

  nameProduct = "Vui lòng chọn loại sản phẩm..."
  check = new FormControl();


  height: string = "149";
  updateHeight($event: any) {
    this.height = $event.value;
    console.log(this.height);
    this.getSize();
  }

  weight: string = "41";
  updateWeight($event: any) {
    this.weight = $event.value;
    console.log(this.weight);
    this.getSize();

  }

  id = "";
  uploadImage(item: any) {
    console.log(item);
    this.image = item.image;
    this.nameProduct = item.name;
    this.id = item.id;
    // console.log(this.id);
  }
  getCategoryProduct() {
    this.size.getCategoryProduct().subscribe((data: any) => {
      this.products = data.data;
      // console.log(a);
    });
  }


  getSize() {
    this.size.getSize(this.id, this.height, this.weight).subscribe((data: any) => {
      this.getSizeCate = data.data.name;
      console.log("Get Size: " + data.data);
      console.log("Hello");
    });
  }
}
