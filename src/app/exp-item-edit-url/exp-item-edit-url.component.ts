import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exp-item-edit-url',
  templateUrl: './exp-item-edit-url.component.html',
  styleUrls: ['./exp-item-edit-url.component.scss'] 
})
export class ExpItemEditUrlComponent {
  @Input('sexpediente') sexpediente: string = '';

  urlassets: string = 'sin-url';
  fcURL: FormControl = new FormControl(
    null,
    Validators.compose(
      [Validators.required]
    )
  );
  lUpdating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getURL();
  }

  getURL() {
    let obs = this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.urlassets = res.urlassets;

        obs.unsubscribe();
      });
  }

  openModalSetURL(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  setURL() {
    this.lUpdating = true;
    let url = this.fcURL.value;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        urlassets: url
      })
      .then(() => {
        // success
        this.urlassets = url;
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

  openModalRemoveURL(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  removeURL() {
    this.lUpdating = true;

    this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .update({
        urlassets: 'sin-url'
      })
      .then(() => {
        // success
        this.urlassets = 'sin-url';
        this.fcURL.reset();
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
