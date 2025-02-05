import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, firstValueFrom } from 'rxjs';
import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-k',
  templateUrl: './exp-item-k.component.html',
  styleUrl: './exp-item-k.component.scss'
})
export class ExpItemKComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  lcontrato: boolean = false;
  urlcontrato: string = '';
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
  getUrlDescarga() {
    let obs = this.storage.ref(`contratos/${this.expediente?.idExpediente}.pdf`).getDownloadURL()

    firstValueFrom(obs).then((url) => {
      this.urlcontrato = url;
    }).catch(() => {
      window.alert('error al recuperar contrato')
    });
  }


  openModalSetTerms(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  /**
   * Quita el contrato del expediente
   */
  marcarSinContrato() {
    this.lUpdating = true;
    this.setK(false).then(() => {
      this.lcontrato = false;
      this.urlcontrato = '';
      this.modalService.dismissAll();
    }).catch(err => {
      window.alert('Error al quitar contrato');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  /**
   * Sube el contrato del expediente
   */
  marcarContrato() {
    this.lUpdating = true;
    this.setK(true).then(() => {
      this.lcontrato = true;
      this.getUrlDescarga();
      this.modalService.dismissAll();
    }).catch(err => {
      window.alert('Error al subir contrato');
    }).finally(() => {
      this.lUpdating = false;
    });
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

  // Operaciones en la base de datos

  /**
   * Establece el estado del expediente sobre su contrato
   * @param status Indicador del estado de contrato
   */
  setK(status: boolean): Promise<void> {
    return this.db.collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        tieneContrato: status
      });
  }
}
