import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args)
      return value;
    return value.filter(
      (item: any) => item.name.toLowerCase().indexOf(args.toLowerCase()) > -1
    );
  }

}
