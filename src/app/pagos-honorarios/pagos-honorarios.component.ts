import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PagoHonorario } from './../__clases/pago-honorario';
import * as XLSX from 'xlsx';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pagos-honorarios',
  templateUrl: './pagos-honorarios.component.html',
  styleUrls: ['./pagos-honorarios.component.scss']
})
export class PagosHonorariosComponent implements OnInit {
  frmPagos: FormGroup;
  lstPagos: Array<PagoHonorario> = [];
  lLoading = false;
  pagosChart: any;
  nSumaTotal = 0;

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

  ngOnInit(): void {
    let dHoy = new Date();
    let dFinMes = new Date(dHoy.getFullYear(), dHoy.getMonth() + 1, 0);

    let sMonth = ((dHoy.getMonth() + 1) >= 10) ? (dHoy.getMonth() + 1) : ('0' + (dHoy.getMonth() + 1));
    let sinicio = dHoy.getFullYear() + '-' + sMonth + '-' + '01';
    let sfinal = dHoy.getFullYear() + '-' + sMonth + '-' + dFinMes.getDate();

    this.frmPagos.setValue({
      sinicio: sinicio,
      sfinal: sfinal
    });

    this.getPagos()
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
        console.log({ res })

        this.lstPagos = [];
        this.nSumaTotal = 0;
        res.forEach(payment => {
          let objPago = new PagoHonorario();
          objPago.idpago = payment.idpago;
          objPago.nmonto = payment.nmonto;
          objPago.sdescripcion = payment.sdescripcion;
          objPago.sexpediente = payment.sexpediente;
          objPago.sfecha = payment.sfecha;
          objPago.sfechalocal = payment.sfecha.slice(8, 10) + '/' + payment.sfecha.slice(5, 7) + '/' + payment.sfecha.slice(0, 4);

          this.lstPagos.push(objPago);
          this.nSumaTotal += payment.nmonto;
        });


        this.lLoading = false;
        // this.frmPagos.reset();

        this.armarChart();
        obs.unsubscribe();
      });
  }

  armarChart() {
    let sinicio: string = this.frmPagos.controls['sinicio'].value;
    let sfinal: string = this.frmPagos.controls['sfinal'].value;
    let dInicio = new Date(Number(sinicio.slice(0, 4)), Number(sinicio.slice(5, 7)) - 1, Number(sinicio.slice(8, 10)));
    let dFinal = new Date(Number(sfinal.slice(0, 4)), Number(sfinal.slice(5, 7)) - 1, Number(sfinal.slice(8, 10)));

    let nDias = (dFinal.getTime() - dInicio.getTime()) / (1000 * 60 * 60 * 24);
    console.log({
      dInicio,
      dFinal,
      nDias
    });

    // lista de los días a graficar
    let lstLabels = [];
    let lstMontosLaboral: Array<any> = [];
    let lstMontosFamilia: Array<any> = [];
    let lstMontosCivil: Array<any> = [];
    let lstMontosPenal: Array<any> = [];
    let lstMontosConsti: Array<any> = [];
    let lstMontosAll: Array<any> = [];

    for (let i = 0; i <= nDias; i++) {
      let dFecha = new Date(dInicio.getFullYear(), dInicio.getMonth(), dInicio.getDate() + i);
      let sLabel = '' +
        (dFecha.getDate() >= 10 ? dFecha.getDate() : '0' + dFecha.getDate())
        + '/' +
        ((dFecha.getMonth() + 1) >= 10 ? (dFecha.getMonth() + 1) : '0' + (dFecha.getMonth() + 1));

      let sLabelLong = dFecha.getFullYear() + '-' +
        ((dFecha.getMonth() + 1) >= 10 ? (dFecha.getMonth() + 1) : '0' + (dFecha.getMonth() + 1)) +
        '-' + (dFecha.getDate() >= 10 ? dFecha.getDate() : '0' + dFecha.getDate())

      lstLabels.push(sLabel);
      lstMontosLaboral.push({ nmonto: 0, sfecha: sLabelLong });
      lstMontosFamilia.push({ nmonto: 0, sfecha: sLabelLong });
      lstMontosCivil.push({ nmonto: 0, sfecha: sLabelLong });
      lstMontosPenal.push({ nmonto: 0, sfecha: sLabelLong });
      lstMontosConsti.push({ nmonto: 0, sfecha: sLabelLong });
      lstMontosAll.push({ nmonto: 0, sfecha: sLabelLong });
    }

    // Match entre los pagos encontrados y los días para graficar
    this.lstPagos.forEach(pago => {
      let sarea = pago.sexpediente.split('-')[5];
      // separar por area
      if (sarea == 'LA') {
        lstMontosLaboral.forEach(m => {
          if (pago.sfecha == m.sfecha) {
            m.nmonto += pago.nmonto;
          }
        })
      } else if (sarea == 'FC' || sarea == 'FT') {
        lstMontosFamilia.forEach(m => {
          if (pago.sfecha == m.sfecha) {
            m.nmonto += pago.nmonto;
          }
        })
      } else if (sarea == 'CI') {
        lstMontosCivil.forEach(m => {
          if (pago.sfecha == m.sfecha) {
            m.nmonto += pago.nmonto;
          }
        })
      } else if (sarea == 'PE') {
        lstMontosPenal.forEach(m => {
          if (pago.sfecha == m.sfecha) {
            m.nmonto += pago.nmonto;
          }
        })
      } else if (sarea == 'DC') {
        lstMontosConsti.forEach(m => {
          if (pago.sfecha == m.sfecha) {
            m.nmonto += pago.nmonto;
          }
        })
      }

      lstMontosAll.forEach(m => {
        if (pago.sfecha == m.sfecha) {
          m.nmonto += pago.nmonto;
        }
      })
    });

    // Graficar
    if (this.pagosChart) this.pagosChart.destroy();
    this.pagosChart = new Chart("PagosChart", {
      type: 'bar',
      data: {
        labels: lstLabels,
        datasets: [
          {
            label: 'Laboral',
            data: lstMontosLaboral.map(x => x.nmonto),
            borderColor: 'rgb(0,256,0)',
            backgroundColor: 'rgba(0,256,0,1)',
            order: 1,
          },
          {
            label: 'Familia',
            data: lstMontosFamilia.map(x => x.nmonto),
            borderColor: '#ff1493',
            backgroundColor: '#ff1493',
            order: 1,
          },
          {
            label: 'Civil',
            data: lstMontosCivil.map(x => x.nmonto),
            borderColor: '#ff4500',
            backgroundColor: '#ff4500',
            order: 1,
          },
          {
            label: 'Penal',
            data: lstMontosPenal.map(x => x.nmonto),
            borderColor: '#808080',
            backgroundColor: '#808080',
            order: 1,
          },
          {
            label: 'Constitucional',
            data: lstMontosConsti.map(x => x.nmonto),
            borderColor: '#ff0000',
            backgroundColor: '#ff0000',
            order: 1,
          },
          {
            label: 'Total',
            data: lstMontosAll.map(x => x.nmonto),
            borderColor: '#087060',
            backgroundColor: '#087060',
            order: 0,
            type: 'line',
            borderWidth: 2,
            borderDash: [2]
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Evolución de los Pagos SG'
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }
}
