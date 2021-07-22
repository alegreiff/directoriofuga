import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  displayError = false;
  estadoUsuario: firebase.User | null = null;
  datostemporales!: any[];
  datosAuth!: Observable<firebase.auth.UserCredential>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.estado().subscribe((estado) => {
      this.estadoUsuario = estado;
    });

    this.auth.cargaFuentes().subscribe((res) => {
      this.datostemporales = res;
    });
  }
  gogol() {
    this.isLoading = true;
    this.datosAuth = this.auth.GoogleAuth();
    this.suscripcionAuth();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.datosAuth = this.auth.ingreso(email, password);
      this.suscripcionAuth();
    } else {
      this.datosAuth = this.auth.registro(email, password);
      this.suscripcionAuth();
    }

    form.reset();
  }

  suscripcionAuth() {
    this.datosAuth.subscribe(
      (res) => {
        console.log('INGRESSO', res);
        this.isLoading = false;
        this.auth.estado().subscribe((estado) => {
          this.estadoUsuario = estado;
        });
        this.router.navigate(['/directorio']);
      },
      (err) => {
        this.error = err;
        this.displayError = true;
        this.isLoading = false;
      }
    );
  }
}
