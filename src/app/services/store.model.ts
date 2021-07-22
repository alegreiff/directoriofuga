import { IUser } from './user.model';
import { IWeb, Sitio } from './web.model';

export interface StoreState {
  //webs: IWeb[];
  //web: IWeb;
  sitios: Sitio[];
  usuario?: IUser | null;
}

export enum AccionesStore {
  EstadoInicial = 'INIT_STATE',
  CargaSitios = 'CARGA_SITIOS',
  EstablecerUser = 'ESTABLECE_USUARIO_MAIN',
  LimpiarUser = 'LIMPIA_USUARIO_MAIN',
}

export interface ILocalidad {
  codigo: number;
  nombre: string;
}
