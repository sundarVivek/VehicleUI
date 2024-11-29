import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AddService } from '../add.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  id: any;
  username: any;
  constructor(private route: Router,
    private router: ActivatedRoute,
    private addService: AddService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);
    if (localStorage.getItem('role') === 'admin') {
      this.username = 'admin';
    } else {
      this.addService.getVehicleServiceById(this.id).subscribe(
        (result) => {
          console.log(result);
          this.username = result.customer_name;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

  }

}
