import { Injectable } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { map } from 'rxjs/operators';
import { IGlosario } from '../glosario/glosario.model';

@Injectable({
  providedIn: 'root'
})
export class GlosarioService {


  private googleSheetId = "1NxPi7xrsIvSK5w_D5VTsjI_pMNmD_WDJMA_vma48s0s"
  

  recibeGlosario = {
    id: 'id',
    tipo: 'tipo',
    termino: 'termino', 
    acronimo: 'acronimo', 
    terminoen: 'terminoen', 
    describe1: 'describe1', 
    fuente1: 'fuente1', 
    describe2: 'describe1', 
    fuente2: 'fuente2',
    describe3: 'describe1', 
    fuente3: 'fuente3', 
    notas: 'notas',
  }

  constructor(
    private GoogleDB: GoogleSheetsDbService
  ) { }

  cargaGlosario(){
    return this.GoogleDB.get<IGlosario>(this.googleSheetId, 1, this.recibeGlosario).pipe(
      map(res => res.map( termino =>({
        ...termino, 

      }) ))
    )
  }

}
