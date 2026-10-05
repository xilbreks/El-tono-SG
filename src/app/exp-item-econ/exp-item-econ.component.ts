import { Component, inject, Input, OnInit } from '@angular/core';

import { Expediente } from '../_interfaces/expediente';
import { ExpItemEconCuotComponent } from '../exp-item-econ-cuot/exp-item-econ-cuot.component';
import { ExpItemEconAranComponent } from '../exp-item-econ-aran/exp-item-econ-aran.component';
import { ExpItemEconAbonComponent } from '../exp-item-econ-abon/exp-item-econ-abon.component';
import { Log } from '../_interfaces/log';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-econ',
  templateUrl: './exp-item-econ.component.html',
  styleUrl: './exp-item-econ.component.scss',
  imports: [
    ExpItemEconCuotComponent,
    ExpItemEconAranComponent,
    ExpItemEconAbonComponent,
  ]
})
export class ExpItemEconComponent implements OnInit {
  @Input('expediente') expediente: Expediente | null = null;

  appService = inject(AppService);
  logAuditoria: Log[] = [];

  nick: string | null = null;
  cargandoLog = false;

  constructor() { }

  ngOnInit(): void {
    this.nick = localStorage.getItem('nick');
  }

  async cargarLogAuditoria() {
    if (!this.expediente) return;

    this.cargandoLog = true;
    this.logAuditoria = await this.appService.logAuditoriaPorExpediente(this.expediente.idExpediente, 15);

    if (this.logAuditoria.length == 0) {
      this.logAuditoria.push({
        idLog: '-',
        idExpediente: '-',
        modulo: '-',
        coleccion: '-',
        idDocumento: '-',
        nombreUsuario: '-',
        tipoAccion: '-',
        descripcion: 'Sin registros aún.',
        fechaCreacion: '-'
      })
    }

    this.cargandoLog = false;
  }

}
