import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-edit-status',
  templateUrl: './exp-item-edit-status.component.html',
  styleUrls: ['./exp-item-edit-status.component.scss']
})
export class ExpItemEditStatusComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  lStatus: boolean = true;
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
    private router: Router,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.lStatus = this.expediente.lactive;
    }
  }

  openModalSetStatus(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  /**
   * Vuelve activo un expediente depurado
   */
  enableExp() {
    this.lUpdating = true;
    this.setStatus(true).then(() => {
      this.modalService.dismissAll();
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: this.expediente?.sexpediente,
        }
      })
    }).catch(() => {
      window.alert('error status');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  /**
   * Depura un expediente
   */
  disableExp() {
    this.lUpdating = true;
    this.setStatus(false).then(() => {
      this.modalService.dismissAll();
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: this.expediente?.sexpediente,
        }
      })
    }).catch(() => {
      window.alert('error status');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  // Consultas a la base de datos

  setStatus(lStatus: boolean): Promise<void> {
    return this.db
      .collection('expedientes')
      .doc(this.expediente?.sexpediente)
      .update({
        lactive: lStatus
      });
  }
}
