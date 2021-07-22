import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TipoWeb } from './services/web.model';

const routes: Routes = [
  {
    path: 'directorio',
    loadChildren: () =>
      import('./directorio/directorio.module').then((m) => m.DirectorioModule),
    data: { name: 'Directorio' },
  },
  {
    path: 'formacion',
    loadChildren: () =>
      import('./directorio/directorio.module').then((m) => m.DirectorioModule),
    data: { name: 'Formación' },
  },
  {
    path: 'institucional',
    loadChildren: () =>
      import('./directorio/directorio.module').then((m) => m.DirectorioModule),
    data: { name: 'Institucional' },
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./directorio/directorio.module').then((m) => m.DirectorioModule),
    data: { name: null },
  },
  {
    path: 'admin',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    //RouterModule.forRoot(routes ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
