import { Component, input, output } from '@angular/core';
import { MovieCard } from '../../../../components/movie-card/movie-card';
import { Movie } from '../../../../../core/models/movie.model';


@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './movie-section.html',
  styleUrl: './movie-section.css',
})
export class MovieSection {
  // Inputs
  title = input.required<string>();
  movies = input.required<Movie[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  // Output
  movieClick = output<Movie>();

  onMovieClick(movie: Movie): void {
    this.movieClick.emit(movie);
  }
}