import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRuntime',
  standalone: true
})
export class FormatRuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  }
}