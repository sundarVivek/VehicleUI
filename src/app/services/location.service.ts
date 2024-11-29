import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // private apiKey: string = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API key
  // private apiUrl: string = 'https://api.opencagedata.com/geocode/v1/json?q=10.8272213+78.6682285&key=YOUR_ACTUAL_OPENCAGE_API_KEY&language=en';

  // constructor(private http: HttpClient) {}

  // getCurrentLocation(): Promise<{ latitude: number, longitude: number }> {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         resolve({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude
  //         });
  //       }, (error) => {
  //         reject(error);
  //       });
  //     } else {
  //       reject(new Error('Geolocation is not supported by this browser.'));
  //     }
  //   });
  // }

  // getCityStateCountry(latitude: number, longitude: number): Observable<any> {
  //   const url = `${this.apiUrl}?q=${latitude}+${longitude}&key=${this.apiKey}&language=en`;
  //   return this.http.get(url).pipe(
  //     map((response: any) => {
  //       if (response && response.results && response.results.length > 0) {
  //         const locationDetails = response.results[0].components;
  //         return {
  //           city: locationDetails.city || locationDetails.town || locationDetails.village,
  //           state: locationDetails.state,
  //           country: locationDetails.country
  //         };
  //       } else {
  //         throw new Error('Location details not found.');
  //       }
  //     })
  //   );
  // }

}
