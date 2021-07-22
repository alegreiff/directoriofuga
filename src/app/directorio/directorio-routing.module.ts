import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../auth/authadmin.guard';

import { DirectorioNuevoComponent } from './directorio-nuevo/directorio-nuevo.component';
import { DirectorioSingleComponent } from './directorio-single/directorio-single.component';
import { DirectorioComponent } from './directorio.component';

const routes: Routes = [
  { path: '', component: DirectorioComponent },
  {
    path: 'nuevo',
    component: DirectorioNuevoComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  { path: ':id', component: DirectorioSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorioRoutingModule {}
