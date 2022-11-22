import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }


  getListColor(){
    return this.http.get(AUTH_API + 'color');
  }

}
