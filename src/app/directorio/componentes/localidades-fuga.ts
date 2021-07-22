import { Component, Input, OnInit } from '@angular/core';
import { ILocalidad } from 'src/app/services/store.model';

@Component({
  selector: 'app-localidades-fuga',
  template: `
    <div class="p-d-flex p-ai-center p-mt-1">
      <p-tag
        styleClass="p-mr-2"
        [severity]="color"
        [value]="item.codigo === 0 ? 'Bogotá' : item.nombre"
        *ngFor="let item of datos"
      ></p-tag>
    </div>
  `,
  styles: [],
})
export class LocalidadesFugaComponent implements OnInit {
  @Input() datos!: ILocalidad[];
  @Input() color: string = 'info';
  constructor() {}

  ngOnInit(): void {}
}
