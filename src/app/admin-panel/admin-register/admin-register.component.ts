import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {
  getOTPForm!: FormGroup;
  validateOTPForm!:FormGroup;
  passwordForm!:FormGroup;

  errorMessage: any;
  submitted = false;
  adminId: any;
  loading: boolean = false;
  loginError: any;
  Adminemail:any;
  showPasswordForm:boolean=false;
  showOTPForm:boolean=true;

  constructor(private route: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _auth: AuthService,) { }

  ngOnInit() {
    this.getOTPForm = this.fb.group({
      company_email: ['', Validators.email],
    });
    this.validateOTPForm = this.fb.group({
      otp: ['', Validators.required],
    });
    this.passwordForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  getOTP() {
    this.Adminemail = this.getOTPForm.get('company_email')?.value;
    if (this.getOTPForm.valid && this.Adminemail) {
      this.adminService.sendOTP(this.Adminemail).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('OTP sent to your email');
        },
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Failed to send OTP.');
        }
  )}
}
  
validateOTP() {
  const otp = this.validateOTPForm.get('otp')?.value.toString() ;
  if (this.Adminemail && otp) {
    this.adminService.validateOTP(this.Adminemail, otp).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success('Validation successful');
        this.showOTPForm=false;
        this.showPasswordForm=true;
      },
      (error: any) => {
        console.error('Validation failed:', error);

        if (error.status === 400 && error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              console.error(`${key}: ${error.error.errors[key]}`);
              this.toastr.error(`${key}: ${error.error.errors[key]}`);
            }
          }
        } else {
          this.toastr.error('Validation failed. Please try again.');
        }
      }
    );
  } else {
    this.toastr.warning('Please enter both email and OTP.');
  }
}
addAdmin() {
  // Extract form values
  const adminDetails = {
    company_email: this.Adminemail,
    username: this.passwordForm.get('username')?.value,
    password: this.passwordForm.get('password')?.value,
    confirm_password: this.passwordForm.get('confirm_password')?.value,
  };

  // Simple validation before making the request
  if (this.passwordForm.valid && adminDetails.password === adminDetails.confirm_password) {
    this.adminService.postAdmin(adminDetails).subscribe(
      (res: any) => {
        console.log('Admin added', res);
        this.toastr.success('Admin added successfully');
        this.route.navigate(['/admin/admin-login']);
      },
      (error: any) => {
        console.error('Error adding admin:', error);
        this.toastr.error('Failed to add admin. Please try again.');
      }
    );
  } else {
    this.toastr.warning('Please ensure all fields are filled correctly and passwords match.');
  }
}

}