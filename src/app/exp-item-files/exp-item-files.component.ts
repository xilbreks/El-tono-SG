import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Expediente } from './../_interfaces/expediente';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-exp-item-files',
  templateUrl: './exp-item-files.component.html',
  styleUrl: './exp-item-files.component.scss'
})
export class ExpItemFilesComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  lstAnexos: any = [];
  file: File | null = null;
  uploadProgress = -1;
  lAnexando = false;
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
  ){

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listFiles()
  }

  openModal(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  listFiles() {
    const storageRef = this.storage.storage.ref(`actuados/${this.expediente?.idExpediente}`);

    storageRef.listAll().then(async (result) => {
      const fileDetails = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await itemRef.getDownloadURL();
          return { name: itemRef.name, removing: false, size: (await itemRef.getMetadata()).size , url };
        })
      );

      // console.log('Archivos con URLs:', fileDetails);
      this.lstAnexos = fileDetails;
    })
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
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);

    // Monitorea el progreso
    task.percentageChanges().subscribe((progress) => {
      this.uploadProgress = progress || 0;
    });

    // Obtén la URL del archivo al finalizar
    task.snapshotChanges()
      .pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          // console.log('Archivo subido con éxito. URL:', url);
          this.listFiles();
          this.uploadProgress = -1; // Reinicia el progreso
          this.file = null; // reinicia el file
        });
      }))
      .subscribe();
  }

  quitarAnexo(ruta: any){
    ruta.removing = true;
    const fileRef = this.storage.ref(`actuados/${this.expediente?.idExpediente}/${ruta.name}`);
    const obs = fileRef.delete().subscribe(res => {
      console.log('eliminado: ', res);

      this.listFiles();
      obs.unsubscribe();
    });
  }
}
