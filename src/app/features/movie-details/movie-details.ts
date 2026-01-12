import { Component, inject, input, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService } from '../../core/services/watchlist';
import { Movie } from '../../core/models/movie.model';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';
import { ImageLoaderDirective } from '../../core/directives/image-loader-directive';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [TmdbImagePipe, ImageLoaderDirective],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private watchlistService = inject(WatchlistService);
  private router = inject(Router);

  // Route param
  protected id = input.required<string>();
  protected movie = input<Movie | null>(null);

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

  toggleWatchlist(): void {
    const m = this.movie();
    if (m) this.watchlistService.toggleWatchlist(m);
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}