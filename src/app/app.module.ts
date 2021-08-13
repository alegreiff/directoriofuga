import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


//FIREBASE
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ModulosprimeModule } from './modulosprime/modulosprime.module';
import { DataService } from './services/data.service';
import { InitService } from './services/init.service';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

export function inicializarSitios(appInitService: InitService) {
  return () => appInitService.cargaSitios();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulosprimeModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, { delay: 1111 }),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    GoogleSheetsDbService,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: inicializarSitios,
      deps: [InitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
