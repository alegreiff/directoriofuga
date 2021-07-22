import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { Sitio } from 'src/app/services/web.model';

@Component({
  selector: 'app-directorio-single',
  templateUrl: './directorio-single.component.html',
  styleUrls: ['./directorio-single.component.scss'],
})
export class DirectorioSingleComponent implements OnInit, OnDestroy {
  storeSub: Subscription | null = null;
  //@Input() sitioid!: string | undefined;

  @Input() set sitioid(value: string) {
    this._sitioid = value;

    this.storeSub = this.estado.stateChanged.subscribe((estado) => {
      if (estado) {
        const sitioweb = estado.sitios.find((web) => web.id === value);
        if (sitioweb) {
          this.sitio = sitioweb;
        } else {
          this.router.navigate(['/directorio']);
        }
      }
    });
  }
  get sitioid(): string {
    return this._sitioid;
  }
  private _sitioid: string = '';

  constructor(
    private route: ActivatedRoute,
    private estado: StateService,
    private router: Router
  ) {}

  sitio!: Sitio;

  ngOnInit(): void {
    let id: string;
    if (!this.sitioid) {
      id = this.route.snapshot.params.id;
    } else {
      id = this.sitioid;
      console.log('Les marevioesa');
    }

    this.storeSub = this.estado.stateChanged.subscribe((estado) => {
      if (estado) {
        const sitioweb = estado.sitios.find((web) => web.id === id);
        if (sitioweb) {
          this.sitio = sitioweb;
        } else {
          this.router.navigate(['/directorio']);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
