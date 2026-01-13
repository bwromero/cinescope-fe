import { Component, computed, effect, ElementRef, inject, PLATFORM_ID, signal, viewChild, ViewChild } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { Router } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';
import { WatchlistService } from '../../core/services/watchlist';
import { MovieSection } from '../../shared/pipes/shared/components/movie-section/movie-section';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TmdbImagePipe, MovieSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);
  private router = inject(Router);

  protected readonly trendingMovies = this.movieService.trendingMovies;
  protected readonly trendingLoading = this.movieService.trendingLoading;
  protected readonly trendingError = this.movieService.trendingError;

  protected readonly nowPlayingMovies = this.movieService.nowPlayingMovies;
  protected readonly nowPlayingLoading = this.movieService.nowPlayingLoading;
  protected readonly nowPlayingError = this.movieService.nowPlayingError;

  protected readonly upcomingMovies = this.movieService.upcomingMovies;
  protected readonly upcomingLoading = this.movieService.upcomingLoading;
  protected readonly upcomingError = this.movieService.upcomingError;

  protected readonly topRatedMovies = this.movieService.topRatedMovies;
  protected readonly topRatedLoading = this.movieService.topRatedLoading;
  protected readonly topRatedError = this.movieService.topRatedError;

  protected readonly popularMovies = this.movieService.popularMovies;
  protected readonly popularLoading = this.movieService.popularLoading;
  protected readonly popularError = this.movieService.popularError;
  private platformId = inject(PLATFORM_ID);

  swiperContainer = viewChild<ElementRef>('heroSwiper');

  private swiper?: Swiper;


  protected readonly featuredMovies = computed<Movie[]>(() => 
    this.trendingMovies()?.slice(0, 5) ?? []
  );

  constructor() {
    this.loadMovies();

    effect(() => {
      const container = this.swiperContainer();

      if (container && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.initSwiper(container.nativeElement);
        }, 0);
      }
    });
  }

  private initSwiper(element: HTMLElement): void {
    if (this.swiper) {
      this.swiper.destroy();
    }

    this.swiper = new Swiper(element, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 800,
    });
  }

  private loadMovies() {
    this.movieService.loadTrendingMovies();
    this.movieService.loadNowPlayingMovies();
    this.movieService.loadUpcomingMovies();
    this.movieService.loadTopRatedMovies();
    this.movieService.loadPopularMovies();
  }

  protected isInWatchlist(movieId: number): boolean {
    return this.watchlistService.isInWatchlist(movieId);
  }

  protected toggleWatchlist(movie: Movie): void {
    this.watchlistService.toggleWatchlist(movie);
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
