import { Injectable } from '@angular/core';
import { ILocalidad } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class DbStaticService {
  private localidades: ILocalidad[] = [
    { codigo: 0, nombre: 'TODA LA CIUDAD' },
    { codigo: 3, nombre: 'Santa Fe' },
    { codigo: 14, nombre: 'Los Mártires' },
    { codigo: 17, nombre: 'La Candelaria' },
    { codigo: 1, nombre: 'Usaquén' },
    { codigo: 2, nombre: 'Chapinero' },
    { codigo: 4, nombre: 'San Cristóbal' },
    { codigo: 5, nombre: 'Usme' },
    { codigo: 6, nombre: 'Tunjuelito' },
    { codigo: 7, nombre: 'Bosa' },
    { codigo: 8, nombre: 'Kennedy' },
    { codigo: 9, nombre: 'Fontibón' },
    { codigo: 10, nombre: 'Engativá' },
    { codigo: 11, nombre: 'Suba' },
    { codigo: 12, nombre: 'Barrios Unidos' },
    { codigo: 13, nombre: 'Teusaquillo' },
    { codigo: 15, nombre: 'Antonio Nariño' },
    { codigo: 16, nombre: 'Puente Aranda' },
    { codigo: 18, nombre: 'Rafael Uribe' },
    { codigo: 19, nombre: 'Ciudad Bolívar' },
    { codigo: 20, nombre: 'Sumapaz' },
  ];
  constructor() {}
  get local(): ILocalidad[] {
    return this.localidades;
  }
}
