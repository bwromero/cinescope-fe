import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, PageResponse, Genre } from '../models/movie.model';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTrendingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/trending`);
  }

  getPopularMovies(page = 1): Observable<PageResponse<Movie>> {
    return this.http.get<PageResponse<Movie>>(`${this.apiUrl}/movies/popular?page=${page}`);
  }

  searchMovies(query: string, page = 1): Observable<PageResponse<Movie>> {
    return this.http.get<PageResponse<Movie>>(`${this.apiUrl}/movies/search?query=${query}&page=${page}`);
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/movies/genres`);
  }

  getImageUrl(path: string, size = 'w500'): string {
    if (!path) return 'assets/no-poster.png';
    return `${environment.tmdbImageUrl}/${size}${path}`;
  }
}