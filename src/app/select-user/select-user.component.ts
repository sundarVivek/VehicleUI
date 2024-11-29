import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent {
  cardValue: any;
  loading:boolean=false;
  constructor(private route:Router){}
ngOnInit(){

}
}
