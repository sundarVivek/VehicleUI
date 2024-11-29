import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AddServiceService } from 'src/app/services/add-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-add-service',
  templateUrl: './new-add-service.component.html',
  styleUrls: ['./new-add-service.component.scss']
})
export class NewAddServiceComponent {
  isSubmitted = false;
  userId: any;
  user: any;
  vehicleNumberForm!: FormGroup;
  addServiceForm!: FormGroup;
  customerData: any;
  serviceCost: number = 0;
  serviceCount: number = 0;
  service_status: string = '';
  showAddService: boolean = false;
  showCustomerData: boolean = false;
  showComplaintbox: boolean = false;
  addServiceButtonDisabled: boolean = true;
  confirmButtonDisabled: boolean = false;
  showNoRecordsFound: boolean = true;
  serviceTypes: string[] = ['Free Service', 'Paid Service'];
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private userService: UserService,
    private addVehicleService: AddServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.vehicleNumberForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('^[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}$')]]
    });
    this.addServiceForm = this.fb.group({
      vehicle_no: ['', [Validators.required, Validators.pattern('^[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}$')]],
      service_date: [this.todayDate, Validators.required],
      service_type: ['', Validators.required],
      iSComplaint: ['', Validators.required],
      complaintbox: [''],
      service_cost: [1000],
      No_of_services: [''],
      service_status:['']

    });
  }

  getUser() {
    this.isSubmitted = true;
    const { vehicleNo } = this.vehicleNumberForm.value;
    this.userService.getUser().subscribe((response: any[]) => {
      const user = response.find((res: any) => res.vehicle_no == vehicleNo);
      if (user) {
        this.customerData = user;
        this.showNoRecordsFound = false;
        this.showCustomerData = true;
      } else {
        alert("User not found");
      }
    });
    console.log("customerData", this.customerData);
  }

  getVehicleNo() {
    const { vehicleNo } = this.vehicleNumberForm.value;
    this.userService.getUser().subscribe((response: any[]) => {
      const user = response.find((res: any) => res.vehicle_no == vehicleNo);
      if (user) {
        this.addServiceForm.get('vehicle_no')?.setValue(user.vehicle_no);
      }
    })
  }

  confirm() {
    this.addServiceButtonDisabled = false;
    this.confirmButtonDisabled = true;
  }
  addService() {
    this.showCustomerData = false;
    this.showAddService = true;
    this.getVehicleNo();
  }

  changeRadio() {
    console.log(this.addServiceForm.get('iSComplaint')?.value);
    if (this.addServiceForm.get('iSComplaint')?.value == 'yes') {
      this.addServiceForm.get('iSComplaint')?.setValue('yes');
      this.showComplaintbox = true;
      this.addServiceForm.get('complaintbox')?.setValidators(Validators.required);

    }
    else {
      this.showComplaintbox = false;
      this.addServiceForm.get('iSComplaint')?.setValue('no');
      this.addServiceForm.get('complaintbox')?.clearValidators();
      this.addServiceForm.get('complaintbox')?.updateValueAndValidity();
    }
  }
  onSubmit() {
    this.getUser();
  }
  formatVehicleNumber() {
    const vehicleNumberControl = this.vehicleNumberForm.get('vehicleNo') as FormControl;
    let input = vehicleNumberControl.value.toUpperCase().replace(/\s/g, '');
    let formattedInput = '';
    if (input.length > 0) {
      formattedInput += input.slice(0, 2);
    }
    if (input.length >= 3) {
      formattedInput += ' ' + input.slice(2, 4);
    }
    if (input.length >= 5) {
      formattedInput += ' ' + input.slice(4, 6);
    }
    if (input.length >= 7) {
      formattedInput += ' ' + input.slice(6, 10);
    }
    vehicleNumberControl.setValue(formattedInput.trim(), { emitEvent: false });
  }
  changeIsActiveToTrue() {
    const vehicle_no: string = this.addServiceForm.get('vehicle_no')?.value;
    return this.userService.getUser().pipe(
      map((response: any[]) => response.find((res: any) => res.vehicle_no == vehicle_no)),
      filter(user => !!user),
      tap(user => {
        user.isActive = true;
        this.userService.PutUser(user).subscribe(
          (res: any) => console.log("Status changed successfully,", res)
        );
        this.userId = user.id;
        this.user = user;
      })
    ).toPromise();
  }
  
  finalAddService() {
    this.serviceCount++;
    this.service_status = "Ready for service";
    this.addServiceForm.get('No_of_services')?.setValue(this.serviceCount);
    this.addServiceForm.get('service_status')?.setValue(this.service_status);
    this.changeIsActiveToTrue().then(() => {
      const payload = {
        ...this.addServiceForm.value,
        userId: Number(this.userId),
        user: this.user
      };
      console.log("Form Data:", payload);
      this.addVehicleService.addService(payload).subscribe({
        next: response => {
          console.log('Service added successfully:', response);
          this.router.navigate(['/admin/view-service', this.userId]);
        },
        error: error => {
          console.error('Error adding service:', error);
        },
        complete: () => {
          console.log('Subscription complete');
        }
      });
    });
  }

}
