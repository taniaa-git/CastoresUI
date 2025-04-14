import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'filterByAction'
})
export class FilterByActionPipe implements PipeTransform {
  transform(logs: any[], action: string): any[] {
    if (!action) return logs;
    return logs.filter(log => log.action === action);
  }
}
