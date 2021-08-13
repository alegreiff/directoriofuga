import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlosarioService } from '../services/glosario.service';
import { IGlosario } from './glosario.model';

@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.component.html',
  styleUrls: ['./glosario.component.scss']
})
export class GlosarioComponent implements OnInit {
terminos$!: Observable<IGlosario[]>;
  constructor(
    private glosService: GlosarioService
  ) { }

  ngOnInit(): void {
    this.glosService.cargaGlosario().subscribe()
    this.terminos$ = this.glosService.cargaGlosario()
  }

}
