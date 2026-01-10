import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlAndSlice',
  standalone: true
})
export class StripHtmlAndSlicePipe implements PipeTransform {

  transform(htmlString: string, length: number = 55): string {
    if (!htmlString || typeof htmlString !== 'string') {
      return '';
    }

    // 1. Remove HTML tags using a regular expression
    const plainText = htmlString.replace(/<[^>]*>/g, '');

    // 2. Slice the resulting plain text to the desired length
    if (plainText.length > length) {
      return plainText.substring(0, length) + '...';
    }

    return plainText;
  }

}
