import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  serviceWebApiUrl: any = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getService() {
    return this.http.get<any>(`${this.serviceWebApiUrl}/addServices`)
  }
  getServiceById(id:any) {
    return this.http.get<any>(`${this.serviceWebApiUrl}/addServices`,id);
  }

  getServiceByVehicleNo(vehicleNo:any) {
    return this.http.get<any>(`${this.serviceWebApiUrl}/addServices`,vehicleNo);
  }

  addService(serviceDetails: any) {
    return this.http.post<any>(`${this.serviceWebApiUrl}/addServices`, serviceDetails)
      .pipe(
        tap((response: any) => {
          console.log('Response:', response); // Log response for debugging
          alert("Service added successfully");
        }),
        catchError(error => {
          console.error('Error:', error); // Log errors if any
          return throwError(error);
        })
      );
  }
  putAddService(serviceDetails: any) {
    return this.http.put<any>(`${this.serviceWebApiUrl}/addServices/${serviceDetails.id}`, serviceDetails);
  }
}
