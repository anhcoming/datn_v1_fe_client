import { SizeService } from './../../../services/size.service';
import { map, Observable, startWith } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  _type: any;
  constructor(private size: SizeService, private toastr: ToastrService) {

  }
  getSizeCate = "38";
  nameControl = new FormControl('');
  products: any
  image = [];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.getCategoryProduct();
  }

  nameProduct = "Vui lòng chọn loại sản phẩm..."
  check = new FormControl();


  height: any;
  updateHeight($event: any) {
    this.height = $event.value;
    console.log(this.height);
    if (this.height && this.weight && !this.id) {
      this.toastr.error("Vui lòng chọn thể loại giày")
      return
    }
    this.getSize();
  }

  weight: any;
  updateWeight($event: any) {
    this.weight = $event.value;
    console.log(this.weight);
    if (this.height && this.weight && !this.id) {
      this.toastr.error("Vui lòng chọn thể loại giày")
      return
    }
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
    // this.size.getCategoryProduct().subscribe((data: any) => {
    //   this.products = data.data;
    //   // console.log(a);
    // });
    this.products = [
      { id:1,name: "Giày Nam",image:"https://i.pinimg.com/474x/80/cd/af/80cdafd18b90e590a13d86580e1304ed.jpg" },
      { id:2,name: "Giày Nữ",image:"https://m.media-amazon.com/images/I/61tEIpDhdOL._AC_SY695_.jpg" },
      { id:3,name: "Giày Unisex",image:"https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/e5508157-d8af-4b69-8de3-d776ff6ed4ac/running-shoe-finder.jpg" },
  ]
  }


  getSize() {
    let h = this.height
    let w = this.weight
    let typeH: any;
    let typeW: any;

    switch (h) {
      case h = 21:
        typeH = 32;
        break
      case h = 21.5:
        typeH = 33;
        break
      case h = 22:
        typeH = 34;
        break
      case h = 22.5:
        typeH = 35;
        break
      case h = 23:
        typeH = 36;
        break
      case h = 23.5:
        typeH = 37;
        break
      case h = 24:
        typeH = 38;
        break
      case h = 24.5:
        typeH = 39;
        break
      case h = 25:
        typeH = 40;
        break
      case h = 25.5:
        typeH = 41;
        break
      case h = 26:
        typeH = 42;
        break
      case h = 26.5:
        typeH = 43;
        break
      case h = 27:
        typeH = 44;
        break

    }

    // =============

    switch (w) {
      case 7.5 <= w && w <= 8:
        typeW = 32;
        break
      case 8:
        typeW = 33;
        break
      case 8 <= w && w <= 8.5:
        typeW = 34;
        break
      case w = 8.5:
        typeW = 35;
        break
      case 8.5 <= w && w <= 9:
        typeW = 36;
        break
      case w = 9:
        typeW = 37;
        break
      case 9 <= w && w <= 9.5:
        typeW = 38;
        break
      case w = 9.5:
        typeW = 39;
        break
      case 9.5 <= w && w <= 10:
        typeW = 40;
        break
      case w = 10: 1
        typeW = 41;
        break
      case 10 <= w && w <= 10.5:
        typeW = 42;
        break
      case w = 10.5:
        typeW = 43;
        break
      case 10.5 <= w && w <= 11:
        typeW = 44;
        break

    }

    // ==================
    let check = typeH - typeW
    if (check == 0) {
      this._type = typeH
    } else if (check > 0) {
      this._type = typeH
    } else if (check < 0) {
      this._type = typeW
    }
  }


}
