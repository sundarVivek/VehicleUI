import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddService } from 'src/app/add.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  adminLogin!: FormGroup;
  errorMessage: any;
  submitted = false;
  adminId: any;
  loading: boolean = false;
  loginError: any;

  constructor(private route: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _auth: AuthService,
  private _shared:SharedService) { }
  ngOnInit() {
    this.adminLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.adminService.getAdmin().subscribe((res => { console.log("azure", res) }));
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.adminLogin.valid) {
      const user = this.adminLogin.value;
      this.adminService.login(user).subscribe(
        (res: any) => {
          this.adminId = res.userId;
          this._auth.storeToken(res.token);
          localStorage.setItem('role', 'admin');
          console.log(res);
          this.toastr.success('Login successful');
          this._shared.setAdmin(this.adminId);
          this.route.navigate(['/admin/admin-home', this.adminId])
        },
        (error: any) => {
          this.errorMessage = error.message;
          this.toastr.error(this.errorMessage);
          console.log(this.errorMessage);
        }
      )
    }
    // this.adminService.login(this.adminLogin.value).subscribe(
    //   (res: any) => {
    //     this.adminId=res.id;
    //     this.addService.storeToken(res.token);
    //     localStorage.setItem('role','admin');
    //     console.log(res);
    //     if (this.adminLogin.controls?.['username'].value==res.username&&
    //     this.adminLogin.controls?.['password'].value==res.password) {
    //       this.toastr.success('Login successful');
    //       this.route.navigate(['/admin-home',this.adminId])
    //     }
    //   },
    //   (error: any) => {
    //     // Handle error
    //     this.errorMessage = error.message;
    //     console.log(this.errorMessage);
    //   }
    // )
  }
  goToRegister() {
    this.route.navigate(['/admin/reg'])
  }
}


