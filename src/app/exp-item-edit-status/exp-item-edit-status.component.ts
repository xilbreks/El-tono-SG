import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-exp-item-edit-status',
  templateUrl: './exp-item-edit-status.component.html',
  styleUrls: ['./exp-item-edit-status.component.scss']
})
export class ExpItemEditStatusComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  @Output() onLactive = new EventEmitter<boolean>();

  lactive: boolean = true;
  lToggling = false;

  constructor(
    private db: AngularFirestore,
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

  setNotActive() {
    let lconfirmed = window.confirm('Se dará de baja, ¿continuar?');
    if (!lconfirmed) return;

    this.lToggling = true;
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lactive: false
      })
      .then(() => {
        // success
        this.getLactive();
        this.onLactive.emit(false);
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lToggling = false;
      });
  }

  setActive() {
    let lconfirmed = window.confirm('Se dará de alta, ¿continuar?');
    if (!lconfirmed) return;

    this.lToggling = true;
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
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lToggling = false;
      });
  }

}
