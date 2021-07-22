import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES IMPORTADOS DE PRIMENG
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';

/* import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple'; */

const primeModulos = [
  AutoCompleteModule,
  ButtonModule,
  MenubarModule,
  InputTextModule,
  DialogModule,
  InputTextareaModule,
  EditorModule,
  CheckboxModule,
  CardModule,
  TagModule,
  MultiSelectModule,
  DataViewModule,
  DropdownModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [primeModulos],
})
export class ModulosprimeModule {}
