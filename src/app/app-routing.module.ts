import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpedienteEditComponent } from './expediente-edit/expediente-edit.component';
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
import { ExpedienteItemComponent } from './expediente-item/expediente-item.component';
import { SinoeComponent } from './sinoe/sinoe.component';
import { RecursosComponent } from './recursos/recursos.component';

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
    path: 'expedientes',
    component: ExpedientesComponent,
    canActivate: [autenticacionGuard]
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
    component: ExpedienteItemComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'expediente-edit/:id',
    component: ExpedienteEditComponent,
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
    path: 'sinoe',
    component: SinoeComponent
  },
  {
    path: 'recursos',
    component: RecursosComponent
  },
  {
    path: 'stats-rdt',
    component: RdtStatsComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: '**',
    component: ColaboradorRdtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
