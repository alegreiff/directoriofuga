import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sitio } from './web.model';

@Injectable({
  providedIn: 'root',
})
export class DbFirebaseService {
  constructor(private DB: AngularFirestore) {}

  creaSitio(sitio: Sitio) {
    return this.DB.collection('sitios').add(sitio);
  }

  editaSitio(id: string, sitio: Sitio) {
    return this.DB.collection('sitios').doc(id).update(sitio);
  }
}
