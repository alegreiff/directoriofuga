import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { Sitio, TipoWeb } from '../services/web.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss'],
})
export class DirectorioComponent implements OnInit, OnDestroy {
  muestraEdicion: boolean = false;
  muestraDetalle: boolean = false;
  storeSub: Subscription | null = null;
  isAuthenticated = false;
  private userSub!: Subscription;
  webs!: Sitio[];
  websF!: Sitio[];
  webActiva!: Sitio;
  webDetalle!: Sitio;
  tipo: TipoWeb;
  titulo: string = '';
  tituloDetalle: string = '';
  idDetalle: string = '';

  constructor(
    private estado: StateService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.tipo = this.route.snapshot.data.name as TipoWeb;
    console.log('ESTE ES EL TIPO DE TIPO', this.tipo);
  }

  /*
  export enum TipoWeb {
  Institucional = 'Institucional',
  Directorio = 'Directorio',
  Formacion = 'Formación',
  Otro = 'Otro',
}
  */

  ngOnInit(): void {
    this.userSub = this.auth.estado().subscribe((user) => {
      if (user) {
        this.auth.handleAuthentication(
          user?.email ? user?.email : undefined,
          user?.displayName ? user?.displayName : undefined,
          user?.photoURL ? user?.photoURL : undefined
        );
      }
      this.isAuthenticated = !user ? false : true;
    });

    this.storeSub = this.estado.stateChanged.subscribe((estado) => {
      if (estado) {
        if (this.tipo) {
          this.webs = estado.sitios.filter((site) =>
            site.tipo?.includes(this.tipo)
          );
        } else {
          this.webs = estado.sitios;
        }
        this.websF = this.webs;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    this.userSub.unsubscribe();
  }
  edita(web: Sitio) {
    this.muestraEdicion = true;
    this.titulo = web.nombre;
    this.webActiva = web;
  }
  cierraEdicion(evento: boolean) {
    console.log('Closing window dialog modal', evento);

    this.muestraEdicion = evento;
    this.webActiva = { nombre: '', enlace: '', descripcion: '' };
  }

  detalle(web: Sitio) {
    this.muestraDetalle = true;
    this.tituloDetalle = web.nombre;
    this.webDetalle = web;
    if (web.id) {
      this.idDetalle = web.id;
    }
  }
  cierraDetalle(evento: boolean) {
    console.log('Closing window dialog modal', evento);

    this.muestraDetalle = evento;
    this.webDetalle = { nombre: '', enlace: '', descripcion: '' };
  }
  filtraLocal(code: number) {
    if (code === 99) {
      this.websF = this.webs;
    } else {
      const res = _.filter(this.webs, { localidades: [{ codigo: code }] });
      this.websF = res as Sitio[];
      //console.log('FILTRE', res);

      /* this.websF = this.webs.filter((web) =>
        web.localidades?.filter((local) => local.codigo === 5)
      ); */
    }
  }
}
