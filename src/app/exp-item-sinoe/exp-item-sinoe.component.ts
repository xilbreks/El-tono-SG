import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Expediente } from './../_interfaces/expediente';
import { Resolucion } from '../_interfaces/resolucion';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-sinoe',
  templateUrl: './exp-item-sinoe.component.html',
  styleUrl: './exp-item-sinoe.component.scss',
  imports: [
    NgbPopoverModule,
    NgIcon,
  ]
})
export class ExpItemSinoeComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;

  notificaciones: Resolucion[] = [];
  cargando: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.obtenerNotificaciones();
    }
  }

  async obtenerNotificaciones() {
    if (!this.expediente) return;
    this.cargando = true;
    
    const notificaciones = await this.appService.resolucionesPorExpediente(this.expediente.numero);
    this.notificaciones = notificaciones;
    
    this.cargando = false;
  }
}
