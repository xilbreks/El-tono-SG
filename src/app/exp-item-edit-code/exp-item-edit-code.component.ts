import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';

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
        this.fcCodigo.setValue(this.scodigo);
        // this.onLactive.emit(this.lactive);

        obs.unsubscribe();
      });
  }

  setCodigo() {
    // this.lUpdating = true;
    let scodigo = this.fcCodigo.value.trim();

    console.log('actualizar con:', scodigo)
    // this.db
    //   .collection('expedientes')
    //   .doc(this.sexpediente)
    //   .update({
    //     scodigo: scodigo
    //   })
    //   .then(() => {
    //     // success
    //     this.getCodigo;
    //     // this.onLactive.emit(true);
    //   })
    //   .catch(err => {
    //     console.log('ERROR', err)
    //   })
    //   .finally(() => {
    //     this.lUpdating = false;
    //   });
  }
}
