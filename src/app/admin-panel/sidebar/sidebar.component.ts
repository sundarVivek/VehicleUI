import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  id:any;
constructor(private route:ActivatedRoute){}
ngOnInit():void{
this.id=this.route.snapshot.paramMap.get('id');
}
}
