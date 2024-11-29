import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AddServiceService } from 'src/app/services/add-service.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-service-history-pdf',
  templateUrl: './service-history-pdf.component.html',
  styleUrls: ['./service-history-pdf.component.scss']
})
export class ServiceHistoryPdfComponent {
  id:any;
  vehicleNo:any;
  date:any;
  serviceDetails:any;
  userDetails:any;
  vehiclenumber:any;
  todayDate:Date=new Date();
  amount:number=1000;

constructor(private route:ActivatedRoute,
  private _addServices:AddServiceService,
  private _userService:UserService
){}

ngOnInit():void{
  this.id=this.route.snapshot.paramMap.get('id');
  this.route.queryParams.subscribe((params:any)=>
    {
      this.vehiclenumber=params['vehicleNo'],
      this.fetchServiceDetails(this.vehiclenumber);
      // this.downloadPDF();
    }
  );
}
fetchServiceDetails(vehicleNo:number){
  this._addServices.getService().subscribe(
(data:any)=>{
  this.serviceDetails=data.filter((x:any)=>x.vehicle_no==vehicleNo);
  console.log("ffs data",this.serviceDetails);
});
this._userService.getUserById(this.id).subscribe((res:any)=>{
  this.userDetails=res;
  console.log("UserDetails",this.userDetails);
});
}
downloadPDF() {
  const element = document.getElementById('pdf'); // The element you want to export
  html2canvas(element!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 150; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
      }

      pdf.save('web-page.pdf'); // Download the PDF
  });
}

}
