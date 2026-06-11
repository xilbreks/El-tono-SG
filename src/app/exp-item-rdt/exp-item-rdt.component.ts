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
  lhasmore: boolean = false;
  lLoading: boolean = true;
  lLoadingMore = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getTareas();
    }
  }

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

  async getTareasTodas() {
    if (!this.expediente) return;

    this.lLoadingMore = true;
    const idExpediente = this.expediente.idExpediente;
    const tareas = await this.appService.tareasPorExpediente(idExpediente, 50);

    this.lhasmore = false;
    this.lstTareas = tareas;
    this.lLoadingMore = false;
  }
}
