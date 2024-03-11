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

interface Contrato {
  idcontrato: string;
  lactive: boolean;
  nmonto: number;
  sdetalle: string;
  sexpediente: string;
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
  lstExpPenal: Array<any> = [];
  lstExpConst: Array<any> = [];

  lLaboralOK = false;
  lFamiliaOK = false;
  lCivilOK = false;
  lPenalOK = false;
  lConstOK = false;

  lstPagos: Array<Pago> = [];
  lstContratos: Array<Contrato> = [];

  lPagosOK = false;
  lContratosOK = false;

  nMaxPagos = 30;
  nMaxContratos = 5;

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

  getContratos() {
    let obs = this.db.collection('contratos', ref => {
      return ref.where('lactive', '==', true)
    }).valueChanges()
      .subscribe((res: any) => {
        this.lstContratos = res;
        this.lContratosOK = true;

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

  getExpPenal() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'PENAL')
        .where('lactive', '==', true);
    }).valueChanges()
      .subscribe(res => {
        this.lstExpPenal = res;
        this.lPenalOK = true;

        obs.unsubscribe();
      });
  }

  getExpConst() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad', '==', 'CONSTITUCIONAL')
        .where('lactive', '==', true);
    }).valueChanges()
      .subscribe(res => {
        this.lstExpConst = res;
        this.lConstOK = true;

        obs.unsubscribe();
      });
  }

  analizar() {
    let todo_laboral: Array<any> = [];
    let todo_familia: Array<any> = [];
    let todo_civil: Array<any> = [];
    let todo_penal: Array<any> = [];
    let todo_const: Array<any> = [];

    // EXPEDIENTES LABORALES
    this.lstExpLaborales.forEach(e => {
      // Pagos
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

      let lstPagos: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];
      let lstFechas: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 30; j++) {
        if (!!pagitos[j]) {
          lstPagos[j] = pagitos[j].nmonto;
          lstFechas[j] = pagitos[j].sfecha;
        }
      }

      // Contratos
      let sumacontratos = 0;
      let contratitos = this.lstContratos.filter(contr => {
        if (contr.sexpediente == e.sexpediente) {
          sumacontratos += contr.nmonto;
          return true;
        } else {
          return false;
        }
      });

      let lstMontos: Array<any> = [
        '-', '-', '-', '-', '-',
      ];
      let lstDetalles: Array<any> = [
        '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 5; j++) {
        if (!!contratitos[j]) {
          lstMontos[j] = contratitos[j].nmonto;
          lstDetalles[j] = contratitos[j].sdetalle;
        }
      }

      todo_laboral.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,

        "Monto TOTAL CONTRATO": sumacontratos,
        "Detalle 1": lstDetalles[0],
        "Monto 1": lstMontos[0],
        "Detalle 2": lstDetalles[1],
        "Monto 2": lstMontos[1],
        "Detalle 3": lstDetalles[2],
        "Monto 3": lstMontos[2],
        "Detalle 4": lstDetalles[3],
        "Monto 4": lstMontos[3],
        "Detalle 5": lstDetalles[4],
        "Monto 5": lstMontos[4],

        "Pago 1": lstPagos[0],
        "Fecha 1": lstFechas[0],
        "Pago 2": lstPagos[1],
        "Fecha 2": lstFechas[1],
        "Pago 3": lstPagos[2],
        "Fecha 3": lstFechas[2],
        "Pago 4": lstPagos[3],
        "Fecha 4": lstFechas[3],
        "Pago 5": lstPagos[4],
        "Fecha 5": lstFechas[4],
        "Pago 6": lstPagos[5],
        "Fecha 6": lstFechas[5],
        "Pago 7": lstPagos[6],
        "Fecha 7": lstFechas[6],
        "Pago 8": lstPagos[7],
        "Fecha 8": lstFechas[7],
        "Pago 9": lstPagos[8],
        "Fecha 9": lstFechas[8],
        "Pago 10": lstPagos[9],
        "Fecha 10": lstFechas[9],
        "Pago 11": lstPagos[10],
        "Fecha 11": lstFechas[10],
        "Pago 12": lstPagos[11],
        "Fecha 12": lstFechas[11],
        "Pago 13": lstPagos[12],
        "Fecha 13": lstFechas[12],
        "Pago 14": lstPagos[13],
        "Fecha 14": lstFechas[13],
        "Pago 15": lstPagos[14],
        "Fecha 15": lstFechas[14],
        "Pago 16": lstPagos[15],
        "Fecha 16": lstFechas[15],
        "Pago 17": lstPagos[16],
        "Fecha 17": lstFechas[16],
        "Pago 18": lstPagos[17],
        "Fecha 18": lstFechas[17],
        "Pago 19": lstPagos[18],
        "Fecha 19": lstFechas[18],
        "Pago 20": lstPagos[19],
        "Fecha 20": lstFechas[19],
        "Pago 21": lstPagos[20],
        "Fecha 21": lstFechas[20],
        "Pago 22": lstPagos[21],
        "Fecha 22": lstFechas[21],
        "Pago 23": lstPagos[22],
        "Fecha 23": lstFechas[22],
        "Pago 24": lstPagos[23],
        "Fecha 24": lstFechas[23],
        "Pago 25": lstPagos[24],
        "Fecha 25": lstFechas[24],
        "Pago 26": lstPagos[25],
        "Fecha 26": lstFechas[25],
        "Pago 27": lstPagos[26],
        "Fecha 27": lstFechas[26],
        "Pago 28": lstPagos[27],
        "Fecha 28": lstFechas[27],
        "Pago 29": lstPagos[28],
        "Fecha 29": lstFechas[28],
        "Pago 30": lstPagos[29],
        "Fecha 30": lstFechas[29],
        "Monto TOTAL PAGADO": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpFamilia.forEach(e => {
      // Pagos
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

      let lstPagos: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];
      let lstFechas: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 30; j++) {
        if (!!pagitos[j]) {
          lstPagos[j] = pagitos[j].nmonto;
          lstFechas[j] = pagitos[j].sfecha;
        }
      }

      // Contratos
      let sumacontratos = 0;
      let contratitos = this.lstContratos.filter(contr => {
        if (contr.sexpediente == e.sexpediente) {
          sumacontratos += contr.nmonto;
          return true;
        } else {
          return false;
        }
      });

      let lstMontos: Array<any> = [
        '-', '-', '-', '-', '-',
      ];
      let lstDetalles: Array<any> = [
        '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 5; j++) {
        if (!!contratitos[j]) {
          lstMontos[j] = contratitos[j].nmonto;
          lstDetalles[j] = contratitos[j].sdetalle;
        }
      }

      todo_familia.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,

        "Monto TOTAL CONTRATO": sumacontratos,
        "Detalle 1": lstDetalles[0],
        "Monto 1": lstMontos[0],
        "Detalle 2": lstDetalles[1],
        "Monto 2": lstMontos[1],
        "Detalle 3": lstDetalles[2],
        "Monto 3": lstMontos[2],
        "Detalle 4": lstDetalles[3],
        "Monto 4": lstMontos[3],
        "Detalle 5": lstDetalles[4],
        "Monto 5": lstMontos[4],

        "Pago 1": lstPagos[0],
        "Fecha 1": lstFechas[0],
        "Pago 2": lstPagos[1],
        "Fecha 2": lstFechas[1],
        "Pago 3": lstPagos[2],
        "Fecha 3": lstFechas[2],
        "Pago 4": lstPagos[3],
        "Fecha 4": lstFechas[3],
        "Pago 5": lstPagos[4],
        "Fecha 5": lstFechas[4],
        "Pago 6": lstPagos[5],
        "Fecha 6": lstFechas[5],
        "Pago 7": lstPagos[6],
        "Fecha 7": lstFechas[6],
        "Pago 8": lstPagos[7],
        "Fecha 8": lstFechas[7],
        "Pago 9": lstPagos[8],
        "Fecha 9": lstFechas[8],
        "Pago 10": lstPagos[9],
        "Fecha 10": lstFechas[9],
        "Pago 11": lstPagos[10],
        "Fecha 11": lstFechas[10],
        "Pago 12": lstPagos[11],
        "Fecha 12": lstFechas[11],
        "Pago 13": lstPagos[12],
        "Fecha 13": lstFechas[12],
        "Pago 14": lstPagos[13],
        "Fecha 14": lstFechas[13],
        "Pago 15": lstPagos[14],
        "Fecha 15": lstFechas[14],
        "Pago 16": lstPagos[15],
        "Fecha 16": lstFechas[15],
        "Pago 17": lstPagos[16],
        "Fecha 17": lstFechas[16],
        "Pago 18": lstPagos[17],
        "Fecha 18": lstFechas[17],
        "Pago 19": lstPagos[18],
        "Fecha 19": lstFechas[18],
        "Pago 20": lstPagos[19],
        "Fecha 20": lstFechas[19],
        "Pago 21": lstPagos[20],
        "Fecha 21": lstFechas[20],
        "Pago 22": lstPagos[21],
        "Fecha 22": lstFechas[21],
        "Pago 23": lstPagos[22],
        "Fecha 23": lstFechas[22],
        "Pago 24": lstPagos[23],
        "Fecha 24": lstFechas[23],
        "Pago 25": lstPagos[24],
        "Fecha 25": lstFechas[24],
        "Pago 26": lstPagos[25],
        "Fecha 26": lstFechas[25],
        "Pago 27": lstPagos[26],
        "Fecha 27": lstFechas[26],
        "Pago 28": lstPagos[27],
        "Fecha 28": lstFechas[27],
        "Pago 29": lstPagos[28],
        "Fecha 29": lstFechas[28],
        "Pago 30": lstPagos[29],
        "Fecha 30": lstFechas[29],
        "Monto TOTAL PAGADO": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpCivil.forEach(e => {
      // Pagos
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

      let lstPagos: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];
      let lstFechas: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 30; j++) {
        if (!!pagitos[j]) {
          lstPagos[j] = pagitos[j].nmonto;
          lstFechas[j] = pagitos[j].sfecha;
        }
      }

      // Contratos
      let sumacontratos = 0;
      let contratitos = this.lstContratos.filter(contr => {
        if (contr.sexpediente == e.sexpediente) {
          sumacontratos += contr.nmonto;
          return true;
        } else {
          return false;
        }
      });

      let lstMontos: Array<any> = [
        '-', '-', '-', '-', '-',
      ];
      let lstDetalles: Array<any> = [
        '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 5; j++) {
        if (!!contratitos[j]) {
          lstMontos[j] = contratitos[j].nmonto;
          lstDetalles[j] = contratitos[j].sdetalle;
        }
      }

      todo_civil.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,

        "Monto TOTAL CONTRATO": sumacontratos,
        "Detalle 1": lstDetalles[0],
        "Monto 1": lstMontos[0],
        "Detalle 2": lstDetalles[1],
        "Monto 2": lstMontos[1],
        "Detalle 3": lstDetalles[2],
        "Monto 3": lstMontos[2],
        "Detalle 4": lstDetalles[3],
        "Monto 4": lstMontos[3],
        "Detalle 5": lstDetalles[4],
        "Monto 5": lstMontos[4],

        "Pago 1": lstPagos[0],
        "Fecha 1": lstFechas[0],
        "Pago 2": lstPagos[1],
        "Fecha 2": lstFechas[1],
        "Pago 3": lstPagos[2],
        "Fecha 3": lstFechas[2],
        "Pago 4": lstPagos[3],
        "Fecha 4": lstFechas[3],
        "Pago 5": lstPagos[4],
        "Fecha 5": lstFechas[4],
        "Pago 6": lstPagos[5],
        "Fecha 6": lstFechas[5],
        "Pago 7": lstPagos[6],
        "Fecha 7": lstFechas[6],
        "Pago 8": lstPagos[7],
        "Fecha 8": lstFechas[7],
        "Pago 9": lstPagos[8],
        "Fecha 9": lstFechas[8],
        "Pago 10": lstPagos[9],
        "Fecha 10": lstFechas[9],
        "Pago 11": lstPagos[10],
        "Fecha 11": lstFechas[10],
        "Pago 12": lstPagos[11],
        "Fecha 12": lstFechas[11],
        "Pago 13": lstPagos[12],
        "Fecha 13": lstFechas[12],
        "Pago 14": lstPagos[13],
        "Fecha 14": lstFechas[13],
        "Pago 15": lstPagos[14],
        "Fecha 15": lstFechas[14],
        "Pago 16": lstPagos[15],
        "Fecha 16": lstFechas[15],
        "Pago 17": lstPagos[16],
        "Fecha 17": lstFechas[16],
        "Pago 18": lstPagos[17],
        "Fecha 18": lstFechas[17],
        "Pago 19": lstPagos[18],
        "Fecha 19": lstFechas[18],
        "Pago 20": lstPagos[19],
        "Fecha 20": lstFechas[19],
        "Pago 21": lstPagos[20],
        "Fecha 21": lstFechas[20],
        "Pago 22": lstPagos[21],
        "Fecha 22": lstFechas[21],
        "Pago 23": lstPagos[22],
        "Fecha 23": lstFechas[22],
        "Pago 24": lstPagos[23],
        "Fecha 24": lstFechas[23],
        "Pago 25": lstPagos[24],
        "Fecha 25": lstFechas[24],
        "Pago 26": lstPagos[25],
        "Fecha 26": lstFechas[25],
        "Pago 27": lstPagos[26],
        "Fecha 27": lstFechas[26],
        "Pago 28": lstPagos[27],
        "Fecha 28": lstFechas[27],
        "Pago 29": lstPagos[28],
        "Fecha 29": lstFechas[28],
        "Pago 30": lstPagos[29],
        "Fecha 30": lstFechas[29],
        "Monto TOTAL PAGADO": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpPenal.forEach(e => {
      // Pagos
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

      let lstPagos: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];
      let lstFechas: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 30; j++) {
        if (!!pagitos[j]) {
          lstPagos[j] = pagitos[j].nmonto;
          lstFechas[j] = pagitos[j].sfecha;
        }
      }

      // Contratos
      let sumacontratos = 0;
      let contratitos = this.lstContratos.filter(contr => {
        if (contr.sexpediente == e.sexpediente) {
          sumacontratos += contr.nmonto;
          return true;
        } else {
          return false;
        }
      });

      let lstMontos: Array<any> = [
        '-', '-', '-', '-', '-',
      ];
      let lstDetalles: Array<any> = [
        '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 5; j++) {
        if (!!contratitos[j]) {
          lstMontos[j] = contratitos[j].nmonto;
          lstDetalles[j] = contratitos[j].sdetalle;
        }
      }

      todo_penal.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,

        "Monto TOTAL CONTRATO": sumacontratos,
        "Detalle 1": lstDetalles[0],
        "Monto 1": lstMontos[0],
        "Detalle 2": lstDetalles[1],
        "Monto 2": lstMontos[1],
        "Detalle 3": lstDetalles[2],
        "Monto 3": lstMontos[2],
        "Detalle 4": lstDetalles[3],
        "Monto 4": lstMontos[3],
        "Detalle 5": lstDetalles[4],
        "Monto 5": lstMontos[4],

        "Pago 1": lstPagos[0],
        "Fecha 1": lstFechas[0],
        "Pago 2": lstPagos[1],
        "Fecha 2": lstFechas[1],
        "Pago 3": lstPagos[2],
        "Fecha 3": lstFechas[2],
        "Pago 4": lstPagos[3],
        "Fecha 4": lstFechas[3],
        "Pago 5": lstPagos[4],
        "Fecha 5": lstFechas[4],
        "Pago 6": lstPagos[5],
        "Fecha 6": lstFechas[5],
        "Pago 7": lstPagos[6],
        "Fecha 7": lstFechas[6],
        "Pago 8": lstPagos[7],
        "Fecha 8": lstFechas[7],
        "Pago 9": lstPagos[8],
        "Fecha 9": lstFechas[8],
        "Pago 10": lstPagos[9],
        "Fecha 10": lstFechas[9],
        "Pago 11": lstPagos[10],
        "Fecha 11": lstFechas[10],
        "Pago 12": lstPagos[11],
        "Fecha 12": lstFechas[11],
        "Pago 13": lstPagos[12],
        "Fecha 13": lstFechas[12],
        "Pago 14": lstPagos[13],
        "Fecha 14": lstFechas[13],
        "Pago 15": lstPagos[14],
        "Fecha 15": lstFechas[14],
        "Pago 16": lstPagos[15],
        "Fecha 16": lstFechas[15],
        "Pago 17": lstPagos[16],
        "Fecha 17": lstFechas[16],
        "Pago 18": lstPagos[17],
        "Fecha 18": lstFechas[17],
        "Pago 19": lstPagos[18],
        "Fecha 19": lstFechas[18],
        "Pago 20": lstPagos[19],
        "Fecha 20": lstFechas[19],
        "Pago 21": lstPagos[20],
        "Fecha 21": lstFechas[20],
        "Pago 22": lstPagos[21],
        "Fecha 22": lstFechas[21],
        "Pago 23": lstPagos[22],
        "Fecha 23": lstFechas[22],
        "Pago 24": lstPagos[23],
        "Fecha 24": lstFechas[23],
        "Pago 25": lstPagos[24],
        "Fecha 25": lstFechas[24],
        "Pago 26": lstPagos[25],
        "Fecha 26": lstFechas[25],
        "Pago 27": lstPagos[26],
        "Fecha 27": lstFechas[26],
        "Pago 28": lstPagos[27],
        "Fecha 28": lstFechas[27],
        "Pago 29": lstPagos[28],
        "Fecha 29": lstFechas[28],
        "Pago 30": lstPagos[29],
        "Fecha 30": lstFechas[29],
        "Monto TOTAL PAGADO": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    this.lstExpConst.forEach(e => {
      // Pagos
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

      let lstPagos: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];
      let lstFechas: Array<any> = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 30; j++) {
        if (!!pagitos[j]) {
          lstPagos[j] = pagitos[j].nmonto;
          lstFechas[j] = pagitos[j].sfecha;
        }
      }

      // Contratos
      let sumacontratos = 0;
      let contratitos = this.lstContratos.filter(contr => {
        if (contr.sexpediente == e.sexpediente) {
          sumacontratos += contr.nmonto;
          return true;
        } else {
          return false;
        }
      });

      let lstMontos: Array<any> = [
        '-', '-', '-', '-', '-',
      ];
      let lstDetalles: Array<any> = [
        '-', '-', '-', '-', '-',
      ];

      for (let j = 0; j < 5; j++) {
        if (!!contratitos[j]) {
          lstMontos[j] = contratitos[j].nmonto;
          lstDetalles[j] = contratitos[j].sdetalle;
        }
      }

      todo_const.push({
        "Expediente": e.sexpediente,
        "Materia": e.smateria,
        "Especialidad": e.sespecialidad,
        "Demandante": e.sdemandante,
        "Demandado": e.sdemandado,
        "Inicio": e.sfechainicio,

        "Monto TOTAL CONTRATO": sumacontratos,
        "Detalle 1": lstDetalles[0],
        "Monto 1": lstMontos[0],
        "Detalle 2": lstDetalles[1],
        "Monto 2": lstMontos[1],
        "Detalle 3": lstDetalles[2],
        "Monto 3": lstMontos[2],
        "Detalle 4": lstDetalles[3],
        "Monto 4": lstMontos[3],
        "Detalle 5": lstDetalles[4],
        "Monto 5": lstMontos[4],

        "Pago 1": lstPagos[0],
        "Fecha 1": lstFechas[0],
        "Pago 2": lstPagos[1],
        "Fecha 2": lstFechas[1],
        "Pago 3": lstPagos[2],
        "Fecha 3": lstFechas[2],
        "Pago 4": lstPagos[3],
        "Fecha 4": lstFechas[3],
        "Pago 5": lstPagos[4],
        "Fecha 5": lstFechas[4],
        "Pago 6": lstPagos[5],
        "Fecha 6": lstFechas[5],
        "Pago 7": lstPagos[6],
        "Fecha 7": lstFechas[6],
        "Pago 8": lstPagos[7],
        "Fecha 8": lstFechas[7],
        "Pago 9": lstPagos[8],
        "Fecha 9": lstFechas[8],
        "Pago 10": lstPagos[9],
        "Fecha 10": lstFechas[9],
        "Pago 11": lstPagos[10],
        "Fecha 11": lstFechas[10],
        "Pago 12": lstPagos[11],
        "Fecha 12": lstFechas[11],
        "Pago 13": lstPagos[12],
        "Fecha 13": lstFechas[12],
        "Pago 14": lstPagos[13],
        "Fecha 14": lstFechas[13],
        "Pago 15": lstPagos[14],
        "Fecha 15": lstFechas[14],
        "Pago 16": lstPagos[15],
        "Fecha 16": lstFechas[15],
        "Pago 17": lstPagos[16],
        "Fecha 17": lstFechas[16],
        "Pago 18": lstPagos[17],
        "Fecha 18": lstFechas[17],
        "Pago 19": lstPagos[18],
        "Fecha 19": lstFechas[18],
        "Pago 20": lstPagos[19],
        "Fecha 20": lstFechas[19],
        "Pago 21": lstPagos[20],
        "Fecha 21": lstFechas[20],
        "Pago 22": lstPagos[21],
        "Fecha 22": lstFechas[21],
        "Pago 23": lstPagos[22],
        "Fecha 23": lstFechas[22],
        "Pago 24": lstPagos[23],
        "Fecha 24": lstFechas[23],
        "Pago 25": lstPagos[24],
        "Fecha 25": lstFechas[24],
        "Pago 26": lstPagos[25],
        "Fecha 26": lstFechas[25],
        "Pago 27": lstPagos[26],
        "Fecha 27": lstFechas[26],
        "Pago 28": lstPagos[27],
        "Fecha 28": lstFechas[27],
        "Pago 29": lstPagos[28],
        "Fecha 29": lstFechas[28],
        "Pago 30": lstPagos[29],
        "Fecha 30": lstFechas[29],
        "Monto TOTAL PAGADO": sumapagos,
        "Fecha último Pago": fultimopa,
        "Monto último Pago": nultimopa
      });
    });

    const worksheet1 = XLSX.utils.json_to_sheet(todo_laboral);
    const worksheet2 = XLSX.utils.json_to_sheet(todo_familia);
    const worksheet3 = XLSX.utils.json_to_sheet(todo_civil);
    const worksheet4 = XLSX.utils.json_to_sheet(todo_penal);
    const worksheet5 = XLSX.utils.json_to_sheet(todo_const);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Laboral");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Familia");
    XLSX.utils.book_append_sheet(workbook, worksheet3, "Civil");
    XLSX.utils.book_append_sheet(workbook, worksheet4, "Penal");
    XLSX.utils.book_append_sheet(workbook, worksheet5, "Constitucional");
    XLSX.writeFile(workbook, 'Expedientes.xlsx', { compression: true });
  }
}
