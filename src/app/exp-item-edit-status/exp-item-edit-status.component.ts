import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-edit-status',
  templateUrl: './exp-item-edit-status.component.html',
  styleUrls: ['./exp-item-edit-status.component.scss']
})
export class ExpItemEditStatusComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  @Output() onLactive = new EventEmitter<boolean>();

  lactive: boolean = true;
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getLactive();
  }

  getLactive() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.lactive = res.lactive;
        this.onLactive.emit(this.lactive);

        obs.unsubscribe();
      });
  }

  openModalSetStatus(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  setNotActive() {
    this.lUpdating = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lactive: false
      })
      .then(() => {
        // success
        this.getLactive();
        this.onLactive.emit(false);
        this.modalService.dismissAll();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

  setActive() {
    this.lUpdating = true;
    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lactive: true
      })
      .then(() => {
        // success
        this.getLactive();
        this.onLactive.emit(true);
        this.modalService.dismissAll();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

}
