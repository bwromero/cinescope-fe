import { Component, computed, inject, input, output } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { TmdbImagePipe } from '../../pipes/tmdb-image-pipe';
import { WatchlistService } from '../../../core/services/watchlist';

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
  watchListService = inject(WatchlistService);

  year = computed(() => this.movie().releaseDate?.split('-')[0] ?? 'N/A');
  rating = computed(() => this.movie().rating?.toFixed(1) ?? 'N/A');

  protected isInWatchlist = computed(() => 
    this.watchListService.isInWatchlist(this.movie().id)
  );

  onClick(): void {
    this.cardClick.emit(this.movie());
  }
}
