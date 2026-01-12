import { Routes } from '@angular/router';
import { movieDetailsResolver } from './core/resolvers/movie-details.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
      },
      {
        path: 'movie/:id',
        loadComponent: () => import('./features/movie-details/movie-details').then(m => m.MovieDetails),
        resolve: {
          movie: movieDetailsResolver  // ← Add resolver
        }
      },
      {
        path: 'search',
        loadComponent: () => import('./features/search/search').then(m => m.Search)
      },
      {
        path: 'watchlist',
        loadComponent: () => import('./features/watchlist/watchlist').then(m => m.Watchlist)
      },
      {
        path: '**',
        redirectTo: ''
      }
];
