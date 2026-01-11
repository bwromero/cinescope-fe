import { Component, inject, signal, input, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie.model';
import { WatchlistService } from '../../core/services/watchlist';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  id = input.required<string>();

  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);

  movie = signal<Movie | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.movieService.getMovieDetails(+this.id()).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load movie:', err);
        this.loading.set(false);
      }
    });
  }

  get backdropUrl(): string {
    const path = this.movie()?.backdropPath;
    return path ? this.movieService.getImageUrl(path, 'w1280') : '';
  }

  get posterUrl(): string {
    const path = this.movie()?.posterPath;
    return path ? this.movieService.getImageUrl(path, 'w500') : '';
  }

  get year(): string {
    return this.movie()?.releaseDate?.split('-')[0] ?? '';
  }

  get rating(): string {
    return this.movie()?.voteAverage?.toFixed(1) ?? 'N/A';
  }

  get isInWatchlist(): boolean {
    const movie = this.movie();
    return movie ? this.watchlistService.isInWatchlist(movie.id) : false;
  }

  toggleWatchlist(): void {
    const movie = this.movie();
    if (movie) {
      this.watchlistService.toggleWatchlist(movie);
    }
  }
}