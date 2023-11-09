import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimming'
})
export class TrimPipe implements PipeTransform {

  transform(textToTrim: string | null | undefined, longitud: number = 20): string {
    if (!textToTrim) {
      return '';
    }
    if (textToTrim.length > longitud) {
      return textToTrim.substring(0, longitud) + '...';
    } else {
      return textToTrim;
    }
  }

}