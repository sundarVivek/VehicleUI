import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { AddService } from 'src/app/add.service';
import { AddServiceService } from 'src/app/services/add-service.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-get-service',
  templateUrl: './get-service.component.html',
  styleUrls: ['./get-service.component.scss'],
})
export class GetServiceComponent {
  getServiceForm!: FormGroup;
  fetchActiveService: any;
  filteredActiveService: any;
  id: any;
  user: any;
  data: any;
  serviceId: any;
  vehicleNo: any;
  owner: any;
  model: any;
  date: any;
  contact: any;
  serviceType: any;
  getId: any;
  updatedResult: any;
  showService:boolean=false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private addService: AddServiceService,
    private customerService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getServiceForm = this.fb.group({
      vehicleNo: ['', Validators.required],
      customer_name: ['', Validators.required],
    }
    );
    this.getServiceForm.controls?.['customer_name'].valueChanges.subscribe((value: string) => {
      // Update the form control with the lowercase value
      this.getServiceForm.controls?.['customer_name'].setValue(value.toLowerCase(), { emitEvent: false });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(openStatusDialog, {
      data: { "service status": this.service_status },
    });

    dialogRef.afterClosed().subscribe((updatedStatus) => {
      if (updatedStatus) {
        this.fetchActiveService[0].service_status = updatedStatus;
      }
    });
  }

  receiveDataFromChangeStatus(changeStatusData: any) {
    console.log("changes", changeStatusData);
  }
  service_status:any;
  onSubmit() {
    this.addService.getService().subscribe((response: any) => {
      this.fetchActiveService = response.filter((res: any) => {
        return res.vehicle_no === this.getServiceForm.get('vehicleNo')?.value;
      });
      console.log("fetchActiveService", this.fetchActiveService);
      this.service_status = this.fetchActiveService[0];
      this.customerService.getUserById(this.fetchActiveService.id).subscribe(
        (res: any) => {
          if (res[0].isActive === true) {
            this.filteredActiveService = res[0];
            console.log("filteredActiveService", this.filteredActiveService);
            this.showService=true;
          } else {
            alert('Unknown user')
          }
        }
      )
    })
  }
}

@Component({
  selector: 'open-status-dialog',
  templateUrl: 'open-status-dialog.html',
  styleUrls: ['open-status-dialog.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class openStatusDialog implements OnInit {
  statusChangeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<openStatusDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private addService:AddServiceService
  ) { }

  ngOnInit(): void {
   this.statusChangeForm=this.fb.group({
    flexRadioDefault:['',Validators.required]
   })
   this.statusChangeForm.controls?.['flexRadioDefault'].setValue(this.data["service status"].service_status);
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  changeStatus() {
    if(this.statusChangeForm.valid){
      this.addService.getService().subscribe((response: any[]) => {
        const service= response.find((res: any) => {
          return res.vehicle_no === this.data['service status'].vehicle_no;
        });
        if(service){
          service.service_status =this.statusChangeForm.controls?.['flexRadioDefault'].value;
          console.log("service",service);
          this.addService.putAddService(service).subscribe((res:any)=>{
            console.log("changes service",service);
            alert('status updated successfully');
            this.dialogRef.close(service.service_status)
          }
         
          );
        }else{

        }
    }
  )}
}
}
