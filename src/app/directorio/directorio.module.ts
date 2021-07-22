import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorioRoutingModule } from './directorio-routing.module';
import { DirectorioComponent } from './directorio.component';
import { DirectorioSingleComponent } from './directorio-single/directorio-single.component';
import { ModulosprimeModule } from '../modulosprime/modulosprime.module';
import { DirectorioNuevoComponent } from './directorio-nuevo/directorio-nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { CategFugaComponent } from './componentes/categ-fuga.component';
import { LocalidadesFugaComponent } from './componentes/localidades-fuga';
import { DirectorioHeaderComponent } from './componentes/directorio-header';
import { DataViewFugaComponent } from './componentes/data-view-fuga.component';

@NgModule({
  declarations: [
    DirectorioComponent,
    DirectorioSingleComponent,
    DirectorioNuevoComponent,
    CategFugaComponent,
    LocalidadesFugaComponent,
    DirectorioHeaderComponent,
    DataViewFugaComponent,
  ],
  imports: [
    CommonModule,
    DirectorioRoutingModule,
    ModulosprimeModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
})
export class DirectorioModule {}
