import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
