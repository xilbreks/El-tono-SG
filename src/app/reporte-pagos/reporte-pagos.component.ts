import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

interface Pago {
  sdescripcion: string,
  sfecha: string,
  sexpediente: string,
  lactive: boolean,
  idpago: string,
  nmonto: number,
  smodificador: string
}

@Component({
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pagos.component.html',
  styleUrls: ['./reporte-pagos.component.scss']
})
export class ReportePagosComponent {
  lstExpLaborales: Array<any> = [];
  lstExpFamilia: Array<any> = [];
  lstExpCivil: Array<any> = [];

  lLaboralOK = false;
  lFamiliaOK = false;
  lCivilOK = false;

  lstPagos: Array<Pago> = [];
  
  lPagosOK = false;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  getPagos() {
    let obs = this.db.collection('pagos', ref => {
      return ref.where('lactive', '==', true)
    }).valueChanges()
    .subscribe((res: any) => {
      this.lstPagos = res;
      this.lPagosOK = true;

      obs.unsubscribe();
    });
  }

  getExpLaboral() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'LABORAL')
        .where('lactive', '==', true);
    }).valueChanges()
    .subscribe(res => {
      this.lstExpLaborales = res;
      this.lLaboralOK = true;

      obs.unsubscribe();
    });
  }

  getExpFamilia() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'FAMILIA')
        .where('lactive', '==', true);
    }).valueChanges()
    .subscribe(res => {
      this.lstExpFamilia = res;
      this.lFamiliaOK = true;

      obs.unsubscribe();
    });
  }

  getExpCivil() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'CIVIL')
        .where('lactive', '==', true);
    }).valueChanges()
    .subscribe(res => {
      this.lstExpCivil = res;
      this.lCivilOK = true;

      obs.unsubscribe();
    });
  }

  analizar() {
    let todo_laboral: Array<any> = [];
    let todo_familia: Array<any> = [];
    let todo_civil: Array<any> = [];

    this.lstExpLaborales.forEach(e => {
      // Obtener pagos
      let sumapagos = 0;
      let fultimopa = 'NUNCA';
      let nultimopa = 0;
      let pagitos = this.lstPagos.filter(pago => {
        if (pago.sexpediente == e.sexpediente) {
          sumapagos += pago.nmonto;
          fultimopa = pago.sfecha;
          nultimopa = pago.nmonto;
          return true;
        } else {
          return false;
        }
      });

      todo_laboral.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,
        "Monto Contrato": e.nmontocontrato ? e.nmontocontrato : 0,
        "Monto Cancelado": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpFamilia.forEach(e => {
      // Obtener pagos
      let sumapagos = 0;
      let fultimopa = 'NUNCA';
      let nultimopa = 0;
      let pagitos = this.lstPagos.filter(pago => {
        if (pago.sexpediente == e.sexpediente) {
          sumapagos += pago.nmonto;
          fultimopa = pago.sfecha;
          nultimopa = pago.nmonto;
          return true;
        } else {
          return false;
        }
      });

      todo_familia.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,
        "Monto Contrato": e.nmontocontrato ? e.nmontocontrato : 0,
        "Monto Cancelado": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpCivil.forEach(e => {
      // Obtener pagos
      let sumapagos = 0;
      let fultimopa = 'NUNCA';
      let nultimopa = 0;
      let pagitos = this.lstPagos.filter(pago => {
        if (pago.sexpediente == e.sexpediente) {
          sumapagos += pago.nmonto;
          fultimopa = pago.sfecha;
          nultimopa = pago.nmonto;
          return true;
        } else {
          return false;
        }
      });

      todo_civil.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,
        "Monto Contrato": e.nmontocontrato ? e.nmontocontrato : 0,
        "Monto Cancelado": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    const worksheet1 = XLSX.utils.json_to_sheet(todo_laboral);
    const worksheet2 = XLSX.utils.json_to_sheet(todo_familia);
    const worksheet3 = XLSX.utils.json_to_sheet(todo_civil);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Laboral");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Familia");
    XLSX.utils.book_append_sheet(workbook, worksheet3, "Civil");
    XLSX.writeFile(workbook, 'Expedientes.xlsx', { compression: true });
  }
}
