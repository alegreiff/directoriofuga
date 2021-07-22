import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss'],
})
export class MenuSuperiorComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.auth.estado().subscribe((user) => {
      if (user) {
        this.auth.handleAuthentication(
          user?.email ? user?.email : undefined,
          user?.displayName ? user?.displayName : undefined,
          user?.photoURL ? user?.photoURL : undefined
        );
      }

      this.isAuthenticated = !user ? false : true;
      this.creaMenu();
    });
  }
  creaMenu() {
    if (this.isAuthenticated) {
      this.items = [
        /* {
          label: 'Inicio',
          routerLink: '/',
        }, */
        {
          label: 'Ciudadanos',
          icon: 'pi pi-briefcase',
          routerLink: 'directorio',
        },
        {
          label: 'Actores',
          icon: 'pi pi-cog',
          routerLink: 'formacion',
        },
        {
          label: 'Directorio Institucional',
          icon: 'pi pi-th-large',
          routerLink: 'institucional',
        },
        {
          label: 'TODOS',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'todos',
        },

        {
          label: 'Crear sitio en el directorio',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'directorio/nuevo',
        },
      ];
    } else {
      this.items = [
        /* {
          label: 'Inicio',
          icon: 'pi pi-home',
          routerLink: '/',
        }, */
        {
          label: 'Ciudadanos',
          icon: 'pi pi-briefcase',
          routerLink: 'directorio',
        },
        {
          label: 'Actores',
          icon: 'pi pi-cog',
          routerLink: 'formacion',
        },
        {
          label: 'Directorio Institucional',
          icon: 'pi pi-th-large',
          routerLink: 'institucional',
        },
      ];
    }
  }
  salir() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
