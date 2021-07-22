import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'directorioHeader',
  template: `
    <div>
      <p [innerHTML]="mensaje"></p>
    </div>
  `,
  styles: [],
})
export class DirectorioHeaderComponent implements OnInit {
  //@Input() datos!: ILocalidad[];
  @Input() tipo!: string;
  mensaje!: string;
  constructor() {}

  ngOnInit(): void {
    if (this.tipo === 'Directorio') {
      this.mensaje =
        'Contenido dirigido a los <strong>Ciudadanos</strong> en general';
    } else if (this.tipo === 'Formación') {
      this.mensaje =
        'Contenido dirigido a los <strong>Actores culturales y creativos </strong> para apoyar sus procesos de formación en el entorno digital';
    } else if (this.tipo == 'Institucional') {
      this.mensaje = 'Contenido dirigido <strong>todos</strong> los públicos';
    }
  }
}
