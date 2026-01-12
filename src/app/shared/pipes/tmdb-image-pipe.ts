import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/enviroment';

@Pipe({
  name: 'tmdbImage',
  standalone: true
})
export class TmdbImagePipe implements PipeTransform {

  transform(path: string | null | undefined, size = 'w500'): string {
    if (!path) return 'assets/no-poster.png';
    return `${environment.tmdbImageUrl}/${size}${path}`;
  }

}
