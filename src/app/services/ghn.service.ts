import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/province';
import { environment } from '../../environments/environment';
import { District } from '../models/district';
import { Ward } from '../models/ward';

const GHN_API = environment.ghnApi;
const token_GHN = '2b548f2b-56c1-11ed-8a70-52fa25d1292f';
const shopId_GHN = '3399646';
const fromDistrictId = 1847;
const options = {
  headers: {
    'token': token_GHN
  }
}


@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<Province[]> { debugger
    return this.http.get<Province[]>(GHN_API + '/master-data/province', options);
  }

  getDistricts(provinceId:number): Observable<District[]> { debugger
    return this.http.get<District[]>(GHN_API + '/master-data/district?province_id='+provinceId, options);
  }

  getWards(districtId: number): Observable<Ward[]>{debugger
    return this.http.get<Ward[]>(GHN_API + '/master-data/ward?district_id='+districtId, options);
  }

  getService(toDistrict: number): Observable<any>{debugger
    const params = {
      shop_id : Number(shopId_GHN),
      from_district: 1847,
      to_district: Number(toDistrict),
    }

    return this.http.post<any>(GHN_API + '/v2/shipping-order/available-services', params, options);

  }

  getShipping(serviceId:number,toDistrict: number, toWardCode: string): Observable<any> {debugger
    const optionss = {
      headers: {
        token: token_GHN,
        shop_id: shopId_GHN,
      },
    };

    const params = {
      service_id:Number(serviceId),
      insurance_value:500000,
      coupon: null,
      from_district_id:1847,
      to_district_id:Number(toDistrict),
      to_ward_code:toWardCode,
      height:15,
      length:15,
      weight:1000,
      width:15
    };
    return this.http.post<any>(GHN_API + '/v2/shipping-order/fee',params,optionss);
  }

}
