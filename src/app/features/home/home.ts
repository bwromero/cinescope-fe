import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);

  trendingMovies = signal<Movie[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe({
      next: (movies) => {
        this.trendingMovies.set(movies);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
        this.loading.set(false);
      }
    });
  }
}
