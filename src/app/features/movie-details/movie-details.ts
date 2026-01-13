import { Component, inject, input, computed, signal, effect } from '@angular/core';
import { WatchlistService } from '../../core/services/watchlist';
import { Movie } from '../../core/models/movie.model';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';
import { ImageLoaderDirective } from '../../core/directives/image-loader-directive';
import { DecimalPipe, Location } from '@angular/common';
import { FormatRuntimePipe } from '../../shared/pipes/format-runtime-pipe';
import { SafeUrlPipe } from '../../shared/pipes/safe-url-pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [TmdbImagePipe, SafeUrlPipe, ImageLoaderDirective, DecimalPipe, FormatRuntimePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private watchlistService = inject(WatchlistService);
  private location = inject(Location);
  protected id = input.required<string>();
  protected movie = input<Movie | null>(null);
  protected showTrailer = signal(false);

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

  protected trailerKey = computed(() => {
    const videos = this.movie()?.videos?.results;
    if (!videos?.length) return null;

    const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    ?? videos.find(v => v.type === 'Teaser' && v.site === 'YouTube');
      return trailer?.key ?? null;
  });


  playTrailer(): void {
    this.showTrailer.set(true);
  }

  closeTrailer(): void {
    this.showTrailer.set(false);
  }

  toggleWatchlist(): void {
    const m = this.movie();
    if (m) this.watchlistService.toggleWatchlist(m);
  }

  goBack(): void {
    this.location.back()
  }
}