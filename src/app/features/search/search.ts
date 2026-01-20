import { Component, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie.model';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { debounceTime, distinctUntilChanged, filter, tap, catchError } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Select } from '../../shared/components/select/select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieCard, Select],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private movieService = inject(MovieService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected searchControl = new FormControl('');
  protected results = this.movieService.searchResults;
  protected loading = this.movieService.searchLoading;
  protected error = this.movieService.searchError;
  protected searched = this.movieService.hasSearched;

  genres = [
    { label: 'Action', value: 'action' },
    { label: 'Drama', value: 'drama' },
    { label: 'Sci-Fi', value: 'scifi' }
  ];

  years = Array.from({ length: 111 }, (_, i) => 1916 + i);

  ratings = ['1+', '2+', '3+', '4+', '5+', '6+', '7+', '8+', '9+'];

  sortOptions = ['Newest First', 'Oldest First', 'Top IMDb', 'Bottom IMDb'];

  private fb = new FormBuilder();

  readonly form = signal(
    this.fb.group({
      genre: [''],
      year: [''],
      rating: [''],
      sort: ['']
    })
  )

  constructor() {
    this.setupSearch();
  }

  private setupSearch() {
    const savedQuery = this.movieService.searchQuery();
    if (savedQuery) {
      this.searchControl.setValue(savedQuery, { emitEvent: false });
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.movieService.search(query ?? '');
    });
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }

  onGenreChange(event: string | null) {

    console.log(event)

  }
}