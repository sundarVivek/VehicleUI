import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'searchService'
})
export class SearchServicePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    args=args.toLowerCase();
    return value.filter((item:any)=>{
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
