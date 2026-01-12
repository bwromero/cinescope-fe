import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../core/services/watchlist';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Movie } from '../../core/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  watchlistService = inject(WatchlistService);
  private router = inject(Router);

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }
}