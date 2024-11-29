import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AddService } from 'src/app/add.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;
  userData: any;
  submitted = false;
  errorMessage = null;
  customerId: any;
  loading: boolean = false;
  params:any;

  constructor(private fb: FormBuilder,
    private addService: AddService,
    private route: Router,
    private toastr: ToastrService,
    private userService: UserService) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      customer_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      // VehilceNo: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')])],
      VehilceNo: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log("vahga", this.loginForm.value);
    if (this.loginForm.valid) {
      const { customer_name, VehilceNo } = this.loginForm.value;
      this.userService.getUser().subscribe(
        (response: any[]) => {
          const user = response.find((res: any) => res.registered_certificate_name == customer_name && res.vehicle_no == VehilceNo);
          if (user) {
            this.customerId = user.id;
            this.toastr.success('Login successful');
            this.route.navigate(['/track-vehicle', this.customerId]);
          } else {
            this.toastr.error('Invalid username or pssword');
          }
          // this.customerId=res.id;
          // this.addService.storeToken(res.token);
          // localStorage.setItem('role','customer')
          // console.log(res);
          // if (this.loginForm.controls?.['VehilceNo'].value==res.vehilceNo&&this.loginForm.controls?.['customer_name'].value==res.customer_name) {
          //   this.toastr.success('Login successful');
          //   this.route.navigate(['/track-vehicle',this.customerId])
          // }
        },
        (error: any) => {
          // Handle error
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        }
      )
    } else {
      this.toastr.error('Login failed');
    }
  }

}