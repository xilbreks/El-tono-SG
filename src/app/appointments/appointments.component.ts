import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Appointment {
  idcita: string;
  sexpediente: string;
  sespecialidad: string;
  sdemandante: string;
  sdemandado: string;
  scliente: string;
  sfecha: string;
  shora: string;
  stipo: string;
  sencargados: string;
  stema: string;
  sfechauser: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  lstCitas: Appointment[] = [];
  lLoading = false;

  frmDate: FormGroup;

  constructor(
    private db: AngularFirestore,
  ) {
    /*******************************
     ******* FORM DATE RANGE *******
     *******************************/
    this.frmDate = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      smes: new FormControl(null, Validators.required),
      sanio: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const nYear = dHoy.getFullYear();
    const nMonth = dHoy.getMonth() + 1;

    this.frmDate.patchValue({
      smes: nMonth,
      sanio: nYear
    });
  }

  cambiarFecha() {
    let nanio = this.frmDate.value['sanio'];
    let nmes = this.frmDate.value['smes'];

    let nLastDay = (new Date(nanio, nmes, 0)).getDate();

    let sFirstDay = `${nanio}-${nmes}-01`;
    let sLastDay = `${nanio}-${nmes}-${nLastDay}`;

    this.frmDate.patchValue({
      sinicio: sFirstDay,
      sfinal: sLastDay,
    });

    this.getCitas();
  }

  getCitas() {
    this.lLoading = true;
    this.lstCitas = [];
    let sinicio = this.frmDate.controls['sinicio'].value;
    let sfinal = this.frmDate.controls['sfinal'].value;

    let obs = this.db.collection('citas', ref => {
      return ref.where('sfecha', '>=', sinicio)
        .where('sfecha', '<=', sfinal)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstCitas = res.map(cita => {
          let sDay = cita.sfecha.slice(8, 10);
          let sMonth = cita.sfecha.slice(5, 7);
          let sYear = cita.sfecha.slice(0, 4);
          return {
            ...cita,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
            scliente: cita.scliente.toUpperCase()
          }
        }).sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 < sfecha2 ? -1 : 1;
        });

        this.lLoading = false;
        obs.unsubscribe();
      })
  }
}
