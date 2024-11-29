import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddServiceService } from 'src/app/services/add-service.service';

@Component({
  selector: 'app-vehicle-service-details',
  templateUrl: './vehicle-service-details.component.html',
  styleUrls: ['./vehicle-service-details.component.scss']
})
export class VehicleServiceDetailsComponent {
  vehiclenumber:any;
  serviceDetails:any;
constructor(private _addService:AddServiceService,
  private route:ActivatedRoute
){}

ngOnInit():void{
this.route.queryParams.subscribe((params:any)=>
{
  this.vehiclenumber=params['vehicleNO'],
  this.fetchServiceDetails(this.vehiclenumber);
}

)
}

fetchServiceDetails(vehicleNo:number){
  this._addService.getService().subscribe(
(data:any)=>{
  this.serviceDetails=data.filter((x:any)=>x.vehicle_no==vehicleNo);
  console.log("Filetred data",this.serviceDetails);
});
}
}
