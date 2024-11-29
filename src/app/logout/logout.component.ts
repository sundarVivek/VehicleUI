import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddService } from '../add.service';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  isOpen: boolean = false;
  modalComponent: any;
  username: string = '';
  id: any;
  role:any;
  constructor(private router: Router,
    private addservice: AddService, 
    private _userService: UserService,
    private route: ActivatedRoute,
  private _shared:SharedService) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRole();
  }
  yes() {
    this.addservice.signOut();
    this.router.navigate(['/select-user'])
  }

  getRole(){
    this.role=this._shared.getRoleFromLocalStorage();
    if(this.role==='admin'){
      this.username='ADMIN';
    }else{
      this.getUserID();
    }
  }

  getUserID() {
    this._userService.getUserById(this.id).subscribe(
      (data: any) => {
        this.username = data[0].registered_certificate_name.charAt(0).toUpperCase();
          console.log("Userbae", this.username);
      }
    );
  }
  openModal(): void {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'block';
      modal.style.marginTop = '200px';
      modal.style.marginLeft = '450px';
    }

  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'none';
    }

  }
}
