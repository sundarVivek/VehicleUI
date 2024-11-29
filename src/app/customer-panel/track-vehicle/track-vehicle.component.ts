import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddService } from 'src/app/add.service';
import { AddServiceService } from 'src/app/services/add-service.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-track-vehicle',
  templateUrl: './track-vehicle.component.html',
  styleUrls: ['./track-vehicle.component.scss'],
  animations: [
    trigger('blinkAnimation', [
      state('true', style({})),
      state('false', style({})),
      transition('false <=> true', animate('1s ease-in-out', keyframes([
        style({ visibility: 'hidden', offset: 0.5 }),
        style({ visibility: 'visible', offset: 1.0 })
      ]))),
    ],
    )],
})
export class TrackVehicleComponent {
  public isReadyForServiceBlinking: boolean = false;
  public isServiceInProgressBlinking: boolean = false;
  public isReadyForDeliveryBlinking: boolean = false;
  servicedDates: string[] = [];
  vehicleNOForHistory: any;
  filteredServicesByVehicleNo: any;
  readyForService: number = 0;
  id: any;
  status: any;
  vehicleNo:any;
  serviceDate:any;

  userDetails: any = {
    id:0,
    registered_certificate_name: "Sundareshwaran V",
    email:'',
    vehicle_no: " TN 45 CB 9764",
    model_name: 'R15 v4',
    contact_no: 6380505776,
    isActive: true,
    gender:'',
    vehicle_brand:'',
    vehicle_type:'',
    no_of_services:0,
  };

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private addService: AddServiceService,
    private user: UserService,
  ) { }

 ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);
     this.matTab1();
     this.matTab2();
  }
  intervalId: any;
  serviceStatus: any;

  getServiceStatusToBlink() {
    this.user.getUserById(this.id).subscribe(
      (res: any) => {
        this.serviceStatus = res[0];
        if (this.serviceStatus && this.serviceStatus.isActive !== undefined) {
          if (this.serviceStatus.isActive === true) {
            if (this.intervalId) {
              clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(() => {
              this.isReadyForServiceBlinking = !this.isReadyForServiceBlinking;
            }, 1000);
          } else {
            console.log('User is not active');
          }
        } else {
          console.warn('isActive is undefined or response is invalid');
        }
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
  matTab1(){
    this.getServiceStatusToBlink();
  }
  matTab2(){
    this.getUserDetails();
  }

  getUserDetails() {
    this.user.getUserById(this.id).subscribe(
      (res: any) => {
        console.log("responnnns",res)
        this.userDetails = {
          contact_no: res[0].contactNo,
          email: res[0].email,
          gender: res[0].gender,
          id: res[0].id,
          isActive: res[0].isActive,
          model_name:res[0].model_name,
          no_of_services: res[0].no_of_services,
          registered_certificate_name: res[0].registered_certificate_name,
          vehicle_no: res[0].vehicle_no,
          vehicle_brand:res[0].vehicle_brand ,
          vehicle_type:res[0].vehicle_type
  }
       this.vehicleNOForHistory = res[0].vehicle_no;
       this.getServicedDates();
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
  getServicedDates() {
    this.addService.getService().subscribe((response: any) => {
      this.filteredServicesByVehicleNo = response.filter((res: any) => {
        return res.vehicle_no === this.vehicleNOForHistory;
      });
      this.servicedDates = this.filteredServicesByVehicleNo.map((service: any) => service.service_date);
    });
  }
  downloadPDF(item:any){
    this.route.navigate(['/service-details-summary',this.id],
      {queryParams:{serviceDate:item,vehicleNo:this.vehicleNOForHistory,userId:this.id}});
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}







