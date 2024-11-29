import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {
  id:any;
  addVehicleForm!:FormGroup;
  isSubmitted=false;
  gender: string[] = ['Male', 'Female', 'Transgender'];
  showHomebutton:boolean=false;

  constructor(
    private fb:FormBuilder,
    private _userService:UserService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.id=this.route.snapshot.paramMap.get('id');
    this.initializeForm();
  }

  private initializeForm(){
    this.addVehicleForm=this.fb.group(
      {
        Registered_certificate_name:['',Validators.required],
        contactNo:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        Email:['',[Validators.required,Validators.email]],
        Gender:['',Validators.required],
        vehicle_no:['',[Validators.required,Validators.pattern('^[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}$')]],
        Vehicle_brand:['',Validators.required],
        vehicle_type:['',Validators.required],
        model_name:['',Validators.required],
        isActive:[false],
        No_of_services:[0]
      }
    )
  }
  formatVehicleNumber() {
    const vehicleNumberControl=this.addVehicleForm.get('vehicle_no') as FormControl;
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
  goHome(){
    this.router.navigate(['/admin/admin-home',this.id]);
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.addVehicleForm.valid){
      const payload=this.addVehicleForm.value;
      this._userService.postUser(payload).subscribe(response=>{
        console.log(response);
        this.toastr.success('Vehicle added successfully');
        this.showHomebutton=true;
      });
      }
    else{
      this.toastr.error('Vehicle added failed');
    }
}
}
