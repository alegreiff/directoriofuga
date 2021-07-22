import { Component, Input, OnInit } from '@angular/core';
import { TipoWeb } from 'src/app/services/web.model';

@Component({
  selector: 'app-categ-fuga',
  template: `
    <div class="p-d-flex p-ai-center p-mt-1">
      <p-tag
        styleClass="p-mr-2"
        severity="warning"
        [value]="item"
        *ngFor="let item of tipos"
      ></p-tag>
    </div>
  `,
  styles: [],
})
export class CategFugaComponent implements OnInit {
  @Input() tipos!: TipoWeb[];
  constructor() {}

  ngOnInit(): void {}
}
