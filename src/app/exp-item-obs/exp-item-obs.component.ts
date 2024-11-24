import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-obs',
  templateUrl: './exp-item-obs.component.html',
  styleUrls: ['./exp-item-obs.component.scss']
})
export class ExpItemObsComponent implements OnInit {
  @Input('expediente') expediente: Expediente | null = null;
  idusuario: string | null;
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;

  lstAnexos: any = [];
  file: File | null = null;
  uploadProgress = -1;
  lAnexando = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
  ) {
    this.idusuario = localStorage.getItem('idusuario');
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.listFiles()
  }

  openModal(modal: any) {
    this.fcObs.setValue(this.expediente?.sobs);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  updateObs() {
    this.lUpdating = true;
    let sobs = this.fcObs.value;
    this.db.collection('expedientes')
      .doc(this.expediente?.sexpediente)
      .update({
        sobs: sobs
      })
      .then(() => {
        // success
        this.modalService.dismissAll();
        if (this.expediente) {
          this.expediente.sobs = sobs;
        }
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

  listFiles() {
    const storageRef = this.storage.storage.ref(`anexos/${this.expediente?.sexpediente}`);

    // storageRef
    //   .listAll()
    //   .then((result) => {
    //     const fileNames = result.items.map((itemRef) => itemRef.name);
    //     console.log('Archivos encontrados:', fileNames);
    //   })
    //   .catch((error) => {
    //     console.error('Error al listar archivos:', error);
    //   });

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

    const filePath = `anexos/${this.expediente?.sexpediente}/${this.file.name}`;
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
    const fileRef = this.storage.ref(`anexos/${this.expediente?.sexpediente}/${ruta.name}`);
    const obs = fileRef.delete().subscribe(res => {
      console.log('eliminado: ', res);

      this.listFiles();
      obs.unsubscribe();
    });
  }


}
