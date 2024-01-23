import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overview'
})
export class OverviewPipe implements PipeTransform {

  transform(value: string, args?:number): unknown {
    return `${value.substring(0, args)}...`
  }

}
