import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { Tarea } from './../_interfaces/tarea';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-rdt',
  templateUrl: './exp-item-rdt.component.html',
  styleUrl: './exp-item-rdt.component.scss',
  imports: [

  ]
})
export class ExpItemRdtComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;

  lstTareas: Array<Tarea> = [];
  lhasmore: boolean = false;          // Cargar hasta 50 registros
  lHasEvenMore: boolean = false;     // Cargas desde el inicio
  lLoading: boolean = true;
  lLoadingMore = false;
  lLoadingEvenMore = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getTareas();
    }
  }

  // Recuperar primeras 16 tareas
  async getTareas() {
    if (!this.expediente) return;

    this.lLoading = true;
    const idExpediente = this.expediente.idExpediente;
    const tareas = await this.appService.tareasPorExpediente(idExpediente, 16);

    this.lstTareas = tareas;

    if (tareas.length > 15) {
      this.lhasmore = true;
    } else {
      this.lhasmore = false;
    }

    this.lLoading = false;
  }

  // Recuperar primeras 51 tareas
  async getMasTareas() {
    if (!this.expediente) return;

    this.lLoadingMore = true;
    const idExpediente = this.expediente.idExpediente;
    const tareas = await this.appService.tareasPorExpediente(idExpediente, 51);

    this.lstTareas = tareas;

    this.lhasmore = false;
    if (tareas.length > 50) {
      this.lHasEvenMore = true;
    }

    this.lLoadingMore = false;
  }

  // Recuperar todas las tareas
  async getTareasTodas() {
    if (!this.expediente) return;

    this.lLoadingEvenMore = true;
    const idExpediente = this.expediente.idExpediente;
    const tareas = await this.appService.tareasPorExpediente(idExpediente, 500);

    this.lstTareas = tareas;

    this.lHasEvenMore = false;

    this.lLoadingEvenMore = false;
  }
}
