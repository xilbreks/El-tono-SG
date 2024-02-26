import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-expediente-item-edit',
  templateUrl: './expediente-item-edit.component.html',
  styleUrls: ['./expediente-item-edit.component.scss']
})
export class ExpedienteItemEditComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
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
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        lactive: true
      })
      .then(() => {
        // success
        this.getLactive();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lToggling = false;
      });
  }

}
