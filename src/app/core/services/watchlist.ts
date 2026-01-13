import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private storageKey = 'cinescope_watchlist';
  
  // BehaviorSubject holds the state
  private watchlistSubject = new BehaviorSubject<Movie[]>(this.loadFromStorage());
  
  // Expose as observable for subscribers
  watchlist$ = this.watchlistSubject.asObservable();
  
  // Also expose as signal for easier template usage
  watchlist = signal<Movie[]>(this.loadFromStorage());
  
  // Computed: count for header badge
  count = computed(() => this.watchlist().length);

  watchlistIds = computed(() => new Set(this.watchlist().map(m => m.id)));


  private loadFromStorage(): Movie[] {
    if (typeof localStorage === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(movies: Movie[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistIds().has(movieId);  // Now uses the Set too!
  }

  addToWatchlist(movie: Movie): void {
    if (this.isInWatchlist(movie.id)) return;
    
    const updated = [...this.watchlist(), movie];
    this.watchlist.set(updated);
    this.watchlistSubject.next(updated);
    this.saveToStorage(updated);
  }

  removeFromWatchlist(movieId: number): void {
    const updated = this.watchlist().filter(m => m.id !== movieId);
    this.watchlist.set(updated);
    this.watchlistSubject.next(updated);
    this.saveToStorage(updated);
  }

  toggleWatchlist(movie: Movie): void {
    if (this.isInWatchlist(movie.id)) {
      this.removeFromWatchlist(movie.id);
    } else {
      this.addToWatchlist(movie);
    }
  }
}