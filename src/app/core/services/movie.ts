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

  searchMovies(query: string, page = 1): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/search?query=${query}&page=${page}`);
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