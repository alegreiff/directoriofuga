import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ModulosprimeModule } from '../modulosprime/modulosprime.module';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spiner.component';

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [CommonModule, AuthRoutingModule, ModulosprimeModule, FormsModule],
})
export class AuthModule {}
