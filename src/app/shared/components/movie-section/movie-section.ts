import { Component, input, output } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { MovieCard } from '../movie-card/movie-card';


@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './movie-section.html',
  styleUrl: './movie-section.css',
})
export class MovieSection {
  title = input.required<string>();
  movies = input.required<Movie[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  movieClick = output<Movie>();

  onMovieClick(movie: Movie): void {
    this.movieClick.emit(movie);
  }
}