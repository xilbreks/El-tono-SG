import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss']
})
export class ExpItemCoverComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatear();
  }

  formatear(): void {
    switch (this.expediente?.idtipodoc) {
      case 'EXPEDIENTE-ORIGEN':
        this.expediente.idtipodoc = 'EXPEDIENTE';
        break;
      case 'CASACION-2DA-SALA':
        this.expediente.idtipodoc = 'CASACIÓN 2DA SALA';
        break;
      case 'CASACION-4TA-SALA':
        this.expediente.idtipodoc = 'CASACIÓN 4TA SALA';
        break;
      case 'CARPETA-FISCAL':
        this.expediente.idtipodoc = 'CARPETA FISCAL';
        break;
      case 'EXPEDIENTE-PROVISIONAL':
        this.expediente.idtipodoc = 'EXPEDIENTE PROVISIONAL';
        break;
      case 'EXPEDIENTE-CAUTELAR':
        this.expediente.idtipodoc = 'EXPEDIENTE CAUTELAR';
        break;
      case 'EXPEDIENTE-CURADURIA':
        this.expediente.idtipodoc = 'CURADURÍA';
        break;
    }
  }

}
