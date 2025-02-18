import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {

  transform(value: string, num:number): string {


    return value.split(" ").splice(0, num).join(" ");
  }

}
