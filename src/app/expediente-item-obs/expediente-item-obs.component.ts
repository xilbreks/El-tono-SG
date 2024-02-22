import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-expediente-item-obs',
  templateUrl: './expediente-item-obs.component.html',
  styleUrls: ['./expediente-item-obs.component.scss']
})
export class ExpedienteItemObsComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  sobs: string = '';
  lactive: boolean = true;
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;
  lToggling = false;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.getObsLactive();
  }

  getObsLactive() {
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.sobs = res.sobs;
        this.lactive = res.lactive;
        this.fcObs.setValue(this.sobs);
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
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lUpdating = false;
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
        this.getObsLactive();
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
        this.getObsLactive();
      })
      .catch(err => {
        console.log('ERROR', err)
      })
      .finally(() => {
        this.lToggling = false;
      });
  }
}
