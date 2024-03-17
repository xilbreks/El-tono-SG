import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-edit-terms',
  templateUrl: './exp-item-edit-terms.component.html',
  styleUrls: ['./exp-item-edit-terms.component.scss']
})
export class ExpItemEditTermsComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  lterms: boolean = true;
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
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
        this.lterms = res.lcontrato;

        obs.unsubscribe();
      });
  }

  openModalSetTerms(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  setTerms(status: boolean) {
    this.lUpdating = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lcontrato: status
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

}
