import { RenderMode, ServerRoute } from '@angular/ssr';

// app.routes.server.ts - UPDATE THIS
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'movie/:id', renderMode: RenderMode.Server },
  { path: 'search', renderMode: RenderMode.Client },
  { path: 'watchlist', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];