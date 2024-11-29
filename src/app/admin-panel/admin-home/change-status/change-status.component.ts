import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, concatMap, from } from 'rxjs';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent {
  @Output() ChangeStatusData = new EventEmitter<any>();
  statusForm!: FormGroup;
  statusData: any;
  id: any;
  serviceId: any;
  vehicleNo: any;
  owner: any;
  model: any;
  date: any;
  contact: any;
  serviceType: any;
  getId: any;
  updatedResult: any;
  statusChangeData:any;
  constructor(private addService: AddService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.statusForm = this.fb.group({
      status: ['Ready for service', Validators.required],
      status_change_date: [new Date().toISOString().split('T')[0]],
    })
    this.getId = this.router.snapshot.paramMap.get('id');
    this.addService.getVehicleServiceById(this.getId).subscribe(
      (result) => {
        this.statusData = result;
        this.serviceId = result.id;
        this.vehicleNo = result.vehicleNo;
        this.owner = result.customer_name;
        this.model = result.model_name;
        this.date = result.appointment_date;
        this.contact = result.contact;
        this.serviceType = result.service_type;
        console.log(result);
        this.ChangeStatusData.emit(this.statusData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }
  changeStatus() {
    console.log(this.statusForm.value);
    this.addService.getVehicleServiceById(this.getId).subscribe(
      (result) => {
        result.status = this.statusForm.value.status;
        result.status_change_date = this.statusForm.value.status_change_date;
        this.updatedResult = result;
        console.log(this.updatedResult);
        this.addService.putVehicleService(this.getId, this.updatedResult).subscribe((res: any) => {
          this.toastr.success('Status has changed successfully');
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
