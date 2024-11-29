import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private adminId: string | null = null;
  constructor() { }


  getRoleFromLocalStorage(){
    return localStorage.getItem('role');
  }

  setAdmin(id:any)
  {
    this.adminId = id;
  }

  getAdmin()
  {
    return this.adminId;
  }
}
