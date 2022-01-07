import { Pipe, PipeTransform } from '@angular/core';
import { employee } from 'src/app/store/employee';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any = [], filterString: string) {
    if (filterString == '' || filterString == null) {
      return value;
    }

    const employee = []
    for (const employe of value) {
      if (employe.lastName.toLowerCase().includes(filterString.toLowerCase()) ||
        employe.firstName.toLowerCase().includes(filterString.toLowerCase())) {
          employee.push(employe);
      }
    }
    return employee;
  }
}