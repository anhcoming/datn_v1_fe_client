import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnd'
})
export class CurrencyPipe implements PipeTransform {

  symbol = '₫';

  //transform(value: string): string {
  transform(value: any): any {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + this.symbol;
  }

}
