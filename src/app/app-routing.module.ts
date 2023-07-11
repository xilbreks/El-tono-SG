import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewOnlyComponent } from './rdt-view-only/rdt-view-only.component';
import { RdtViewEditComponent } from './rdt-view-edit/rdt-view-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StatsRdtComponent } from './stats-rdt/stats-rdt.component';

import { autenticacionGuard } from './autenticacion.guard';

const routes: Routes = [
  {
    path: 'expedientes',
    component: ExpedientesComponent
  },
  {
    path: 'expediente/:id',
    component: ExpedienteComponent
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
    component: RdtViewOnlyComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'rdt-edit/:id',
    component: RdtViewEditComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: 'stats-rdt',
    component: StatsRdtComponent,
    canActivate: [autenticacionGuard]
  },
  {
    path: '',
    redirectTo: 'colaborador-rdt',
    pathMatch: 'full'
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
