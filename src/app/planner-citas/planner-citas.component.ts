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
  sacuerdos: string;
  stema: string;
  sfechauser: string;
  nombreDia: string;
  numeroDia: string;
  nombreMes: string;
}

@Component({
  selector: 'app-planner-citas',
  templateUrl: './planner-citas.component.html',
  styleUrl: './planner-citas.component.scss'
})
export class PlannerCitasComponent {
  lstCitas: Appointment[] = [];
  lLoading = false;
  lUpdating = false;

  frmDate: FormGroup;
  frmAcuerdos: FormGroup;

  today: string = '';

  constructor(
    private db: AngularFirestore,
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
    console.log(this.today)

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

  getCitas(indicator: boolean) {
    this.lLoading = indicator;
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
        obs.unsubscribe();
      })
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

  updateAcuerdos() {
    this.lUpdating = true;
    let idcita = this.frmAcuerdos.value['idcita'];
    let sacuerdos = this.frmAcuerdos.value['sacuerdos'].trim();

    this.db.collection('citas').doc(idcita).update({
      sacuerdos: sacuerdos
    }).then(() => {
      this.modalService.dismissAll();
      this.lUpdating = false;
      this.getCitas(false);
    }).catch(err => {
      window.alert('ocurrió un error');
    })
  }
}
