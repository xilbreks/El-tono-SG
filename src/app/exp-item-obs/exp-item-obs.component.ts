import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-obs',
  templateUrl: './exp-item-obs.component.html',
  styleUrls: ['./exp-item-obs.component.scss']
})
export class ExpItemObsComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  sobs: string = '';
  urlassets: string = '';
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getObs();
  }

  getObs() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.sobs = res.sobs;
        this.urlassets = res.urlassets;

        obs.unsubscribe();
      });
  }

  openModal(modal: any) {
    this.fcObs.setValue(this.sobs);

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  setObs() {
    this.lUpdating = true;
    let sobs = this.fcObs.value;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        sobs: sobs
      })
      .then(() => {
        // success
        this.modalService.dismissAll();
        this.getObs();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
      });
  }

}
