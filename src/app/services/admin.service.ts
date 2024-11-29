import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // adminWebApi: any = "https://localhost:7247/api/Admin";

  adminWebApi: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAdmin() {
    return this.http.get<any>(`${this.adminWebApi}/admins`);
  }
  
  getAdminById(id: any) {
    return this.http.get<any>(`${this.adminWebApi}/admins/${id}`);
  }

  postAdmin(admin: any) {
    return this.http.post<any>(`${this.adminWebApi}/admins`, admin);
  }

  login(admin: any) {
    return this.http.post(`${this.adminWebApi}/auth/login`, admin);
  }

  sendOTP(email: any) {
    const body = { email: email };
    return this.http.post('https://localhost:7132/api/Registration/send-otp', body, { responseType: 'text' });
  }

  validateOTP(email: any, otp: any) {
    const body = { email: email,otp:otp };
    return this.http.post<any>(`${this.adminWebApi}/Registration/validate-otp`,body,{ responseType: 'text' as 'json' })
  }

}
