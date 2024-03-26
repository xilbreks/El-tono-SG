import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-edit-code',
  templateUrl: './exp-item-edit-code.component.html',
  styleUrls: ['./exp-item-edit-code.component.scss']
})
export class ExpItemEditCodeComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  scodigo: string = 'XX-XXXX';
  fcCodigo: FormControl = new FormControl(null, Validators.required);
  lUpdating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCodigo();
  }

  getCodigo() {
    let obs = this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.scodigo = res.scodigo;

        obs.unsubscribe();
      });
  }

  openModalSetCode(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }
  
  setCodigo() {
    this.lUpdating = true;
    let scodigo = this.fcCodigo.value;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        scodigo: scodigo
      })
      .then(() => {
        // success
        this.scodigo = scodigo;
      })
      .catch(err => {
        // error
        window.alert('Error al establecer codigo' + err)
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      })
  }

  openModalUnCode(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  unCode() {
    this.lUpdating = true;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        scodigo: 'XX-XXXX'
      })
      .then(() => {
        // success
        this.scodigo = 'XX-XXXX';
        this.fcCodigo.reset();
      })
      .catch(err => {
        // error
        window.alert('Error al quitar codigo' + err)
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      })
  }

}
