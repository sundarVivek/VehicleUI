import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userWebApi: any =environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<any>(`${this.userWebApi}/users`);
  }
  postUser(data:any){
    return this.http.post<any>(`${this.userWebApi}/users`,data);
  }
  getUserById(id:any){
    return this.http.get(`${this.userWebApi}/users`,id);
  }
  PutUser(userDetails:any) {
    return this.http.put<any>(`${this.userWebApi}/users/${userDetails.id}`, userDetails);
  }
}
