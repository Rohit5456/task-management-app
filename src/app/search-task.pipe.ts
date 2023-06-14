import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(value: any, searchTearm: any): any {
    console.log('custom filter pipe', value);
   
    return value.filter(function(search) {
      return search.status.toLowerCase().indexOf(searchTearm.toLowerCase()) > -1
    });
  }

}
