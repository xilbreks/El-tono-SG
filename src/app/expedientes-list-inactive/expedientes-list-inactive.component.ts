import { Component } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-expedientes-list-inactive',
  templateUrl: './expedientes-list-inactive.component.html',
  styleUrl: './expedientes-list-inactive.component.scss'
})
export class ExpedientesListInactiveComponent {
  lLoading = false;

  lstExpedientes: Array<any> = [];
  lstExpedientesFiltered: Array<any> = [];

  constructor(
    private service: AppService,
  ) {
    this.obtenerExpedientes();
  }

  obtenerExpedientes() {
    this.lLoading = true;
    this.service.lstExpsDepurados.subscribe(res => {
      this.lstExpedientes = res.sort((a: any, b: any) => {
        if (a.sespecialidad > b.sespecialidad)
          return 1;
        else
          return -1;
      });
      this.lstExpedientesFiltered = this.lstExpedientes;

      this.lLoading = false;
    });
  }

  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    // if (sterms.length == 0) {
    //   this.lstExpedientesFiltered = [];
    //   return;
    // }

    this.lstExpedientesFiltered = this.lstExpedientes
      .filter(exp => {
        if (exp.idtipodoc == 'CASACION-2DA-SALA') {
          return false;
        } else if (exp.idtipodoc == 'CASACION-4TA-SALA') {
          return false;
        } else {
          return true;
        }
      })
      .filter(exp => {
        let lMatch = false;
        let nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sdemandado.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sdemandante.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.sexpediente.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.scodigo.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.smatchexp?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      }).slice(0, 7);

  }
}
