import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// FIREBASE (Versión moderna modular v18)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

// Componentes Standalone (v18)
import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { RecursosComponent } from './recursos/recursos.component';
import { RecursosItersComponent } from './recursos-iters/recursos-iters.component';
import { RecursosTareasComponent } from './recursos-tareas/recursos-tareas.component';
import { TestingComponent } from './testing/testing.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component';
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
import { TareoMensualAdminComponent } from './tareo-mensual-admin/tareo-mensual-admin.component';
import { TareoDiarioAdminComponent } from './tareo-diario-admin/tareo-diario-admin.component';
import { TareoMensualUserComponent } from './tareo-mensual-user/tareo-mensual-user.component';
import { TareoDiarioGeneratorComponent } from './tareo-diario-generator/tareo-diario-generator.component';
import { TareoDiarioViewComponent } from './tareo-diario-view/tareo-diario-view.component';
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
import { TareoDiarioEditComponent } from './tareo-diario-edit/tareo-diario-edit.component';
import { ResolucionesAdminComponent } from './resoluciones-admin/resoluciones-admin.component';
import { ResolucionesWorkerComponent } from './resoluciones-worker/resoluciones-worker.component';
import { PlannerAudienciaItemComponent } from './planner-audiencia-item/planner-audiencia-item.component';
import { AuthUsuariosComponent } from './auth-usuarios/auth-usuarios.component';
import { AuthUsuarioComponent } from './auth-usuario/auth-usuario.component';
import { AuthUsuariosInactiveComponent } from './auth-usuarios-inactive/auth-usuarios-inactive.component';
import { ZlayoutComponent } from './zlayout/zlayout.component';
import { AuthMiPerfilComponent } from './auth-mi-perfil/auth-mi-perfil.component';
import { environment } from './../environments/environment';

// Librería de iconos
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapPerson,
  bootstrapPersonBadge,
  bootstrapFolder2,
  bootstrapFolder2Open,
  bootstrapGear,
  bootstrapPlusCircle,
  bootstrapFileEarmarkText,
  bootstrapPeople,
  bootstrapCalendarCheck,
  bootstrapCashStack,
  bootstrapFileEarmarkMedical,
  bootstrapShieldCheck,
  bootstrapNodePlus,
  bootstrapMailbox,
  bootstrapCalendar4Range,
  bootstrapExclamationCircle,
  bootstrapPersonCircle,
  bootstrapPersonVcard,
  bootstrapBoxArrowRight,
  bootstrapPencil,
  bootstrapTrash,
  bootstrapCircleFill,
  bootstrapCircle,
  bootstrapThreeDotsVertical,
  bootstrapFilter,
  bootstrapFileWordFill,
  bootstrapCupHot,
  bootstrapSearch,
  bootstrapCheckCircleFill,
  bootstrapLockFill,
  bootstrapUnlockFill,
  bootstrapSlashCircle,
  bootstrapFileEarmarkPdf,
  bootstrapLightning,
  bootstrapExclamationTriangle,
  bootstrapJournalText,
  bootstrapTelephone,
  bootstrapBox,
  bootstrapCapsulePill,
  bootstrapFloppyFill,
  bootstrapEnvelope,
  bootstrapShieldLock,
  bootstrapExclamationTriangleFill,
  bootstrapWrenchAdjustable,
  bootstrapPencilFill,
} from '@ng-icons/bootstrap-icons';

@NgModule({
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,

    // Componentes Standalone cargados correctamente en el módulo raíz
    TestingComponent,
    PlannerCitasComponent,
    PlannerAudienciasComponent,
    PlannerAudienciaItemComponent,
    AuthUsuariosComponent,
    AuthUsuarioComponent,
    AuthSignupComponent,
    AuthUsuariosInactiveComponent,
    AuthMiPerfilComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    NotFoundComponent,
    ExpedienteRegisterComponent,
    RecursosComponent,
    RecursosItersComponent,
    RecursosTareasComponent,
    PagosHonorariosComponent,
    ExpedientesUpdaterComponent,
    ExpedientesListComponent,
    ExpedientesListInactiveComponent,
    ZDownloaderComponent,
    PlannerCuotasComponent,
    PlantillasComponent,
    ResolucionesAdminComponent,
    ResolucionesWorkerComponent,
    ZlayoutComponent,
    TareoMensualAdminComponent,
    TareoDiarioAdminComponent,
    TareoMensualUserComponent,
    TareoDiarioGeneratorComponent,
    TareoDiarioViewComponent,
    TareoSupervisorComponent,
    TareoDiarioEditComponent,
    ExpItemRoadmapComponent,
    ExpItemCoverComponent,
    ExpItemSinoeComponent,
    ExpItemEditDataComponent,
    ExpItemEditStatusComponent,
    ExpItemApptComponent,
    ExpItemRdtComponent,
    ExpItemTrialComponent,
    ExpItemFilesComponent,
    ExpItemKComponent,
    ExpItemEvolutionComponent,
    ExpItemRecursosComponent,
    ExpItemEconAbonComponent,
    ExpItemEconAranComponent,
    ExpItemEconCuotComponent,
    ExpItemEconComponent,
    ExpItemComponent,
  ],
  providers: [
    AppService,
    provideHttpClient(withInterceptorsFromDi()),

    // Firebase para Angular 18
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),

    // Iconos
    provideIcons({
      bootstrapPerson,
      bootstrapPersonBadge,
      bootstrapFolder2,
      bootstrapFolder2Open,
      bootstrapGear,
      bootstrapPlusCircle,
      bootstrapFileEarmarkText,
      bootstrapPeople,
      bootstrapCalendarCheck,
      bootstrapCashStack,
      bootstrapFileEarmarkMedical,
      bootstrapShieldCheck,
      bootstrapNodePlus,
      bootstrapMailbox,
      bootstrapCalendar4Range,
      bootstrapExclamationCircle,
      bootstrapPersonCircle,
      bootstrapPersonVcard,
      bootstrapBoxArrowRight,
      bootstrapPencil,
      bootstrapTrash,
      bootstrapCircleFill,
      bootstrapCircle,
      bootstrapThreeDotsVertical,
      bootstrapFilter,
      bootstrapFileWordFill,
      bootstrapCupHot,
      bootstrapSearch,
      bootstrapCheckCircleFill,
      bootstrapLockFill,
      bootstrapUnlockFill,
      bootstrapSlashCircle,
      bootstrapFileEarmarkPdf,
      bootstrapLightning,
      bootstrapExclamationTriangle,
      bootstrapJournalText,
      bootstrapTelephone,
      bootstrapBox,
      bootstrapCapsulePill,
      bootstrapFloppyFill,
      bootstrapEnvelope,
      bootstrapShieldLock,
      bootstrapExclamationTriangleFill,
      bootstrapWrenchAdjustable,
      bootstrapPencilFill,
    })
  ]
})
export class AppModule { }