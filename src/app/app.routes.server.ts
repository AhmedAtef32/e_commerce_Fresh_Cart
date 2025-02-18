import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  }
  ,
  {
    path: 'product-detalis/:id',
    renderMode: RenderMode.Server
  }
  ,
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
