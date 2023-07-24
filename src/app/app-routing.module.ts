import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpedienteViewComponent } from './expediente-view/expediente-view.component';
import { ExpedienteEditComponent } from './expediente-edit/expediente-edit.component';
import { ExpedienteNewComponent } from './expediente-new/expediente-new.component';
import { AdminRdtComponent } from './admin-rdt/admin-rdt.component';
import { ColaboradorRdtComponent } from './colaborador-rdt/colaborador-rdt.component';
import { RdtViewOnlyComponent } from './rdt-view-only/rdt-view-only.component';
import { RdtViewEditComponent } from './rdt-view-edit/rdt-view-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StatsRdtComponent } from './stats-rdt/stats-rdt.component';
import { ExpedienteSearchComponent } from './expediente-search/expediente-search.component';

import { autenticacionGuard } from './autenticacion.guard';

const routes: Routes = [
  {
    path: 'expedientes',
    component: ExpedientesComponent
  },
  {
    path: 'expediente-new',
    component: ExpedienteNewComponent
  },
  {
    path: 'expediente-search',
    component: ExpedienteSearchComponent
  },
  {
    path: 'expediente/:id',
    component: ExpedienteViewComponent
  },
  {
    path: 'expediente-edit/:id',
    component: ExpedienteEditComponent
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
