import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cita } from '../_interfaces/cita';

@Component({
  selector: 'app-planner-citas',
  templateUrl: './planner-citas.component.html',
  styleUrl: './planner-citas.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class PlannerCitasComponent implements OnInit {
  private db = inject(Firestore);

  lstCitas: Cita[] = [];
  lLoading = false;
  lUpdating = false;

  frmDate: FormGroup;
  frmAcuerdos: FormGroup;

  today: string = '';

  constructor(
    private modalService: NgbModal,
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
    /**
     * Form Control de Acuerdos
     */
    this.frmAcuerdos = new FormGroup({
      idcita: new FormControl(null, Validators.required),
      sacuerdos: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = (dHoy.getTime() - 18000000);
    this.today = (new Date(time)).toISOString().slice(0, 10);
    // console.log(this.today)

    const nYear = dHoy.getFullYear();
    let nMonth: any = dHoy.getMonth() + 1;

    if (nMonth < 10) {
      nMonth = '0' + nMonth;
    }

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

    this.getCitas(true);
  }

  async getCitas(indicator: boolean) {
    this.lLoading = indicator;
    let sinicio = this.frmDate.controls['sinicio'].value;
    let sfinal = this.frmDate.controls['sfinal'].value;

    const colRef = collection(this.db, 'citas');
    const q = query(colRef, where('sfecha', '>=', sinicio), where('sfecha', '<=', sfinal));
    const querySnapshot = await getDocs(q);

    this.lstCitas = querySnapshot.docs.map(doc => {
      const cita: any = doc.data();
      let sDay = cita.sfecha.slice(8, 10);
      let sMonth = cita.sfecha.slice(5, 7);
      let sYear = cita.sfecha.slice(0, 4);

      // Colocar nombre a los dias y el mes
      let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      let fecha = new Date(`${cita.sfecha}T00:00`);
      let numeroDiaSemana = fecha.getUTCDay();
      let numeroMes = fecha.getMonth();
      let nombreDia = dias[numeroDiaSemana];
      let nombreMes = meses[numeroMes];

      return {
        ...cita,
        sfechauser: sDay + '/' + sMonth + '/' + sYear,
        scliente: cita.scliente.toUpperCase(),
        nombreDia,
        numeroDia: sDay,
        nombreMes,
      }
    }).sort((a, b) => {
      let sfecha1 = a.sfecha + '-' + a.shora;
      let sfecha2 = b.sfecha + '-' + b.shora;
      return sfecha1 < sfecha2 ? -1 : 1;
    });

    this.lLoading = false;
  }

  openModalAcuerdos(idcita: string, sacuerdos: string, modal: any) {
    this.frmAcuerdos.setValue({
      idcita: idcita,
      sacuerdos: sacuerdos,
    })

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  async updateAcuerdos() {
    this.lUpdating = true;
    let idcita = this.frmAcuerdos.value['idcita'];
    let sacuerdos = this.frmAcuerdos.value['sacuerdos'].trim();

    const docRef = doc(this.db, `citas/${idcita}`);

    try {
      await updateDoc(docRef, {
        sacuerdos: sacuerdos
      })
      this.modalService.dismissAll();
      this.lUpdating = false;
      this.getCitas(false);

    } catch (err) {
      this.lUpdating = false;
      console.log(err);
    }
  }
}
