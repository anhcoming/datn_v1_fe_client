import { environment } from '../../environments/environment';
import { Location } from '../models/location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getListLocation(): Observable<Location[]> {
    return this.http.get<Location[]>("http://localhost:8080/api/v1/location/find-location");
  }

  getListLocations(){
    return this.http.get(AUTH_API + 'location');
  }
}
