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

  // Trending
  protected readonly trendingMovies = this.movieService.trendingMovies;
  protected readonly trendingLoading = this.movieService.trendingLoading;
  protected readonly trendingError = this.movieService.trendingError;

  // Now Playing
  protected readonly nowPlayingMovies = this.movieService.nowPlayingMovies;
  protected readonly nowPlayingLoading = this.movieService.nowPlayingLoading;
  protected readonly nowPlayingError = this.movieService.nowPlayingError;

  // Upcoming
  protected readonly upcomingMovies = this.movieService.upcomingMovies;
  protected readonly upcomingLoading = this.movieService.upcomingLoading;
  protected readonly upcomingError = this.movieService.upcomingError;

  // Top Rated
  protected readonly topRatedMovies = this.movieService.topRatedMovies;
  protected readonly topRatedLoading = this.movieService.topRatedLoading;
  protected readonly topRatedError = this.movieService.topRatedError;

  // Popular
  protected readonly popularMovies = this.movieService.popularMovies;
  protected readonly popularLoading = this.movieService.popularLoading;
  protected readonly popularError = this.movieService.popularError;

  constructor() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.loadTrendingMovies();
    this.movieService.loadNowPlayingMovies();
    this.movieService.loadUpcomingMovies();
    this.movieService.loadTopRatedMovies();
    this.movieService.loadPopularMovies();
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
