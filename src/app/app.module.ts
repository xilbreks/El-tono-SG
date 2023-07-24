import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewOnlyComponent } from './rdt-view-only/rdt-view-only.component';
import { RdtViewEditComponent } from './rdt-view-edit/rdt-view-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StatsRdtComponent } from './stats-rdt/stats-rdt.component';
import { ExpedienteViewComponent } from './expediente-view/expediente-view.component';
import { ExpedienteEditComponent } from './expediente-edit/expediente-edit.component';
import { ExpedienteNewComponent } from './expediente-new/expediente-new.component';
import { ExpedienteSearchComponent } from './expediente-search/expediente-search.component';

const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBW8YhaHNOOBCB-FMYkoZ4OoL5OwhLqgo4',
    authDomain: 'expedientes-guillen.firebaseapp.com',
    projectId: 'expedientes-guillen',
    storageBucket: 'expedientes-guillen.appspot.com',
    messagingSenderId: '1093881940766',
    appId: '1:1093881940766:web:f92a758b8b65856aec570f',
    measurementId: 'G-2D04DF7DNM',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ExpedientesComponent,
    AdminRdtComponent,
    ColaboradorRdtComponent,
    RdtViewOnlyComponent,
    RdtViewEditComponent,
    LoginComponent,
    LogoutComponent,
    StatsRdtComponent,
    ExpedienteViewComponent,
    ExpedienteEditComponent,
    ExpedienteNewComponent,
    ExpedienteSearchComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
