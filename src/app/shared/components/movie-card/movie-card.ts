import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {

  movie = input.required<Movie>();
  
  private movieService = inject(MovieService);

  get posterUrl(): string {
    return this.movieService.getImageUrl(this.movie().posterPath, 'w342');
  }

  get year(): string {
    return this.movie().releaseDate?.split('-')[0] ?? 'N/A';
  }

  get rating(): string {
    return this.movie().voteAverage?.toFixed(1) ?? 'N/A';
  }
}
