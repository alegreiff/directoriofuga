import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from './nav/menu-superior/menu-superior.component';

//ALGUNOS COMPONENTES DE PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { CategoriasPipe } from './pipes/categorias.pipe';

@NgModule({
  declarations: [MenuSuperiorComponent, CategoriasPipe],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    PrimeSharedModule,
  ],
  exports: [MenuSuperiorComponent, CategoriasPipe],
})
export class CoreModule {}
