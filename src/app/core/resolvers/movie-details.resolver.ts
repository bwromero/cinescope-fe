import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie';

export const movieDetailsResolver: ResolveFn<Movie | null> = (route) => {
  const movieService = inject(MovieService);
  const id = route.paramMap.get('id');

  if (!id) return of(null);

  return movieService.getMovieDetails(+id).pipe(
    catchError((error) => {
      console.error('Failed to load movie:', error);
      return of(null);
    })
  );
};