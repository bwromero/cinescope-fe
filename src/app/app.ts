import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { MovieService } from './core/services/movie';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styles: `
    .global-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #e94560, #764ba2, #e94560);
      background-size: 200% 100%;
      animation: loading 1.5s ease-in-out infinite;
      z-index: 9999;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .global-loading.overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 15, 26, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #333;
      border-top-color: #e94560;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `})
export class App {
  protected readonly title = signal('CineScope');
  private router = inject(Router);
  protected isLoading = signal(false);

  constructor() {
    inject(MovieService).loadGenres();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }
      if (event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError) {
        this.isLoading.set(false);
      }
    });
  }
}
