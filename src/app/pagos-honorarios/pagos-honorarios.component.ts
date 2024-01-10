import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PagoHonorario } from './../__clases/pago-honorario';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pagos-honorarios',
  templateUrl: './pagos-honorarios.component.html',
  styleUrls: ['./pagos-honorarios.component.scss']
})
export class PagosHonorariosComponent {
  frmPagos: FormGroup;
  lstPagos: Array<PagoHonorario> = [];
  lLoading = false;

  constructor(
    private db: AngularFirestore,
  ) {
    /************************
     * INIT FORM DATE RANGE *
     ************************/
    this.frmPagos = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
    });
  }

  getPagos() {
    this.lLoading = true;
    let sinicio = this.frmPagos.controls['sinicio'].value;
    let sfinal = this.frmPagos.controls['sfinal'].value;
    let obs = this.db.collection('pagos', ref => {
      return ref.where('lactive', '==', true)
        .where('sfecha', '>=', sinicio)
        .where('sfecha', '<=', sfinal);
    }).valueChanges()
    .subscribe((res: Array<any>) => {
      this.lstPagos = res;
      console.log({res})

      this.lLoading = false;
      this.frmPagos.reset();
      obs.unsubscribe();
    });
  }
}
