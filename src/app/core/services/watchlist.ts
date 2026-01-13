import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/watchlist`;
  
  watchlist = signal<Movie[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  count = computed(() => this.watchlist().length);
  
  watchlistIds = computed(() => new Set(this.watchlist().map(m => m.id)));

  constructor() {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Movie[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error('Failed to load watchlist', err);
        this.error.set('Failed to load watchlist');
        return of([]);
      })
    ).subscribe(movies => {
      this.watchlist.set(movies);
      this.loading.set(false);
    });
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistIds().has(movieId);
  }

  addToWatchlist(movie: Movie): void {
    if (this.isInWatchlist(movie.id)) return;
    
    const previousWatchlist = [...this.watchlist()];
    this.watchlist.set([...this.watchlist(), movie]);

    this.http.post(this.apiUrl, movie).pipe(
      catchError((err) => {
        console.error('Failed to add to watchlist', err);
        this.watchlist.set(previousWatchlist);
        this.error.set('Failed to add to watchlist');
        return of(null);
      })
    ).subscribe();
  }

  removeFromWatchlist(movieId: number): void {
    const previousWatchlist = [...this.watchlist()];
    this.watchlist.set(this.watchlist().filter(m => m.id !== movieId));

    this.http.delete(`${this.apiUrl}/${movieId}`).pipe(
      catchError((err) => {
        console.error('Failed to remove from watchlist', err);
        this.watchlist.set(previousWatchlist);
        this.error.set('Failed to remove from watchlist');
        return of(null);
      })
    ).subscribe();
  }

  toggleWatchlist(movie: Movie): void {
    if (this.isInWatchlist(movie.id)) {
      this.removeFromWatchlist(movie.id);
    } else {
      this.addToWatchlist(movie);
    }
  }
}