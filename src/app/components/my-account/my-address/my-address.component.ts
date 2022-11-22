import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { GhnService } from 'src/app/services/ghn.service';
import { Province } from 'src/app/models/province';
import { District } from 'src/app/models/district';
import { Ward } from 'src/app/models/ward';
import { REGEX_CUSTOM } from 'src/app/models/constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
})
export class MyAddressComponent implements OnInit {
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  provinceSelected!: any;
  districtSelected!: any;
  wardCodeSelected!: string;

  @ViewChild('exampleModal') modal: any;

  public address: Address[] = [];

  provinceNameSelected!: string;
  districtNameSelected!: string;
  wardNameSelected!: string;

  addressForm = new FormGroup({
    id: new FormControl(''),
    nameOfRecipient: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_CUSTOM.PHONE_NUMBER),
    ]),
    exact: new FormControl('', [Validators.required]),
    provinceId: new FormControl('', [Validators.required]),
    provinceName: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    districtName: new FormControl('', [Validators.required]),
    wardCode: new FormControl('', [Validators.required]),
    wardName: new FormControl('', [Validators.required]),
  });

  constructor(
    private addressService: AddressService,
    private toastr: ToastrService,
    private GhnService: GhnService
  ) {}

  ngOnInit() {
    this.getListAddress();
    this.getProvinces();
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

  setDefaultAddress(id: string) {
    this.addressService.setDefaultAddress(id).subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        this.getListAddress();
      },
      error: (err) => {
        console.log('error setting default address : ', err);
      },
    });
  }

  deleteAddress(id: string) {
    this.addressService.deleteAddress(id).subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        this.toastr.success('Xóa địa chỉ thành công !');
        this.getListAddress();
      },
      error: (err) => {
        console.log('error deleting address : ', err);
      },
    });
  }

  get f() {
    return this.addressForm.controls;
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
    this.provinceNameSelected = e.target.options[e.target.selectedIndex].text;
    console.log('provinceNameSelected', this.provinceNameSelected);
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
    this.districtNameSelected = e.target.options[e.target.selectedIndex].text;
    console.log('districtNameSelected', this.districtNameSelected);
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
    this.wardNameSelected = e.target.options[e.target.selectedIndex].text;
    console.log('wardNameSelected : ', this.wardNameSelected);
  }

  saveAddress() {
    this.addressForm.value.provinceName = this.provinceNameSelected;
    this.addressForm.value.districtName = this.districtNameSelected;
    this.addressForm.value.wardName = this.wardNameSelected;

    this.addressService.createAddress(this.addressForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Thêm địa chỉ thành công !');
        this.getListAddress();
      },
      error: (err) => {
        console.log('error create address : ', err);
      },
    });

    this.addressForm.reset();

    this.hideModal();
  }

  editAddress(data: any) {
    this.addressForm.patchValue({
      id: data.id,
      nameOfRecipient: data.nameOfRecipient,
      phoneNumber: data.phoneNumber,
      exact: data.exact,
      provinceId: data.provinceId,
      provinceName: data.provinceName,
      districtId: data.districtId,
      districtName: data.districtName,
      wardCode: data.wardCode,
      wardName: data.wardName,
    });

    this.provinceSelected = data.provinceId;
    this.districtSelected = data.districtId;
    this.wardCodeSelected = data.wardCode;

    this.provinceNameSelected = data.provinceName;
    this.districtNameSelected = data.districtName;
    this.wardNameSelected = data.wardName;

    //call Api to get provinceName, districtName, wardName
    this.getDistricts(this.provinceSelected);
    this.getWards(this.districtSelected);

    console.log('Edit addressForm: ', this.addressForm.value);
    console.log('data edit: ', data);
  }

  updateAddress() {
    //pathValue addressForm to updateAddress when click editAddress
    this.addressForm.value.provinceName = this.provinceNameSelected;
    this.addressForm.value.districtName = this.districtNameSelected;
    this.addressForm.value.wardName = this.wardNameSelected;

    this.getDistricts(this.addressForm.value.provinceId);
    this.getWards(this.addressForm.value.districtId);

    console.log('addressForm Update: ', this.addressForm.value);

    this.addressService.updateAddress(this.addressForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Cập nhật địa chỉ thành công !');
        this.getListAddress();
      },
      error: (err) => {
        console.log('error update address : ', err);
      },
    });

    this.addressForm.reset();

    //hide exampleModal when update address success
    this.hideModal();
  }

  hideModal() {
    this.modal.nativeElement.click();
  }

  resetForm() {
    this.addressForm.reset();
  }

  saveOrUpdateAddress() {
    if (this.addressForm.value.id == '') {
      this.saveAddress();
    } else {
      this.updateAddress();
    }
  }
}
