import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-comunicacion',
  imports: [],
  templateUrl: './exp-item-comunicacion.component.html',
  styleUrl: './exp-item-comunicacion.component.scss',
})
export class ExpItemComunicacionComponent implements OnChanges {
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
    const tareas = await this.appService.tareasPorExpedienteComunicacion(idExpediente, 16);

    this.lstTareas = tareas;

    // if (tareas.length > 15) {
    //   this.lhasmore = true;
    // } else {
    //   this.lhasmore = false;
    // }

    this.lLoading = false;
  }
}
