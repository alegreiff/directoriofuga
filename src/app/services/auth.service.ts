import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { from, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<IUser | null>();

  constructor(
    private afAuth: AngularFireAuth,
    private DB: AngularFirestore,
    private router: Router,
    private estadoSRV: StateService
  ) {}

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    //console.log('GOOGLEAUTH', 'AUTH LOGIN');
    const ingresogoogle = this.afAuth.signInWithPopup(provider);
    const salida = from(ingresogoogle).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(
          resData.user?.email ? resData.user?.email : undefined,
          resData.user?.displayName ? resData.user?.displayName : undefined,
          resData.user?.photoURL ? resData.user?.photoURL : undefined
        );
      })
    );
    return salida;
  }
  estado() {
    return this.afAuth.authState;
  }
  registro(email: string, password: string) {
    const registro = this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const salida = from(registro).pipe(
      catchError(this.handleError),
      tap((resData) => {
        const usuario: IUser = {
          correo: resData.user?.email ? resData.user?.email : 'NOMAIL',
          nombre: resData.additionalUserInfo?.username
            ? resData.additionalUserInfo?.username
            : 'NOUSER',
          photoURL: resData.user?.photoURL ? resData.user?.photoURL : 'NOFOTO',
        };
        //console.log('USER', usuario);
      })
    );
    return salida;
  }

  // Sign in with email/password
  ingreso(email: string, password: string) {
    const ingreso = this.afAuth.signInWithEmailAndPassword(email, password);
    const salida = from(ingreso).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(
          resData.user?.email ? resData.user?.email : undefined,
          resData.user?.displayName ? resData.user?.displayName : undefined,
          resData.user?.photoURL ? resData.user?.photoURL : undefined
        );
      })
    );

    return salida;
  }

  public handleAuthentication(
    email: string = 'NOMAIL',
    nombre: string = 'NOUSER',
    photoURL: string = 'NOFOTO'
  ) {
    const usuario: IUser = {
      correo: email,
      nombre: nombre,
      photoURL,
    };
    console.log('USR', usuario);
    this.estadoSRV.setUsuario(usuario);

    this.user.next(usuario);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.info('ELERR', errorRes);
    let errorMessage = 'Ha ocurrido un error';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.console.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'El correo ya etsiste';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Contraseña en la mierda';
    }
    return throwError(errorMessage);
  }

  cargaFuentes() {
    return this.DB.collection('fuentes')
      .snapshotChanges()
      .pipe(
        map((resultado) => {
          return resultado.map((doc) => {
            const data = doc.payload.doc.data() as any;
            const uid = doc.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.user.next(null);
      console.log('CLEAN USERE');
      this.estadoSRV.cleanUser();
      this.router.navigate(['/admin']);
    });
  }
}
