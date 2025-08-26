import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrl: './plantillas.component.scss'
})
export class PlantillasComponent {
  urlPlantilla1: string | null = null;
  urlPlantilla2: string | null = null;

  cargando1: boolean = false;
  cargando2: boolean = false;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  getDownloadLinkContrato1() {
    this.cargando1 = true;
    this.storage.ref(`plantillas/contrato-desnaturalizacion.docx`)
      .getDownloadURL().subscribe(url => {
        this.urlPlantilla1 = url;
        this.cargando1 = false;
      });
  }

  getDownloadLinkContrato2() {
    this.cargando2 = true;
    this.storage.ref(`plantillas/contrato-convenio.docx`)
      .getDownloadURL().subscribe(url => {
        this.urlPlantilla2 = url;
        this.cargando2 = false;
      });
  }
}
