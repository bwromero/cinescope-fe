import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../core/services/watchlist';
import { MovieCard } from '../../shared/components/movie-card/movie-card';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  watchlistService = inject(WatchlistService);
}