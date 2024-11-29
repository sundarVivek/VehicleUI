import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent {
  editServiceForm!: FormGroup;
  show: boolean = false;
  id: any;
  serviceArray: any;
  submitted: boolean = false;
  constructor(private fb: FormBuilder,
     private addService: AddService, 
     private router: ActivatedRoute,
     private route:Router,
     private toastr:ToastrService) {
  }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.editServiceForm = this.fb.group({
      customer_name: ['',Validators.compose([Validators.required,Validators.minLength(2)])],
      contact: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      vehicleNo: ['',Validators.compose([Validators.required,Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')])],
      model_name: ['',Validators.required],
      appointment_date: [new Date().toISOString().split('T')[0],Validators.required],
      service_type: ['',Validators.required],
      radiobutton: ['',Validators.required],
      status: [''],
      complaintbox1: [''],
      complaintbox2: [''],
      complaintbox3: [''],
      complaintbox4: [''],
    });
    this.addService.getVehicleServiceById(this.id).pipe(first()).subscribe(x =>
      { 
        this.editServiceForm.patchValue(x);
        console.log(x);
      });
    console.log(this.id);
  }
  get f() {
    return this.editServiceForm.controls;
  }
  changeRadio() {
    console.log(this.editServiceForm.get('radiobutton')?.value);
    if (this.editServiceForm.get('radiobutton')?.value == 'yes') {
      this.show = true;
      this.editServiceForm.get('complaintbox1')?.setValidators(Validators.required);
      this.editServiceForm.get('complaintbox2')?.setValidators(Validators.required);
      this.editServiceForm.get('complaintbox3')?.setValidators(Validators.required);
      this.editServiceForm.get('complaintbox4')?.setValidators(Validators.required);
    }
    else {
      this.show = false;
      this.editServiceForm.get('complaintbox1')?.clearValidators();
      this.editServiceForm.get('complaintbox1')?.updateValueAndValidity();
      this.editServiceForm.get('complaintbox2')?.clearValidators();
      this.editServiceForm.get('complaintbox2')?.updateValueAndValidity();
      this.editServiceForm.get('complaintbox3')?.clearValidators();
      this.editServiceForm.get('complaintbox3')?.updateValueAndValidity();
      this.editServiceForm.get('complaintbox4')?.clearValidators();
      this.editServiceForm.get('complaintbox4')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.editServiceForm.valid) {
    console.log(this.editServiceForm.value);
    this.addService.putVehicleService(this.id,this.editServiceForm.value).subscribe(res=>{
    this.toastr.success('Data updated successfully')
      this.route.navigate(['/view-service'])
    });
  }
}
}
