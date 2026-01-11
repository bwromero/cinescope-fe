import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
      },
      {
        path: 'movie/:id',
        loadComponent: () => import('./features/movie-details/movie-details').then(m => m.MovieDetails)
      },
    //   {
    //     path: 'search',
    //     loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
    //   },
      {
        path: '**',
        redirectTo: ''
      }
];
