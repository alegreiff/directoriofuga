import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Sitio } from 'src/app/services/web.model';

@Component({
  selector: 'app-data-view-fuga',
  templateUrl: './data-view-fuga.component.html',
  styleUrls: ['./data-view-fuga.component.scss'],
})
export class DataViewFugaComponent implements OnInit {
  @Input() products!: Sitio[];
  @Input() isAuthenticated = false;
  @Output() detalle = new EventEmitter<Sitio>();
  @Output() edita = new EventEmitter<Sitio>();
  @Output() filtraLocal = new EventEmitter<number>();

  //products!: Sitio[];
  sortKey: any;
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  elementosGrid = 12;
  elementosList = 100;
  elementos: number = 0;
  paginator = true;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.elementos = this.elementosGrid;
    //this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  activaDetalle(sitio: Sitio) {
    this.detalle.emit(sitio);
  }
  activaEdita(sitio: Sitio) {
    this.edita.emit(sitio);
  }
  activaFiltraLocal(numero: number) {
    this.filtraLocal.emit(numero);
  }

  cambiaLayout(e: any) {
    console.log('Cambiarás', e);
    this.paginator = !this.paginator;
    if (e === 'list') {
      this.elementos = this.elementosList;
    } else {
      this.elementos = this.elementosGrid;
    }
  }
}
