import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { ExpItemRoadmapComponent } from '../exp-item-roadmap/exp-item-roadmap.component';
import { RouterLink } from '@angular/router';
import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss'],
  imports: [
    ExpItemRoadmapComponent,
    RouterLink,
    NgIcon,
  ]
})
export class ExpItemCoverComponent implements OnChanges, OnDestroy {
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

  ngOnDestroy(): void {
    if (this.urlcontrato) {
      URL.revokeObjectURL(this.urlcontrato);
    }
  }

  async colocarLinkContrato() {
    if (!this.expediente) return;
    if (!this.expediente.tieneContrato) return;

    try {
      // Obtener el contrato y adendas del expediente
      const carpetaRef = ref(this.storage, `contratos/${this.expediente.idExpediente}`);
      const listaResultados = await listAll(carpetaRef);

      // Validar si la carpeta está vacía o no tiene elementos
      if (!listaResultados.items || listaResultados.items.length === 0) {
        this.urlcontrato = null;
        return;
      }

      const urlsContratos: string[] = [];
      for (const itemRef of listaResultados.items) {
        const url = await getDownloadURL(itemRef);
        urlsContratos.push(url);
      }

      // Generar un solo link para todos los pdf's encontrados
      const pdfDocFinal = await PDFDocument.create();
      for (const url of urlsContratos) {
        const response = await fetch(url);
        const pdfBytes = await response.arrayBuffer();
        const pdfSubDoc = await PDFDocument.load(pdfBytes);
        const paginasCopiadas = await pdfDocFinal.copyPages(pdfSubDoc, pdfSubDoc.getPageIndices());
        paginasCopiadas.forEach((pagina) => pdfDocFinal.addPage(pagina));
      }
      const pdfFinalBytes = await pdfDocFinal.save();
      const blob = new Blob([pdfFinalBytes as any], { type: 'application/pdf' });

      const urlUnica = URL.createObjectURL(blob);

      this.urlcontrato = urlUnica;
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
