import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  id: any;
  serviceWebApiUrl: any = "https://localhost:7247/api/service";
  

  constructor(private http: HttpClient,
    private route: Router) { }

  postVehicleService(serviceDetails: any) {
    return this.http.post(`${this.serviceWebApiUrl}/register`, serviceDetails)
  }
  putVehicleService(id: any, serviceDetails: any) {
    return this.http.put(`${this.serviceWebApiUrl}/${id}`, serviceDetails)
  }
  getVehicleService() {
    return this.http.get(this.serviceWebApiUrl);
  }
  getVehicleServiceById(id: any) {
    return this.http.get<any>(`${this.serviceWebApiUrl}/${id}`);
  }
  deleteVehicleService(id: any) {
    return this.http.delete<void>(`${this.serviceWebApiUrl}/${id}`);
  }
  login(serviceDetails: any) {
    return this.http.post(`${this.serviceWebApiUrl}/authenticate`, serviceDetails);
  }
  signOut() {
    localStorage.clear();
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true
    }
    return false;
  }
  // canAccess() {
  //   if (!this.isLoggedIn()) {
  //     this.route.navigate(['/login']);
  //   }
  // }
  // canAuthenticate(id:any) {
  //   if (this.isLoggedIn()) {
  //     this.route.navigate(['/track-vehicle',id]);
  //   }
  // }
}

