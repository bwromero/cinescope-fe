import { Component, inject, input, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { WatchlistService } from '../../core/services/watchlist';
import { Movie } from '../../core/models/movie.model';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [TmdbImagePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);
  private router = inject(Router);

  // Route param
  id = input.required<string>();

  // Local state
  protected movie = signal<Movie | null>(null);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  // Computed values
  protected year = computed(() => 
    this.movie()?.releaseDate?.split('-')[0] ?? ''
  );
  
  protected rating = computed(() => 
    this.movie()?.rating?.toFixed(1) ?? 'N/A'
  );

  protected isInWatchlist = computed(() => {
    const m = this.movie();
    return m ? this.watchlistService.isInWatchlist(m.id) : false;
  });

  ngOnInit(): void {
    this.loadMovie();
  }

  private loadMovie(): void {
    this.loading.set(true);
    this.error.set(null);

    this.movieService.getMovieDetails(+this.id()).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load movie details');
        this.loading.set(false);
      }
    });
  }

  toggleWatchlist(): void {
    const m = this.movie();
    if (m) this.watchlistService.toggleWatchlist(m);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}