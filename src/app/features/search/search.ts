import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie.model';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private movieService = inject(MovieService);
  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('');
  results = signal<Movie[]>([]);
  loading = signal(false);
  searched = signal(false);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),                        // Wait 400ms after typing stops
      distinctUntilChanged(),                   // Only if value changed
      tap(() => this.loading.set(true)),
      switchMap(query => {
        if (!query || query.length < 2) {
          this.loading.set(false);
          return of([] as Movie[]);
        }
        return this.movieService.searchMovies(query);
      }),
      takeUntilDestroyed(this.destroyRef)       // Auto-unsubscribe
    ).subscribe({
      next: (response) => {
        this.results.set(response);
        this.loading.set(false);
        this.searched.set(true);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}