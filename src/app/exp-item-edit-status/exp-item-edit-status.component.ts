import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Expediente } from './../_interfaces/expediente';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exp-item-edit-status',
  templateUrl: './exp-item-edit-status.component.html',
  styleUrls: ['./exp-item-edit-status.component.scss']
})
export class ExpItemEditStatusComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  fcMotivo: FormControl;
  lStatus: boolean = true;
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.fcMotivo = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^.{10,}$/)]));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.lStatus = this.expediente.estado == 'EN PROCESO' ? true : false;
    }
  }

  openModalSetStatus(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  /**
   * Depura un expediente
   */
  disableExp() {
    this.lUpdating = true;
    let motivoF = this.fcMotivo.value;
    this.finalizar(motivoF).then(() => {
      this.modalService.dismissAll();
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: this.expediente?.numero,
        }
      })
    }).catch(() => {
      window.alert('error status');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  /**
   * Vuelve activo un expediente depurado
   */
  enableExp() {
    this.lUpdating = true;
    this.reActivar().then(() => {
      this.modalService.dismissAll();
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: this.expediente?.numero,
        }
      })
    }).catch(() => {
      window.alert('error status');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  // Consultas a la base de datos

  finalizar(motivo: string): Promise<void> {
    return this.db
      .collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        estado: 'FINALIZADO',
        motivoFinalizacion: motivo,
      });
  }

  reActivar(): Promise<void> {
    return this.db
      .collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        estado: 'EN PROCESO'
      });
  }
}
