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
import { AppService } from './app.service';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewComponent } from './rdt-view/rdt-view.component';
import { RdtEditComponent } from './rdt-edit/rdt-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RdtStatsComponent } from './rdt-stats/rdt-stats.component';
import { ExpedienteSearchComponent } from './expediente-search/expediente-search.component';
import { RdtGeneratorComponent } from './rdt-generator/rdt-generator.component';
import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { RecursosComponent } from './recursos/recursos.component';
import { RecursosItersComponent } from './recursos-iters/recursos-iters.component';
import { RecursosTareasComponent } from './recursos-tareas/recursos-tareas.component';
import { StatsGeneratorComponent } from './stats-generator/stats-generator.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { TestingComponent } from './testing/testing.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component';
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SinoeWorkerComponent } from './sinoe-worker/sinoe-worker.component';
import { SinoeAdminComponent } from './sinoe-admin/sinoe-admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpItemComponent } from './exp-item/exp-item.component';
import { ExpItemCoverComponent } from './exp-item-cover/exp-item-cover.component';
import { ExpItemEditCodeComponent } from './exp-item-edit-code/exp-item-edit-code.component';
import { ExpItemEditDataComponent } from './exp-item-edit-data/exp-item-edit-data.component';
import { ExpItemEditMatchComponent } from './exp-item-edit-match/exp-item-edit-match.component';
import { ExpItemEditStatusComponent } from './exp-item-edit-status/exp-item-edit-status.component';
import { ExpItemObsComponent } from './exp-item-obs/exp-item-obs.component';
import { ExpItemFeesComponent } from './exp-item-fees/exp-item-fees.component';

import { ZDownloaderComponent } from './z-downloader/z-downloader.component';
import { ExpedientesListInactiveComponent } from './expedientes-list-inactive/expedientes-list-inactive.component';
import { InfComunicacionComponent } from './inf-comunicacion/inf-comunicacion.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ExpItemApptComponent } from './exp-item-appt/exp-item-appt.component';
import { DemandasComponent } from './demandas/demandas.component';
import { ExpItemRdtComponent } from './exp-item-rdt/exp-item-rdt.component';
import { ExpItemTrialComponent } from './exp-item-trial/exp-item-trial.component';
import { ExpItemCallsComponent } from './exp-item-calls/exp-item-calls.component';
import { TrialsComponent } from './trials/trials.component';
import { ExpItemFilesComponent } from './exp-item-files/exp-item-files.component';
import { ExpItemKComponent } from './exp-item-k/exp-item-k.component';
import { ExpItemEvolutionComponent } from './exp-item-evolution/exp-item-evolution.component';
import { PlannerCobranzasComponent } from './planner-cobranzas/planner-cobranzas.component';
import { PlannerAudienciasComponent } from './planner-audiencias/planner-audiencias.component';
import { PlannerDemandasComponent } from './planner-demandas/planner-demandas.component';
import { PlannerCitasComponent } from './planner-citas/planner-citas.component';
import { ExpItemRecursosComponent } from './exp-item-recursos/exp-item-recursos.component';

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
    ExpedienteSearchComponent,
    RdtGeneratorComponent,
    ExpedienteRegisterComponent,
    RecursosComponent,
    RecursosItersComponent,
    RecursosTareasComponent,
    StatsGeneratorComponent,
    AsistenciaComponent,
    TestingComponent,
    UsersComponent,
    UserItemComponent,
    ReportePagosComponent,
    PagosHonorariosComponent,
    ExpedientesUpdaterComponent,
    ExpedientesListComponent,
    NotFoundComponent,
    SinoeWorkerComponent,
    SinoeAdminComponent,
    SignUpComponent,
    ExpItemComponent,
    ExpItemCoverComponent,
    ExpItemEditCodeComponent,
    ExpItemEditDataComponent,
    ExpItemEditMatchComponent,
    ExpItemEditStatusComponent,
    ExpItemObsComponent,
    ExpItemFeesComponent,
    ZDownloaderComponent,
    ExpedientesListInactiveComponent,
    InfComunicacionComponent,
    AppointmentsComponent,
    ExpItemApptComponent,
    DemandasComponent,
    ExpItemRdtComponent,
    ExpItemTrialComponent,
    ExpItemCallsComponent,
    TrialsComponent,
    ExpItemFilesComponent,
    ExpItemKComponent,
    ExpItemEvolutionComponent,
    PlannerCobranzasComponent,
    PlannerAudienciasComponent,
    PlannerDemandasComponent,
    PlannerCitasComponent,
    ExpItemRecursosComponent,
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
  providers: [
    AppService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
