import { Pipe, PipeTransform, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie';

@Pipe({
  name: 'genreNames',
  standalone: true
})
export class GenreNamesPipe implements PipeTransform {
  private movieService = inject(MovieService);

  transform(genreIds: number[] | undefined, limit = 2): string[] {
    if (!genreIds?.length) return [];
    
    const genres = this.movieService.genres();
    if (!genres.length) return [];

    return genreIds
      .slice(0, limit)
      .map(id => genres.find(g => g.id === id)?.name)
      .filter((name): name is string => !!name);
  }
}