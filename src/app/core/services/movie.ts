import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Movie, PageResponse, Genre } from '../models/movie.model';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private _trendingMovies = signal<Movie[]>([]);
  private _trendingLoading = signal<boolean>(false);
  private _trendingError = signal<string | null>(null);

  readonly trendingMovies = this._trendingMovies.asReadonly();
  readonly trendingLoading = this._trendingLoading.asReadonly();
  readonly trendingError = this._trendingError.asReadonly();

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


  loadTrendingMovies(): void {
    if (this._trendingMovies().length > 0) return;

    this._trendingLoading.set(true);
    this._trendingError.set(null);

    this.http.get<Movie[]>(`${this.apiUrl}/movies/trending`).pipe(
      catchError(err => {
        this._trendingError.set('Failed to load trending movies');
        return of([]);
      })
    ).subscribe(movies => {
      this._trendingMovies.set(movies);
      this._trendingLoading.set(false);
    })
  }


  getPopularMovies(page = 1): Observable<PageResponse<Movie>> {
    return this.http.get<PageResponse<Movie>>(`${this.apiUrl}/movies/popular?page=${page}`);
  }

  search(query: string): void {
    const trimmed = query.trim();
    this._searchQuery.set(trimmed);
    this._searchError.set(null);

    // Clear results if query too short
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

  getMovieDetails(id: number): Observable<Movie> {
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