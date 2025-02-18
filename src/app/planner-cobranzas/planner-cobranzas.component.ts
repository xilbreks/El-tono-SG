import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';

import { Contrato } from '../_interfaces/contrato';

@Component({
  selector: 'app-planner-cobranzas',
  templateUrl: './planner-cobranzas.component.html',
  styleUrl: './planner-cobranzas.component.scss'
})
export class PlannerCobranzasComponent implements OnInit {
  cobranzas: Contrato[] = [];
  frmDate: FormGroup;
  cargando: boolean = true;

  frmCobranza: FormGroup;
  lUpdating: boolean = false;

  today: string = '';

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmDate = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      smes: new FormControl(null, Validators.required),
      sanio: new FormControl(null, Validators.required),
    });

    this.frmCobranza = new FormGroup({
      idcontrato: new FormControl(null, Validators.required),
      sobs: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = dHoy.getTime() - 18000000;
    this.today = (new Date(time)).toISOString().slice(0, 10);
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

    this.getCobranzas(true);
  }

  async getCobranzas(indicador: boolean) {
    this.cargando = indicador;
    let inicio = this.frmDate.controls['sinicio'].value;
    let final = this.frmDate.controls['sfinal'].value;

    let cobranzas = await this.getCobranzasDB(inicio, final);

    this.cobranzas = cobranzas.map(doc => {
      // Fecha mas legible
      let dia = doc.sfecha.slice(8, 10);
      let mes = doc.sfecha.slice(5, 7);
      let anio = doc.sfecha.slice(0, 4);

      // Dia de la semana y mes del año
      let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      let fecha = new Date(`${doc.sfecha}T00:00`);
      let numeroDiaSemana = fecha.getUTCDay();
      let numeroMes = fecha.getMonth();
      let nombreDia = dias[numeroDiaSemana];
      let nombreMes = meses[numeroMes];

      // Detectar Hash de COBRANZA_EXITOSA
      const texto = '#COBRANZA EXITOSA';
      let pre = doc.sobs;
      let body = '';
      let sfj = '';
      if (doc.sobs && doc.sobs.includes(texto)) {
        let splited = doc.sobs.split(texto);
        pre = splited[0];
        sfj = splited[1];
        body = texto;
      }

      return {
        ...doc,
        nombreDia,
        nombreMes,
        numeroDia: dia,
        preObs: pre,
        bodyObs: body,
        sfjObs: sfj,
      }
    }).sort((a, b) => a.sfecha < b.sfecha ? -1 : 1);

    this.cargando = false;
  }


  openModalCobranza(idcontrato: string, sobs: string, modal: any) {
    this.frmCobranza.setValue({
      idcontrato: idcontrato,
      sobs: sobs,
    })

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  updateCobranza() {
    this.lUpdating = true;
    let idcontrato = this.frmCobranza.value['idcontrato'];
    let sobs = this.frmCobranza.value['sobs'].trim();

    this.db.collection('contratos').doc(idcontrato).update({
      sobs: sobs
    }).then(() => {
      this.modalService.dismissAll();
      this.lUpdating = false;
      this.getCobranzas(false);
    }).catch(err => {
      window.alert('ocurrió un error');
    })
  }


  // Operaciones a la base de datos

  /**
   * Obtiene el listado de cobranzas de una fecha determinada, mes
   * @param inicio primer dia del mes
   * @param final ultimo dia del mes
   */
  getCobranzasDB(inicio: string, final: string): Promise<Contrato[]> {
    let obs = this.db.collection('contratos', ref => {
      return ref.where('sfecha', '>=', inicio)
        .where('sfecha', '<=', final)
    }).get();

    return firstValueFrom(obs).then(snapshot => {
      let listado: any[] = [];
      snapshot.forEach(doc => listado.push(doc.data()));

      return listado;
    });
  }

}
