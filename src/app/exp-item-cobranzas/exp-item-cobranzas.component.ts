import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-cobranzas',
  imports: [],
  templateUrl: './exp-item-cobranzas.component.html',
  styleUrl: './exp-item-cobranzas.component.scss',
})
export class ExpItemCobranzasComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;

  lstTareas: Array<Tarea> = [];
  lLoading: boolean = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getTareas();
    }
  }

  // Recuperar ultimas 16 tareas
  async getTareas() {
    if (!this.expediente) return;

    this.lLoading = true;
    const idExpediente = this.expediente.idExpediente;
    const tareas = await this.appService.tareasPorExpedienteCobranza(idExpediente, 16);

    this.lstTareas = tareas;

    // if (tareas.length > 15) {
    //   this.lhasmore = true;
    // } else {
    //   this.lhasmore = false;
    // }

    this.lLoading = false;
  }
}
