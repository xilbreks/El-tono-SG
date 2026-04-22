import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// Importaciones FIREBASE COMPAT
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Importaciones FIREBASE modernas v18
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { RecursosComponent } from './recursos/recursos.component';
import { RecursosItersComponent } from './recursos-iters/recursos-iters.component';
import { RecursosTareasComponent } from './recursos-tareas/recursos-tareas.component';
import { TestingComponent } from './testing/testing.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './user-item/user-item.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component';
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SinoeWorkerComponent } from './sinoe-worker/sinoe-worker.component';
import { SinoeAdminComponent } from './sinoe-admin/sinoe-admin.component';
import { ExpItemComponent } from './exp-item/exp-item.component';
import { ExpItemCoverComponent } from './exp-item-cover/exp-item-cover.component';
import { ExpItemEditDataComponent } from './exp-item-edit-data/exp-item-edit-data.component';
import { ExpItemEditStatusComponent } from './exp-item-edit-status/exp-item-edit-status.component';

import { ZDownloaderComponent } from './z-downloader/z-downloader.component';
import { ExpedientesListInactiveComponent } from './expedientes-list-inactive/expedientes-list-inactive.component';
import { ExpItemApptComponent } from './exp-item-appt/exp-item-appt.component';
import { ExpItemRdtComponent } from './exp-item-rdt/exp-item-rdt.component';
import { ExpItemTrialComponent } from './exp-item-trial/exp-item-trial.component';
import { ExpItemFilesComponent } from './exp-item-files/exp-item-files.component';
import { ExpItemKComponent } from './exp-item-k/exp-item-k.component';
import { ExpItemEvolutionComponent } from './exp-item-evolution/exp-item-evolution.component';
import { PlannerAudienciasComponent } from './planner-audiencias/planner-audiencias.component';
import { PlannerCitasComponent } from './planner-citas/planner-citas.component';
import { ExpItemRecursosComponent } from './exp-item-recursos/exp-item-recursos.component';
import { TareoMensualComponent } from './tareo-mensual/tareo-mensual.component';
import { TareoDiarioComponent } from './tareo-diario/tareo-diario.component';
import { TareoDiarioUserComponent } from './tareo-diario-user/tareo-diario-user.component';
import { TareoDiarioGeneratorComponent } from './tareo-diario-generator/tareo-diario-generator.component';
import { TareoViewComponent } from './tareo-view/tareo-view.component';
import { TareoSupervisorComponent } from './tareo-supervisor/tareo-supervisor.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ExpItemEconAbonComponent } from './exp-item-econ-abon/exp-item-econ-abon.component';
import { ExpItemEconAranComponent } from './exp-item-econ-aran/exp-item-econ-aran.component';
import { ExpItemEconCuotComponent } from './exp-item-econ-cuot/exp-item-econ-cuot.component';
import { ExpItemEconComponent } from './exp-item-econ/exp-item-econ.component';
import { PlannerCuotasComponent } from './planner-cuotas/planner-cuotas.component';
import { ExpItemSinoeComponent } from './exp-item-sinoe/exp-item-sinoe.component';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { ExpItemRoadmapComponent } from './exp-item-roadmap/exp-item-roadmap.component';
import { TareoEditNewComponent } from './tareo-edit-new/tareo-edit-new.component';
import { ResolucionesAdminComponent } from './resoluciones-admin/resoluciones-admin.component';
import { ResolucionesWorkerComponent } from './resoluciones-worker/resoluciones-worker.component';

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
    ExpedienteRegisterComponent,
    RecursosComponent,
    RecursosItersComponent,
    RecursosTareasComponent,
    UsersComponent,
    UserItemComponent,
    PagosHonorariosComponent,
    ExpedientesUpdaterComponent,
    ExpedientesListComponent,
    NotFoundComponent,
    SinoeWorkerComponent,
    SinoeAdminComponent,
    ExpItemComponent,
    ExpItemCoverComponent,
    ExpItemEditDataComponent,
    ExpItemEditStatusComponent,
    ZDownloaderComponent,
    ExpedientesListInactiveComponent,
    ExpItemApptComponent,
    ExpItemRdtComponent,
    ExpItemTrialComponent,
    ExpItemFilesComponent,
    ExpItemKComponent,
    ExpItemEvolutionComponent,
    PlannerAudienciasComponent,
    PlannerCitasComponent,
    ExpItemRecursosComponent,
    TareoMensualComponent,
    TareoDiarioComponent,
    TareoDiarioUserComponent,
    TareoDiarioGeneratorComponent,
    TareoViewComponent,
    TareoSupervisorComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    AuthSignupComponent,
    ExpItemEconAbonComponent,
    ExpItemEconAranComponent,
    ExpItemEconCuotComponent,
    ExpItemEconComponent,
    PlannerCuotasComponent,
    ExpItemSinoeComponent,
    PlantillasComponent,
    ExpItemRoadmapComponent,
    TareoEditNewComponent,
    ResolucionesAdminComponent,
    ResolucionesWorkerComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    // v18
    TestingComponent,
  ],
  providers: [
    AppService,
    provideHttpClient(withInterceptorsFromDi()),
    // v18
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ]
})
export class AppModule { }
