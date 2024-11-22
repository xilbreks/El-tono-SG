import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-exp-item-edit-terms',
  templateUrl: './exp-item-edit-terms.component.html',
  styleUrls: ['./exp-item-edit-terms.component.scss']
})
export class ExpItemEditTermsComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  lcontrato: boolean = true;
  lUpdating = false;
  file: File | null = null;
  uploadProgress = -1;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTerms();
  }

  getTerms() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.lcontrato = res.lcontrato;

        obs.unsubscribe();
      });
  }

  openModalSetTerms(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  marcarSinContrato() {
    this.lUpdating = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lcontrato: false
      })
      .then(() => {
        // success
        this.getTerms();
        this.modalService.dismissAll();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

  marcarContrato() {
    this.lUpdating = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lcontrato: true,
        urlcontrato: `contratos/${this.sexpediente}.pdf`
      })
      .then(() => {
        // success
        this.getTerms();
        this.modalService.dismissAll();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
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

    const filePath = `contratos/${this.sexpediente}.pdf`;
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
          console.log('Archivo subido con éxito. URL:', url);
          this.marcarContrato(); // Marcar true que tiene pdf del contrato
          this.uploadProgress = -1; // Reinicia el progreso
        });
      }))
      .subscribe();
  }
}


