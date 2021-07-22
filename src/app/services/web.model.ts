import { ILocalidad } from './store.model';

export interface IWeb {
  id: number;
  url: string;
  describe: string;
}

export interface Sitio {
  id?: string;
  nombre: string;
  descripcion: string;
  enlace: string;
  caracteristicas?: string;
  fecharevision?: string;
  tipo?: TipoWeb[];
  tipomultiple?: boolean;
  localidades?: ILocalidad[];
  //tags: Tag[];
}

export enum TipoWeb {
  Institucional = 'Institucional',
  Directorio = 'Directorio',
  'Formación' = 'Formación',
  Otro = 'Otro',
}
