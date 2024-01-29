import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeAfterAtSymbol'
})
export class RemoveAfterAtSymbolPipe implements PipeTransform {

  transform(value: any): string {
    if(value)
    {
      const atIndex = value.indexOf('@');
      return atIndex !== -1 ? value.substring(0, atIndex) : value;
    }
    return value;
  }

}
