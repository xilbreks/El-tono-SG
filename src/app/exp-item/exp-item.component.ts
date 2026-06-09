import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Expediente } from './../_interfaces/expediente';
import { ExpItemCoverComponent } from '../exp-item-cover/exp-item-cover.component';
import { ExpItemRdtComponent } from '../exp-item-rdt/exp-item-rdt.component';
import { ExpItemSinoeComponent } from '../exp-item-sinoe/exp-item-sinoe.component';
import { ExpItemEconComponent } from '../exp-item-econ/exp-item-econ.component';
import { ExpItemApptComponent } from '../exp-item-appt/exp-item-appt.component';
import { ExpItemTrialComponent } from '../exp-item-trial/exp-item-trial.component';
import { ExpItemKComponent } from '../exp-item-k/exp-item-k.component';
import { ExpItemFilesComponent } from '../exp-item-files/exp-item-files.component';
import { ExpItemRecursosComponent } from '../exp-item-recursos/exp-item-recursos.component';
import { ExpItemEditDataComponent } from '../exp-item-edit-data/exp-item-edit-data.component';
import { ExpItemEvolutionComponent } from '../exp-item-evolution/exp-item-evolution.component';
import { ExpItemEditStatusComponent } from '../exp-item-edit-status/exp-item-edit-status.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.scss'],
  imports: [
    ExpItemCoverComponent,
    ExpItemRdtComponent,
    ExpItemSinoeComponent,
    ExpItemEconComponent,
    ExpItemApptComponent,
    ExpItemTrialComponent,
    ExpItemKComponent,
    ExpItemFilesComponent,
    ExpItemRecursosComponent,
    ExpItemEditDataComponent,
    ExpItemEvolutionComponent,
    ExpItemEditStatusComponent,
  ]
})
export class ExpItemComponent implements OnInit {
  appService = inject(AppService);

  expediente: Expediente | null = null;
  lLoading: boolean = true;

  nick: string | null = null;
  rol: string | null = null;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    this.nick = localStorage.getItem('nick');
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let numeroExpediente = params['numero'];
      this.titleService.setTitle(numeroExpediente);

      this.buscarExpediente(numeroExpediente);
    });
  }

  buscarExpediente(sexpediente: string) {
    // Indicador de carga
    this.lLoading = true;

    // Consultar a la Base de datos por el expediente
    let p1 = this.appService.expedientePorNumero(sexpediente);
    let p2 = this.appService.expedientePorNumeroProvisional(sexpediente);
    Promise.all([p1, p2]).then((res: any) => {
      if (res[0].length > 0) {
        this.expediente = res[0][0];
        // Indicador de carga
        this.lLoading = false;
      } else if (res[1].length > 0) {
        this.expediente = res[1][0];
        // Indicador de carga
        this.lLoading = false;
      } else {
        console.log('No lo encontré')
        this.lLoading = false;
        this.expediente = null;
        // Indicador de carga
        this.lLoading = false;
      }
    });
  }

}
