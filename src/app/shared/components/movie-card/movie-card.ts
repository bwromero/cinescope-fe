import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie';
import { TmdbImagePipe } from '../../pipes/tmdb-image-pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [TmdbImagePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {

  movie = input.required<Movie>();
  showRating = input(true);
  cardClick = output<Movie>();

  year = computed(() => this.movie().releaseDate?.split('-')[0] ?? 'N/A');
  rating = computed(() => this.movie().rating?.toFixed(1) ?? 'N/A');

  onClick(): void {
    this.cardClick.emit(this.movie());
  }
}
