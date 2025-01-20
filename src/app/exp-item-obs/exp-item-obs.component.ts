import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-obs',
  templateUrl: './exp-item-obs.component.html',
  styleUrls: ['./exp-item-obs.component.scss']
})
export class ExpItemObsComponent {
  @Input('expediente') expediente: Expediente | null = null;
  idusuario: string | null;
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.idusuario = localStorage.getItem('idusuario');
  }

  openModal(modal: any) {
    this.fcObs.setValue(this.expediente?.observaciones);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  updateObs() {
    this.lUpdating = true;
    let sobs = this.fcObs.value;
    this.db.collection('expedientes')
      .doc(this.expediente?.idExpediente)
      .update({
        observaciones: sobs
      })
      .then(() => {
        // success
        this.modalService.dismissAll();
        if (this.expediente) {
          this.expediente.observaciones = sobs;
        }
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

}
