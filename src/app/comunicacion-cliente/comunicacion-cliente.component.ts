import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Tarea } from '../_interfaces/tarea';

@Component({
  selector: 'app-comunicacion-cliente',
  imports: [],
  templateUrl: './comunicacion-cliente.component.html',
  styleUrl: './comunicacion-cliente.component.scss',
})
export class ComunicacionClienteComponent implements OnInit {
  appService = inject(AppService);
  
  lstTareas: Array<Tarea> = [];
  lLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.getTareas();
  }
  
  async getTareas() {
    this.lLoading = true;
    const tareas = await this.appService.tareasPorComunicacionSemana();

    this.lstTareas = tareas;

    // if (tareas.length > 15) {
    //   this.lhasmore = true;
    // } else {
    //   this.lhasmore = false;
    // }

    this.lLoading = false;
  }
}
