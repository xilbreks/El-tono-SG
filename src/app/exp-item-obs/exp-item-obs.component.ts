import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-obs',
  templateUrl: './exp-item-obs.component.html',
  styleUrls: ['./exp-item-obs.component.scss']
})
export class ExpItemObsComponent implements OnInit {
  @Input('expediente') expediente: Expediente | null = null;
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void { }

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

}
