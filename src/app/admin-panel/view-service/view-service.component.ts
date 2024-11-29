import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AddService } from 'src/app/add.service';
import { AddServiceService } from 'src/app/services/add-service.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent {
  userId:any;
  serviceData: any;
  searchText: any;
  showErrorMessage: any;
  filteredData: any[] = [];
  filterDate: Date = new Date();
  filterValue: string | null = null;
  items = [];

  constructor(private addService: AddServiceService,
    private route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.userId=this.router.snapshot.paramMap.get('id');
      this.loadVehicleService();
      this.router.queryParams.subscribe(params => {
        this.filterValue = params['filterValue'];
        this.filterDataByValue();
    });
  }

  filterDataByValue(){
    if (this.filterValue) {
      this.filteredData = this.items.filter((item:any) => item.service_status === this.filterValue);
  } else {
      this.filteredData = this.items; 
  }
  }
  loadVehicleService() {
    this.addService.getService().subscribe((res: any) => {
      this.serviceData = res;
      this.filterData();
      console.log(this.serviceData);
    },
      (error: any) => {
        this.showErrorMessage = error;
      }
    );
  }

  editService(id: any) {
    this.route.navigate(['/edit-service', id]);
  }

  deleteService(id: any) {
    // this.addService.deleteVehicleService(id).subscribe((res: any) => {
    //   this.toastr.success('Deleted successfully');
    //   this.loadVehicleService();
    // })
  }

  details(vehicleNo: any) {
    this.route.navigate(['/admin/vehicle-service-details', this.userId],
      {queryParams:{vehicleNO:vehicleNo}}
    );
  }
  filterData() {
    this.filteredData = this.serviceData.filter((res:any) => {
      const itemDate = new Date(res.appointment_date);
      console.log("Date",itemDate);
      return itemDate.getTime() === this.filterDate.getTime();
    });
  }
}
