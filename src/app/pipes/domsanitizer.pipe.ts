import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'domsanitizer'
})
export class DomsanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string): any {

    const url = 'https://open.spotify.com/embed/track/';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
