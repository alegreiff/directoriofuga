import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbFirebaseService } from 'src/app/services/db-firebase.service';
import { DbStaticService } from 'src/app/services/db-static.service';
import { StateService } from 'src/app/services/state.service';
import { ILocalidad } from 'src/app/services/store.model';
import { Sitio, TipoWeb } from 'src/app/services/web.model';

@Component({
  selector: 'app-directorio-nuevo',
  templateUrl: './directorio-nuevo.component.html',
  styleUrls: ['./directorio-nuevo.component.scss'],
})
export class DirectorioNuevoComponent implements OnInit, OnChanges {
  @Output() cerrarModalEdicion = new EventEmitter<boolean>();
  @Input() sitio!: Sitio;
  webs!: Sitio[];
  storeSub: Subscription | null = null;
  nuevoSitioForm!: FormGroup;
  tipo: string[] = [];
  tiposSeleccionados: string[] = [];
  results!: string[];
  localidades: ILocalidad[] = [];
  selectedCities3!: any[];
  constructor(
    private fb: FormBuilder,
    private db: DbFirebaseService,
    private router: Router,
    private estado: StateService,
    private staticDB: DbStaticService
  ) {}

  ngOnInit(): void {
    this.localidades = this.staticDB.local;
    this.storeSub = this.estado.stateChanged.subscribe((estado) => {
      if (estado) {
        this.webs = estado.sitios;
      }
    });

    this.creaFormulario();
    this.tipo = Object.keys(TipoWeb).filter((key) => isNaN(+key));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nuevoSitioForm && this.tiposForma) {
      this.tiposForma.clear();
    }
    if (this.sitio) {
      this.tiposSeleccionados = [];

      if (this.sitio.tipo) {
        if (Array.isArray(this.sitio.tipo)) {
          for (let t of this.sitio.tipo) {
            this.tiposSeleccionados.push(t);
          }
        } else {
          this.tiposSeleccionados.push(this.sitio.tipo);
        }
      }
      this.nuevoSitioForm.reset({
        nombre: this.sitio.nombre,
        descripcion: this.sitio.descripcion,
        enlace: this.sitio.enlace,
        localidades: this.sitio.localidades,
      });
      if (this.sitio.tipo) {
        if (Array.isArray(this.sitio.tipo)) {
          for (let eltipo of this.sitio.tipo) {
            console.log('Type', eltipo);
            //this.tiposSeleccionados.push(eltipo);
            this.agregarTipos(eltipo);
          }
        } else {
          //this.tiposSeleccionados.push(this.sitio.tipo);
          this.agregarTipos(this.sitio.tipo);
        }
      }
    }
  }
  search(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.webs.length; i++) {
      let web = this.webs[i];
      if (web.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(web.nombre);
      }
    }
    this.results = filtered;
  }

  creaFormulario() {
    this.nuevoSitioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      enlace: ['', [Validators.required]],
      tiposForma: this.fb.array([], Validators.required),
      localidades: [],
    });
  }
  get tiposForma() {
    return this.nuevoSitioForm.get('tiposForma') as FormArray;
  }
  tiposCambio(estado: boolean, elemento: string) {
    if (estado) {
      this.tiposForma.push(this.fb.control(elemento));
    } else {
      const indice = this.tiposForma.value.indexOf(elemento);
      this.tiposForma.removeAt(indice);
    }
  }
  agregarTipos(tipo: string) {
    this.tiposForma.push(this.fb.control(tipo));
  }
  cambioCH(e: boolean) {
    console.log(e);
  }
  removerTipos(tipo: string) {
    console.log('BORRAD', tipo);
    //this.tiposForma.push(this.fb.control(tipo));
  }

  campoEsValido(campo: string) {
    return (
      this.nuevoSitioForm.controls[campo].errors &&
      this.nuevoSitioForm.controls[campo].touched
    );
  }

  guardaSitio() {
    if (!this.nuevoSitioForm.valid) {
      return;
    }
    const { nombre, descripcion, enlace, tiposForma, localidades } =
      this.nuevoSitioForm.value;
    const nuevoSitio: Sitio = {
      descripcion,
      enlace,
      nombre,
      tipo: tiposForma,
      localidades,
    };
    if (this.sitio?.id) {
      this.db.editaSitio(this.sitio.id, nuevoSitio).then((res) => {
        console.log('Sitio ALTERED');
        this.cerrarModalEdicion.emit(false);
      });
    } else {
      this.db.creaSitio(nuevoSitio).then((res) => {
        console.log('Sitio creado');
        this.router.navigate(['/directorio']);
      });
    }
  }
}
