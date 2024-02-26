import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-expediente-item-obs',
  templateUrl: './expediente-item-obs.component.html',
  styleUrls: ['./expediente-item-obs.component.scss']
})
export class ExpedienteItemObsComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  sobs: string = '';
  fcObs: FormControl = new FormControl([]);
  lUpdating = false;

  constructor(
    private db: AngularFirestore,
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
        this.fcObs.setValue(this.sobs);

        obs.unsubscribe();
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

}
