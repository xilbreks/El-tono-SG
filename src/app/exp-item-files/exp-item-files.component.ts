import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Storage, ref, listAll, getDownloadURL,
  getMetadata, uploadBytesResumable, deleteObject
} from '@angular/fire/storage';
import { Expediente } from './../_interfaces/expediente';
import { finalize } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-exp-item-files',
  templateUrl: './exp-item-files.component.html',
  styleUrl: './exp-item-files.component.scss',
  imports: [
    DecimalPipe,
  ]
})
export class ExpItemFilesComponent implements OnChanges {
  appService = inject(AppService);
  storage = inject(Storage);
  @Input('expediente') expediente: Expediente | null = null;

  lstAnexos: any = [];
  file: File | null = null;
  uploadProgress = -1;
  lAnexando = false;
  lUpdating = false;

  constructor(
    private modalService: NgbModal,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listFiles()
  }

  openModal(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  async listFiles() {
    if (!this.expediente) return;

    try {
      const storageRef = ref(this.storage, `actuados/${this.expediente.idExpediente}`);

      const result = await listAll(storageRef);

      const fileDetails = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);

          return {
            name: itemRef.name,
            removing: false,
            size: metadata.size,
            url
          };
        })
      );

      this.lstAnexos = fileDetails;
    } catch (error) {
      console.error('Error al listar archivos:', error);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      this.file = selectedFile;
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

  uploadFile() {
    if (!this.file) return;
    this.lUpdating = true;

    const filePath = `actuados/${this.expediente?.idExpediente}/${this.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const task = uploadBytesResumable(storageRef, this.file);

    // Monitorea el progreso
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
        // console.log('Archivo subido con éxito. URL:', url);
        this.uploadProgress = -1;
        this.listFiles();
        this.file = null;
      }
    );
  }

  async quitarAnexo(ruta: any) {
    if (!this.expediente?.idExpediente) return;

    ruta.removing = true;

    const fileRef = ref(this.storage, `actuados/${this.expediente.idExpediente}/${ruta.name}`);

    try {
      await deleteObject(fileRef);

      // console.log('eliminado con éxito');
      this.listFiles(); // Refrescamos la lista de archivos
    } catch (error) {
      console.error('Error al eliminar el archivo: ', error);
      ruta.removing = false;
    }
  }
}
