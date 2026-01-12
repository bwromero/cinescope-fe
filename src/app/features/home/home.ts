import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  loading = signal(true);

  private moviesResource = toSignal(
    this.movieService.getTrendingMovies().pipe(
      tap(() => this.loading.set(false))
    ),
    { initialValue: [] });

  trendingMovies = computed(() => this.moviesResource());

}
