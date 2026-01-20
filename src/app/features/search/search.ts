import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie.model';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { debounceTime, distinctUntilChanged, switchMap, filter, tap, catchError } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieCard],
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
    'Action',
    'Adventure',
    'Animation',
    'Comedy'
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
}