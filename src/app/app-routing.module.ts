import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { ExpItemComponent } from './exp-item/exp-item.component';
import { RecursosComponent } from './recursos/recursos.component';
import { TestingComponent } from './testing/testing.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component'
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ZDownloaderComponent } from './z-downloader/z-downloader.component';
import { ExpedientesListInactiveComponent } from './expedientes-list-inactive/expedientes-list-inactive.component';

import { PlannerCitasComponent } from './planner-citas/planner-citas.component';
import { PlannerAudienciasComponent } from './planner-audiencias/planner-audiencias.component';
import { TareoMensualComponent } from './tareo-mensual/tareo-mensual.component';
import { TareoDiarioUserComponent } from './tareo-diario-user/tareo-diario-user.component';
import { TareoDiarioComponent } from './tareo-diario/tareo-diario.component';
import { TareoDiarioGeneratorComponent } from './tareo-diario-generator/tareo-diario-generator.component';
import { TareoViewComponent } from './tareo-view/tareo-view.component';
import { TareoSupervisorComponent } from './tareo-supervisor/tareo-supervisor.component';
import { PlannerCuotasComponent } from './planner-cuotas/planner-cuotas.component';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { TareoEditNewComponent } from './tareo-edit-new/tareo-edit-new.component';
import { ResolucionesAdminComponent } from './resoluciones-admin/resoluciones-admin.component';
import { ResolucionesWorkerComponent } from './resoluciones-worker/resoluciones-worker.component';
import { AuthUsuariosComponent } from './auth-usuarios/auth-usuarios.component';
import { AuthUsuariosInactiveComponent } from './auth-usuarios-inactive/auth-usuarios-inactive.component';
import { AuthUsuarioComponent } from './auth-usuario/auth-usuario.component';
import { AppComponent } from './app.component';
import { authGuard, guestGuard } from './app.guard';
import { ZlayoutComponent } from './zlayout/zlayout.component';
import { AuthMiPerfilComponent } from './auth-mi-perfil/auth-mi-perfil.component';

const routes: Routes = [
  // ── Ruta raíz → redirige al login ───────────────────────
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ── Login — sin layout, sin guard ───────────────────────────
  {
    path: 'login',
    component: AuthLoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'logout',
    component: AuthLogoutComponent
  },
  {
    path: '',
    component: ZlayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin-rdt',
        component: TareoDiarioComponent,
        title: 'Admin RDT'
      },
      {
        path: 'colaborador-rdt',
        component: TareoDiarioUserComponent,
        title: 'Mi RDT'
      },
      {
        path: 'expediente-new',
        component: ExpedienteRegisterComponent,
      },
      {
        path: 'expediente/:numero',
        component: ExpItemComponent,
      },
      {
        path: 'rdt/:id',
        component: TareoViewComponent,
      },
      // {
      //   path: 'rdt-edit/:id',
      //   component: TareoEditComponent,
      // },
      {
        path: 'rdt-edit/:id',
        component: TareoEditNewComponent,
      },
      {
        path: 'rdt-generator',
        component: TareoDiarioGeneratorComponent,
      },
      {
        path: 'recursos',
        component: RecursosComponent
      },
      {
        path: 'audiencias',
        component: PlannerAudienciasComponent
      },
      {
        path: 'testing',
        component: TestingComponent
      },
      // {
      //   path: 'usuarios',
      //   component: UsersComponent
      // },
      {
        path: 'usuarios',
        component: AuthUsuariosComponent
      },
      {
        path: 'usuarios-cesados',
        component: AuthUsuariosInactiveComponent
      },
      // {
      //   path: 'usuario/:id',
      //   component: UserItemComponent
      // },
      {
        path: 'usuario/:id',
        component: AuthUsuarioComponent
      },
      {
        path: 'pagos-honorarios',
        component: PagosHonorariosComponent
      },
      {
        path: 'expedientes-updater',
        component: ExpedientesUpdaterComponent
      },
      {
        path: 'expedientes-listing',
        component: ExpedientesListComponent
      },
      {
        path: 'expedientes-depurados',
        component: ExpedientesListInactiveComponent
      },
      {
        path: 'sinoe-admin',
        // component: SinoeAdminComponent,
        component: ResolucionesAdminComponent,
      },
      {
        path: 'sinoe-worker',
        // component: SinoeWorkerComponent
        component: ResolucionesWorkerComponent
      },
      {
        path: 'sign-up',
        component: AuthSignupComponent
      },
      {
        path: 'downloader',
        component: ZDownloaderComponent
      },
      {
        path: 'citas',
        component: PlannerCitasComponent
      },
      {
        path: 'cuotas',
        component: PlannerCuotasComponent
      },
      {
        path: 'tareo-mensual',
        component: TareoMensualComponent
      },
      {
        path: 'tareo-supervisor',
        component: TareoSupervisorComponent
      },
      {
        path: 'plantillas',
        component: PlantillasComponent
      },
      {
        path: 'mi-perfil',
        component: AuthMiPerfilComponent
      },
    ]
  },

  // ── Wildcard — ruta no encontrada ────────────────────────────
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
