import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  pure:false,

})
export class HighlightPipe implements PipeTransform {
  constructor() {}
  transform(value: string, query: any[]): any {
    if (query.length === 0) {
      return value;
    }
    return value.replace(new RegExp(query.join('|'), 'gi'), (match: string) => {
      return '<span class="highlightText">' + match + '</span>';

    });
    return null;
  }
}
