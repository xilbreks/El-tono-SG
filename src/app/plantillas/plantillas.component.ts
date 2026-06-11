import { Component, inject } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrl: './plantillas.component.scss',
})
export class PlantillasComponent {
  private storage: Storage = inject(Storage);

  urlPlantilla1: string | null = null;
  urlPlantilla2: string | null = null;

  cargando1: boolean = false;
  cargando2: boolean = false;

  constructor() { }

  async getDownloadLinkContrato1() {
    this.cargando1 = true;
    try {
      const fileRef = ref(this.storage, 'plantillas/contrato-desnaturalizacion.docx');

      this.urlPlantilla1 = await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error al obtener la plantilla 1:', error);
    } finally {
      this.cargando1 = false;
    }
  }

  async getDownloadLinkContrato2() {
    this.cargando2 = true;
    try {
      const fileRef = ref(this.storage, 'plantillas/contrato-convenio.docx');

      this.urlPlantilla2 = await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error al obtener la plantilla 2:', error);
    } finally {
      this.cargando2 = false;
    }
  }
}