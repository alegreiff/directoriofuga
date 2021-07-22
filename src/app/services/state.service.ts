import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { AccionesStore, StoreState } from './store.model';
import * as _ from 'lodash';
import { Sitio } from './web.model';
import { of } from 'rxjs';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class StateService extends ObservableStore<StoreState> {
  initialState: StoreState = {
    sitios: [],
    usuario: null,
  };
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    this.setState(this.initialState, AccionesStore.EstadoInicial);
  }

  setSitio(sitios: Sitio[]) {
    let state = this.getState();
    state.sitios = _.sortBy(sitios, ['nombre']);
    this.setState({ sitios: state.sitios }, AccionesStore.CargaSitios);
  }
  setUsuario(usuario: IUser) {
    let state = this.getState();
    state.usuario = usuario;
    this.setState({ usuario: state.usuario }, AccionesStore.EstablecerUser);
  }
  cleanUser() {
    this.setState({ usuario: null }, AccionesStore.LimpiarUser);
  }
  getAdmin() {
    const sale = this.getState().usuario;
    if (sale) {
      return 'HAY';
    } else {
      return 'NO HAY';
    }
  }

  getSitios() {
    return of(this.getState().sitios);
    /* const { sitios } = this.getState();
    if (sitios) {
      return of(sitios);
    } else {
      return null;
    } */
  }
}
