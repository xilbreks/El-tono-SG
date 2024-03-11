import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpedienteRegisterComponent } from './expediente-register/expediente-register.component';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewComponent } from './rdt-view/rdt-view.component';
import { RdtEditComponent } from './rdt-edit/rdt-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RdtStatsComponent } from './rdt-stats/rdt-stats.component';
import { ExpedienteSearchComponent } from './expediente-search/expediente-search.component';
import { RdtGeneratorComponent } from './rdt-generator/rdt-generator.component';
import { ExpItemComponent } from './exp-item/exp-item.component';
import { RecursosComponent } from './recursos/recursos.component';
import { StatsGeneratorComponent } from './stats-generator/stats-generator.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { TestingComponent } from './testing/testing.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { PagosHonorariosComponent } from './pagos-honorarios/pagos-honorarios.component';
import { ExpedientesUpdaterComponent } from './expedientes-updater/expedientes-updater.component'
import { ExpedientesListComponent } from './expedientes-list/expedientes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SinoeAdminComponent } from './sinoe-admin/sinoe-admin.component';
import { SinoeWorkerComponent } from './sinoe-worker/sinoe-worker.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { autenticacionGuard } from './autenticacion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'expediente-new',
    component: ExpedienteRegisterComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'expediente-search',
    component: ExpedienteSearchComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'expediente/:id',
    component: ExpItemComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'admin-rdt',
    component: AdminRdtComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'colaborador-rdt',
    component: ColaboradorRdtComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'rdt/:id',
    component: RdtViewComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'rdt-edit/:id',
    component: RdtEditComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'rdt-generator',
    component: RdtGeneratorComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'recursos',
    component: RecursosComponent
  },
  {
    path: 'stats-rdt',
    component: RdtStatsComponent,
  },
  {
    path: 'stats-generator',
    component: StatsGeneratorComponent,
  },
  {
    path: 'asistencia',
    component: AsistenciaComponent
  },
  {
    path: 'testing',
    component: TestingComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'usuario/:id',
    component: UserItemComponent
  },
  {
    path: 'reporte-pagos',
    component: ReportePagosComponent
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
    path: 'expedientes-list2',
    component: ExpedientesListComponent
  },
  {
    path: 'sinoe-admin',
    component: SinoeAdminComponent
  },
  {
    path: 'sinoe-worker',
    component: SinoeWorkerComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
