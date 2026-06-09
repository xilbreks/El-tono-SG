import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { ExpItemRoadmapComponent } from '../exp-item-roadmap/exp-item-roadmap.component';
import { RouterLink } from '@angular/router';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss'],
  imports: [
    ExpItemRoadmapComponent,
    RouterLink,
  ]
})
export class ExpItemCoverComponent implements OnChanges {
  appService = inject(AppService);
  storage = inject(Storage);

  @Input('expediente') expediente: Expediente | null = null;

  urlcontrato: string | null = null;
  cuadernos: Expediente[] = [];

  mostrarObservaciones = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.colocarLinkContrato();
      this.buscarCuadernos();
    }
  }

  async colocarLinkContrato() {
    if (!this.expediente?.idExpediente) return;

    try {
      const contratoRef = ref(this.storage, `contratos/${this.expediente.idExpediente}.pdf`);
      this.urlcontrato = await getDownloadURL(contratoRef);
    } catch (error) {
      console.error('Error al obtener la URL del contrato:', error);
      this.urlcontrato = null;
    }
  }

  async buscarCuadernos() {
    if (!this.expediente) return;

    const cuadernos = await this.appService.expedientesAsociados(this.expediente.numero);

    this.cuadernos = cuadernos;
  }

  toggleObservaciones() {
    this.mostrarObservaciones = !this.mostrarObservaciones;
  }

}
