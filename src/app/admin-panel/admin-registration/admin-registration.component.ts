import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent {
  adminRegister!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router) { }
  ngOnInit() {
    this.adminRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      confirm_password: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['admin']
    },
      { validator: this.passwordMatchValidator }
    );
  }
  get f() {
    return this.adminRegister.controls;
  }
  // Function to check if passwords match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');
    // Check if both passwords are present and match
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { 'passwordMismatch': true } : null;
  }

  onSubmit() {
    if (this.adminRegister.valid) {
      this.adminService.postAdmin(this.adminRegister.value).subscribe(
        (result: any) => {
          console.log(result);
          alert('registration successful');
          this.route.navigate(['/admin-login']);
        }
      ),
        (error: any) => {
          console.error(error);
        };
    }
  }
}
