import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findPRoduct'
})
export class FindPRoductPipe implements PipeTransform {

  transform(value: any[], wordSearch : string): any[] {
    return value.filter(item => item.title.toLowerCase().includes(wordSearch.toLowerCase()));
  }

}
