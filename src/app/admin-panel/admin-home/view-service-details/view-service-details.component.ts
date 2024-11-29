import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-view-service-details',
  templateUrl: './view-service-details.component.html',
  styleUrls: ['./view-service-details.component.scss']
})
export class ViewServiceDetailsComponent {
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
  getId:any;
  updatedResult:any;
  constructor(private addService: AddService, private router: ActivatedRoute, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.statusForm = this.fb.group({
      status: ['Ready for service', Validators.required]
    })
    this.getId = this.router.snapshot.paramMap.get('id');
    this.addService.getVehicleServiceById(this.getId).subscribe(
      (result) => {
        this.statusData=result;
        this.serviceId = result.id;
        this.vehicleNo = result.vehicleNo;
        this.owner = result.customer_name;
        this.model = result.model_name;
        this.date = result.appointment_date;
        this.contact = result.contact;
        this.serviceType = result.service_type;
        console.log(result);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }
  changeStatus(){
    console.log(this.statusForm.value);
    this.addService.getVehicleServiceById(this.getId).subscribe(
      (result) => {
       result.status=this.statusForm.value.status;
       this.updatedResult=result;
       this.addService.putVehicleService(this.getId,this.updatedResult).subscribe((res:any)=>{
        alert('Updated successfully')
       });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
