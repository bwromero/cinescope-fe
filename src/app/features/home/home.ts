import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Router } from '@angular/router';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  private router = inject(Router);

  // Facade - re-expose service signals
  protected readonly movies = this.movieService.trendingMovies;
  protected readonly loading = this.movieService.trendingLoading;
  protected readonly error = this.movieService.trendingError;

  constructor() {
    this.movieService.loadTrendingMovies();
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
