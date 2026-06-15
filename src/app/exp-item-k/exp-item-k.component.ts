import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expediente } from './../_interfaces/expediente';
import { DecimalPipe } from '@angular/common';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-k',
  templateUrl: './exp-item-k.component.html',
  styleUrl: './exp-item-k.component.scss',
  imports: [
    DecimalPipe,
    NgIcon,
  ]
})
export class ExpItemKComponent implements OnChanges {
  appService = inject(AppService);
  storage = inject(Storage);
  @Input('expediente') expediente: Expediente | null = null;

  lcontrato: boolean = false;
  urlcontrato: string = '';
  lUpdating = false;
  file: File | null = null;
  uploadProgress = -1;

  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.lcontrato = this.expediente.tieneContrato;

      if (this.lcontrato) {
        this.getUrlDescarga();
      }
    }
  }

  /**
   * Obtiene la url de descarga del contrato
   */
  async getUrlDescarga() {
    if (!this.expediente) return;
    if (!this.expediente.tieneContrato) return;

    try {
      const contratoRef = ref(this.storage, `contratos/${this.expediente.idExpediente}.pdf`);
      this.urlcontrato = await getDownloadURL(contratoRef);
    } catch (error) {
      console.error('Error al obtener la URL del contrato:', error);
      this.urlcontrato = '';
    }
  }

  openModalSetTerms(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  /**
   * Quita el contrato del expediente
   */
  async marcarSinContrato() {
    if (!this.expediente) return;
    this.lUpdating = true;

    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, {
      tieneContrato: false,
    })

    this.lcontrato = false;
    this.urlcontrato = '';
    this.expediente.tieneContrato = false;
    this.modalService.dismissAll();

    this.lUpdating = false;
  }

  /**
   * Sube el contrato del expediente
   */
  async marcarContrato() {
    if (!this.expediente) return;
    this.lUpdating = true;

    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, {
      tieneContrato: true,
    })

    this.lcontrato = true;
    this.getUrlDescarga();
    this.expediente.tieneContrato = true;
    this.modalService.dismissAll();

    this.lUpdating = false;
  }

  /**
   * Comprueba el tipo de archivo seleccionado
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      // Validar que el archivo sea un PDF
      if (selectedFile.type === 'application/pdf') {
        this.file = selectedFile;
      } else {
        alert('Por favor, selecciona un archivo en formato PDF.');
        this.file = null; // Reiniciar si no es válido
      }
    } else {
      this.file = null;
    }
  }

  /**
   * Guarda en el servidor el archivo seleccionado
   */
  uploadFile() {
    if (!this.file) return;
    this.lUpdating = true;

    const filePath = `contratos/${this.expediente?.idExpediente}.pdf`;
    const storageRef = ref(this.storage, filePath);
    const task = uploadBytesResumable(storageRef, this.file);

    // Monitorea el progreso y obtén la URL al finalizar
    task.on('state_changed',
      (snapshot) => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error('Error al subir archivo:', error);
        this.lUpdating = false;
        this.uploadProgress = -1;
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        console.log('Archivo subido con éxito. URL:', url);
        this.marcarContrato();
        this.uploadProgress = -1;
      }
    );
  }

}
