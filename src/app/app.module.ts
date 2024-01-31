import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewComponent } from './rdt-view/rdt-view.component';
import { RdtEditComponent } from './rdt-edit/rdt-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RdtStatsComponent } from './rdt-stats/rdt-stats.component';
import { ExpedienteEditComponent } from './expediente-edit/expediente-edit.component';
import { ExpedienteSearchComponent } from './expediente-search/expediente-search.component';
import { RdtGeneratorComponent } from './rdt-generator/rdt-generator.component';
import { ExpedienteItemComponent } from './expediente-item/expediente-item.component';
import { ExpedienteItemCoverComponent } from './expediente-item-cover/expediente-item-cover.component';
import { ExpedienteItemContractComponent } from './expediente-item-contract/expediente-item-contract.component';
import { ExpedienteItemPaymentComponent } from './expediente-item-payment/expediente-item-payment.component';
import { ExpedienteItemTasksComponent } from './expediente-item-tasks/expediente-item-tasks.component';
import { ExpedienteItemClientComponent } from './expediente-item-client/expediente-item-client.component';
import { ExpedienteItemCallsComponent } from './expediente-item-calls/expediente-item-calls.component';
import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { RecursosComponent } from './recursos/recursos.component';
import { RecursosItersComponent } from './recursos-iters/recursos-iters.component';
import { RecursosTareasComponent } from './recursos-tareas/recursos-tareas.component';
import { StatsGeneratorComponent } from './stats-generator/stats-generator.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { TestingComponent } from './testing/testing.component';
import { ExpUpdaterComponent } from './exp-updater/exp-updater.component';
import { ExpedienteItemSinoeComponent } from './expediente-item-sinoe/expediente-item-sinoe.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component';
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExpedienteItemObsComponent } from './expediente-item-obs/expediente-item-obs.component';
import { SinoeWorkerComponent } from './sinoe-worker/sinoe-worker.component';
import { SinoeAdminComponent } from './sinoe-admin/sinoe-admin.component';


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
    AdminRdtComponent,
    ColaboradorRdtComponent,
    RdtViewComponent,
    RdtEditComponent,
    LoginComponent,
    LogoutComponent,
    RdtStatsComponent,
    ExpedienteEditComponent,
    ExpedienteSearchComponent,
    RdtGeneratorComponent,
    ExpedienteItemComponent,
    ExpedienteItemCoverComponent,
    ExpedienteItemContractComponent,
    ExpedienteItemPaymentComponent,
    ExpedienteItemTasksComponent,
    ExpedienteItemClientComponent,
    ExpedienteItemCallsComponent,
    ExpedienteRegisterComponent,
    RecursosComponent,
    RecursosItersComponent,
    RecursosTareasComponent,
    StatsGeneratorComponent,
    AsistenciaComponent,
    TestingComponent,
    ExpUpdaterComponent,
    ExpedienteItemSinoeComponent,
    UsersComponent,
    UserItemComponent,
    ReportePagosComponent,
    PagosHonorariosComponent,
    ExpedientesUpdaterComponent,
    ExpedientesListComponent,
    NotFoundComponent,
    ExpedienteItemObsComponent,
    SinoeWorkerComponent,
    SinoeAdminComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
