import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Movie, Genre } from '../models/movie.model';
import { environment } from '../../../environments/enviroment';
interface MovieCategory {
  movies: WritableSignal<Movie[]>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<string | null>;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  
  private categories: Record<string, MovieCategory> = {
    trending: {
      movies: signal<Movie[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null)
    },
    nowPlaying: {
      movies: signal<Movie[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null)
    },
    upcoming: {
      movies: signal<Movie[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null)
    },
    topRated: {
      movies: signal<Movie[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null)
    },
    popular: {
      movies: signal<Movie[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null)
    }
  };
  // ========== MOVIE CATEGORIES ==========

  // Public readonly signals
  // Public readonly signals
  readonly trendingMovies = this.categories['trending'].movies.asReadonly();
  readonly trendingLoading = this.categories['trending'].loading.asReadonly();
  readonly trendingError = this.categories['trending'].error.asReadonly();

  readonly nowPlayingMovies = this.categories['nowPlaying'].movies.asReadonly();
  readonly nowPlayingLoading = this.categories['nowPlaying'].loading.asReadonly();
  readonly nowPlayingError = this.categories['nowPlaying'].error.asReadonly();

  readonly upcomingMovies = this.categories['upcoming'].movies.asReadonly();
  readonly upcomingLoading = this.categories['upcoming'].loading.asReadonly();
  readonly upcomingError = this.categories['upcoming'].error.asReadonly();

  readonly topRatedMovies = this.categories['topRated'].movies.asReadonly();
  readonly topRatedLoading = this.categories['topRated'].loading.asReadonly();
  readonly topRatedError = this.categories['topRated'].error.asReadonly();

  readonly popularMovies = this.categories['popular'].movies.asReadonly();
  readonly popularLoading = this.categories['popular'].loading.asReadonly();
  readonly popularError = this.categories['popular'].error.asReadonly();
  // ========== GENERIC LOAD METHOD ==========
  private loadMovieCategory(
    categoryKey: keyof typeof this.categories,
    endpoint: string,
    errorMessage: string
  ): void {
    const category = this.categories[categoryKey];

    // Skip if already loaded
    if (category.movies().length > 0) return;

    category.loading.set(true);
    category.error.set(null);

    this.http.get<Movie[]>(`${this.apiUrl}/movies/${endpoint}`).pipe(
      catchError(() => {
        category.error.set(errorMessage);
        return of([]);
      })
    ).subscribe(movies => {
      category.movies.set(movies);
      category.loading.set(false);
    });
  }

  // ========== PUBLIC LOAD METHODS ==========
  loadTrendingMovies(): void {
    this.loadMovieCategory('trending', 'trending', 'Failed to load trending movies');
  }

  loadNowPlayingMovies(): void {
    this.loadMovieCategory('nowPlaying', 'now_playing', 'Failed to load now playing movies');
  }

  loadUpcomingMovies(): void {
    this.loadMovieCategory('upcoming', 'upcoming', 'Failed to load upcoming movies');
  }

  loadTopRatedMovies(): void {
    this.loadMovieCategory('topRated', 'top_rated', 'Failed to load top rated movies');
  }

  loadPopularMovies(): void {
    this.loadMovieCategory('popular', 'popular', 'Failed to load popular movies');
  }

  // ========== SEARCH (keep as is) ==========
  private _searchQuery = signal('');
  private _searchResults = signal<Movie[]>([]);
  private _searchLoading = signal(false);
  private _searchError = signal<string | null>(null);
  private _hasSearched = signal(false);

  readonly searchQuery = this._searchQuery.asReadonly();
  readonly searchResults = this._searchResults.asReadonly();
  readonly searchLoading = this._searchLoading.asReadonly();
  readonly searchError = this._searchError.asReadonly();
  readonly hasSearched = this._hasSearched.asReadonly();

  search(query: string): void {
    const trimmed = query.trim();
    this._searchQuery.set(trimmed);
    this._searchError.set(null);

    if (trimmed.length < 2) {
      this._searchResults.set([]);
      this._searchLoading.set(false);
      return;
    }

    this._searchLoading.set(true);

    this.http.get<Movie[]>(`${this.apiUrl}/movies/search?query=${trimmed}`).pipe(
      catchError(() => {
        this._searchError.set('Failed to search movies');
        return of([]);
      })
    ).subscribe(movies => {
      this._searchResults.set(movies);
      this._searchLoading.set(false);
      this._hasSearched.set(true);
    });
  }

  clearSearch(): void {
    this._searchQuery.set('');
    this._searchResults.set([]);
    this._hasSearched.set(false);
    this._searchError.set(null);
  }

  // ========== OTHER METHODS (keep as is) ==========
  getMovieDetails(id: number) {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  private _genres = signal<Genre[]>([]);
  readonly genres = this._genres.asReadonly();

  loadGenres(): void {
    if (this._genres().length > 0) return;
    this.http.get<Genre[]>(`${this.apiUrl}/movies/genres`).subscribe(
      genres => this._genres.set(genres)
    );
  }

  getImageUrl(path: string, size = 'w500'): string {
    if (!path) return 'assets/no-poster.png';
    return `${environment.tmdbImageUrl}/${size}${path}`;
  }
}