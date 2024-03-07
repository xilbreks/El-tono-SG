import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-edit-match',
  templateUrl: './exp-item-edit-match.component.html',
  styleUrls: ['./exp-item-edit-match.component.scss']
})
export class ExpItemEditMatchComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  smatchexp: string = 'no-match';
  fcMatch: FormControl = new FormControl(
    null,
    Validators.compose(
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]
    )
  );
  lUpdating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMatch();
  }

  getMatch() {
    let obs = this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.smatchexp = res.smatchexp;

        obs.unsubscribe();
      });
  }

  openModalSetMatch(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  setMatch() {
    this.lUpdating = true;
    let smatch = this.fcMatch.value;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        smatchexp: smatch
      })
      .then(() => {
        // success
        this.smatchexp = smatch;
      })
      .catch(err => {
        // error
        window.alert('Error al vincular' + err)
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      })
  }

  openModalUnMatch(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  unMatch() {
    this.lUpdating = true;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        smatchexp: 'no-match'
      })
      .then(() => {
        // success
        this.smatchexp = 'no-match';
        this.fcMatch.reset();
      })
      .catch(err => {
        // error
        window.alert('Error al desvincular' + err)
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      })
  }

}
