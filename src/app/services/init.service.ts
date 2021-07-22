import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Sitio } from './web.model';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private DB: AngularFirestore, private estado: StateService) {}
  cargaSitios() {
    return this.DB.collection('sitios')
      .snapshotChanges()
      .pipe(
        map((resultado) => {
          return resultado.map((doc) => {
            const data = doc.payload.doc.data() as Sitio;
            const id = doc.payload.doc.id;
            const tipomultiple = data.tipo?.length === 1 ? false : true;

            return { id, tipomultiple, ...data };
          });
        }),
        tap((res) => {
          this.estado.setSitio(res);
        })
      )
      .subscribe();
  }
}
