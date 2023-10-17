import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjPago {
  sexpediente: string;
  nmontocontrato: number;
  lstpagos: Array<{
    nmonto: number,
    sfecha: string
  }>;
  constructor(a: {
    sexpediente: string,
    nmontocontrato: number,
    lstpagos: Array<{
      nmonto: number,
      sfecha: string
    }>
  }){
    this.sexpediente = a.sexpediente;
    this.nmontocontrato = a.nmontocontrato;
    this.lstpagos = a.lstpagos;
  }
}

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}/;

  lstpagos: Array<ObjPago> = [
    new ObjPago({
      sexpediente: '',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 0,
          sfecha: ''
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00983-2019-0-0401-JR-FC-03',
      nmontocontrato: 800,
      lstpagos: [
        {
          nmonto: 250,
          sfecha: '19/03/2019'
        },
        {
          nmonto: 200,
          sfecha: '16/07/2019'
        },
        {
          nmonto: 100,
          sfecha: '04/10/2019'
        },
        {
          nmonto: 250,
          sfecha: '22/03/2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00010-2023-0-1401-JP-FC-01',
      nmontocontrato: 3000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '04.11.22'
        },
        {
          nmonto: 200,
          sfecha: '16.01.23'
        },
        {
          nmonto: 500,
          sfecha: '24.03.23'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '12841-2021-0-0401-JR-FC-04',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '...'
        },
        {
          nmonto: 500,
          sfecha: '12.01.2022'
        },
        {
          nmonto: 250,
          sfecha: '03.06.2022'
        },
        {
          nmonto: 250,
          sfecha: '18.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01291-2021-0-0401-JP-FC-09',
      nmontocontrato: 1200,
      lstpagos: [
        {
          nmonto: 700,
          sfecha: '...'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00992-2012-0-0401-JR-CI-02',
      nmontocontrato: 800,
      lstpagos: [
        {
          nmonto: 250,
          sfecha: '19.03.2019'
        },
        {
          nmonto: 200,
          sfecha: '16.07.2019'
        },
        {
          nmonto: 100,
          sfecha: '04.10.2019'
        },
        {
          nmonto: 250,
          sfecha: '22.03.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02505-2009-0-0401-JR-CI-08',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '05.01.2022'
        },
        {
          nmonto: 500,
          sfecha: '10.01.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01118-2021-0-0401-JR-LA-07',
      nmontocontrato: 2800,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '24.08.2021'
        },
        {
          nmonto: 1000,
          sfecha: '19.04.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03830-2021-0-0401-JR-LA-07',
      nmontocontrato: 2600,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '12.11.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01295-2022-0-0401-JR-LA-08',
      nmontocontrato: 4500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '28.03.2022'
        },
        {
          nmonto: 1000,
          sfecha: '01.06.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02532-2021-0-0401-JR-LA-01',
      nmontocontrato: 3700,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '16.06.2021'
        },
        {
          nmonto: 1000,
          sfecha: '19.01.2022'
        },
        {
          nmonto: 1700,
          sfecha: '23.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01127-2022-0-0401-JR-LA-09',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '19.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04577-2021-0-0401-JR-LA-02',
      nmontocontrato: 2400,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '17.05.2022'
        },
        {
          nmonto: 1000,
          sfecha: '26.01.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01954-2022-0-0401-JR-LA-07',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '02.09.2022'
        },
        {
          nmonto: 1000,
          sfecha: '30.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01877-2021-0-0401-JR-LA-01',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '25.05.2021'
        },
        {
          nmonto: 1000,
          sfecha: '01.04.2022'
        },
        {
          nmonto: 1000,
          sfecha: '16.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01536-2021-0-0401-JR-LA-01',
      nmontocontrato: 2600,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '26.04.2021'
        },
        {
          nmonto: 1000,
          sfecha: '14.07.2021'
        },
        {
          nmonto: 800,
          sfecha: '13.04.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04830-2021-0-0401-JR-LA-08',
      nmontocontrato: 4700,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '17.12.2021'
        },
        {
          nmonto: 500,
          sfecha: '07.02.2023'
        },
        {
          nmonto: 500,
          sfecha: '28.02.2023'
        },
        {
          nmonto: 500,
          sfecha: '15.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05017-2021-0-0401-JR-LA-02',
      nmontocontrato: 3100,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '26.11.2021'
        },
        {
          nmonto: 500,
          sfecha: '24.02.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '08202-2019-0-0401-JR-LA-07',
      nmontocontrato: 1650,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '17.02.2023'
        },
        {
          nmonto: 500,
          sfecha: '05.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03796-2021-0-0401-JR-LA-08',
      nmontocontrato: 5000,
      lstpagos: [
        {
          nmonto: 2500,
          sfecha: '28.12.2022'
        },
        {
          nmonto: 1000,
          sfecha: '15.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '03.05.2022'
        },
        {
          nmonto: 500,
          sfecha: '23.11.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03142-2021-0-0401-JR-LA-08',
      nmontocontrato: 2850,
      lstpagos: [
        {
          nmonto: 2850,
          sfecha: '06.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00112-2022-0-0401-JR-LA-07',
      nmontocontrato: 2600,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '03.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '02.06.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05079-2021-0-0401-JR-LA-02',
      nmontocontrato: 2100,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '29.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '21.01.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03805-2021-0-0401-JR-LA-01',
      nmontocontrato: 5100,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '15.11.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02177-2021-0-0401-JR-LA-09',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 2000,
          sfecha: '16.11.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00003-2021-0-0401-JR-LA-02',
      nmontocontrato: 4000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '13.09.2021'
        },
        {
          nmonto: 2500,
          sfecha: '21.12.2022'
        },
        {
          nmonto: 500,
          sfecha: '21.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02773-2023-0-0401-JR-LA-01',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '14.06.23'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '25153-2018-0-1801-JR-LA-04',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '08.02.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03561-2022-0-0401-JR-LA-09',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 2000,
          sfecha: '02.08.2022'
        },
        {
          nmonto: 1000,
          sfecha: '09.08.2022'
        },
        {
          nmonto: 1000,
          sfecha: '11.08.2022'
        },
        {
          nmonto: 1000,
          sfecha: '19.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '10585-2017-0-0401-JR-LA-07',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 250,
          sfecha: '...'
        },
        {
          nmonto: 250,
          sfecha: '04.02.2021'
        },
        {
          nmonto: 100,
          sfecha: '07.04.2021'
        },
        {
          nmonto: 100,
          sfecha: '09.08.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02075-2020-0-0401-JR-LA-01',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '30.09.2020'
        },
        {
          nmonto: 500,
          sfecha: '02.01.2021'
        },
        {
          nmonto: 1500,
          sfecha: '03.06.2020'
        },
        {
          nmonto: 500,
          sfecha: '20.06.2022'
        },
        {
          nmonto: 300,
          sfecha: '21.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '09558-2018-0-0401-JR-LA-08',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 200,
          sfecha: '05.10.2020'
        },
        {
          nmonto: 100,
          sfecha: '01.07.2020'
        },
        {
          nmonto: 100,
          sfecha: '01.08.2020'
        },
        {
          nmonto: 200,
          sfecha: '05.01.2021'
        },
        {
          nmonto: 200,
          sfecha: '19.01.2021'
        },
        {
          nmonto: 100,
          sfecha: '04.04.2021'
        },
        {
          nmonto: 100,
          sfecha: '20.04.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01268-2021-0-0401-JR-LA-08',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: 'xx.04.2021'
        },
        {
          nmonto: 500,
          sfecha: '03.05.2021'
        },
        {
          nmonto: 500,
          sfecha: '11.09.2021'
        },
        {
          nmonto: 500,
          sfecha: '08.11.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01553-2021-0-0401-JR-LA-08',
      nmontocontrato: 4000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '16.07.2021'
        },
        {
          nmonto: 500,
          sfecha: '02.03.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01885-2020-0-0401-JR-LA-09',
      nmontocontrato: 2625,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '19.04.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01452-2020-0-0401-JR-LA-07',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '21.07.2020'
        },
        {
          nmonto: 1000,
          sfecha: '24.06.2021'
        },
        {
          nmonto: 1000,
          sfecha: '09.09.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01856-2015-0-0401-JR-CI-05',
      nmontocontrato: 1500,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '25.01.2021'
        },
        {
          nmonto: 150,
          sfecha: '25.01.2021'
        },
        {
          nmonto: 250,
          sfecha: '24.09.2021'
        },
        {
          nmonto: 100,
          sfecha: '25.11.2021'
        },
        {
          nmonto: 100,
          sfecha: '28.04.2022'
        },
        {
          nmonto: 200,
          sfecha: '10.12.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03941-2022-0-0401-JR-LA-09',
      nmontocontrato: 15840,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '13.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01333-2021-0-0401-JR-LA-09',
      nmontocontrato: 3900,
      lstpagos: [
        {
          nmonto: 200,
          sfecha: '23.07.2021'
        },
        {
          nmonto: 400,
          sfecha: '28.09.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '07605-2019-0-0401-JR-LA-08',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '24.06.2022'
        },
        {
          nmonto: 1500,
          sfecha: '18.03.2022'
        },
        {
          nmonto: 1000,
          sfecha: '01.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01536-2021-0-0401-JR-LA-01',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '10.03.2021'
        },
        {
          nmonto: 1000,
          sfecha: '14.07.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04830-2021-0-0401-JR-LA-08',
      nmontocontrato: 5700,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '16.12.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02450-2022-0-1801-JR-LA-09',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '18.02.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01295-2022-0-0401-JR-LA-08',
      nmontocontrato: 4500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '28.03.2022'
        },
        {
          nmonto: 1000,
          sfecha: '01.06.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01954-2022-0-0401-JR-LA-07',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '02.09.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04176-2021-0-0401-JR-LA-02',
      nmontocontrato: 4500,
      lstpagos: [
        {
          nmonto: 4500,
          sfecha: 'xx.09.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05101-2021-0-0401-JR-LA-08',
      nmontocontrato: 4000,
      lstpagos: [
        {
          nmonto: 250,
          sfecha: '27.10.2021'
        },
        {
          nmonto: 1000,
          sfecha: '05.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '03.02.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04907-2022-0-0401-JR-LA-02',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '01.10.2022'
        },
        {
          nmonto: 500,
          sfecha: '21.11.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04926-2022-0-0401-JR-LA-07',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '01.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04856-2022-0-0401-JR-LA-07',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '01.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04951-2022-0-0401-JR-LA-09',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '10.10.2022'
        },
        {
          nmonto: 500,
          sfecha: '25.10.2022'
        },
        {
          nmonto: 500,
          sfecha: '30.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05031-2022-0-0401-JR-LA-02',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '03.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05878-2022-0-0401-JR-LA-09',
      nmontocontrato: 3500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '08.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02725-2022-0-0401-JR-LA-07',
      nmontocontrato: 6500,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '09.05.2022'
        },
        {
          nmonto: 500,
          sfecha: '11.05.2022'
        },
        {
          nmonto: 500,
          sfecha: '17.06.2022'
        },
        {
          nmonto: 1500,
          sfecha: '20.03.2023'
        },
        {
          nmonto: 1000,
          sfecha: '20.03.2023'
        },
        {
          nmonto: 1000,
          sfecha: '06.09.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03352-2022-0-0401-JR-LA-07',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 300,
          sfecha: '29.03.2023'
        },
        {
          nmonto: 1000,
          sfecha: '29.03.2023'
        },
        {
          nmonto: 1300,
          sfecha: '31.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01101-2021-0-0401-JR-LA-01',
      nmontocontrato: 6642.80,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '16.06.2021'
        },
        {
          nmonto: 500,
          sfecha: '28.01.2021'
        },
        {
          nmonto: 500,
          sfecha: '14.09.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02906-2020-0-0401-JR-LA-02',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '24.11.2020'
        },
        {
          nmonto: 500,
          sfecha: '19.05.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03936-2022-0-0401-JR-LA-07',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '04.07.2022'
        },
        {
          nmonto: 500,
          sfecha: '14.02.2023'
        },
        {
          nmonto: 500,
          sfecha: '20.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03562-2022-0-0401-JR-LA-07',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '13.05.2022'
        },
        {
          nmonto: 500,
          sfecha: '18.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01928-2022-0-0401-JR-LA-07',
      nmontocontrato: 4800,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '04.05.2022'
        },
        {
          nmonto: 1000,
          sfecha: '09.12.2022'
        },
        {
          nmonto: 1000,
          sfecha: '09.02.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04482-2021-0-0401-JR-LA-07',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '23.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '26.11.2021'
        },
        {
          nmonto: 200,
          sfecha: '27.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00325-2022-0-0401-JR-LA-01',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 105,
          sfecha: 'xx.xx.xxxx'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03020-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '17.12.2021'
        },
        {
          nmonto: 300,
          sfecha: '04.02.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03024-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '15.11.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02470-2022-0-0401-JR-LA-07',
      nmontocontrato: 2000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '25.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00798-2022-0-0401-JR-LA-01',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '09.02.2023'
        },
        {
          nmonto: 1000,
          sfecha: '09.02.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02951-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 800,
          sfecha: '01.09.2021'
        },
        {
          nmonto: 200,
          sfecha: '16.10.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02668-2022-0-0401-JR-LA-07',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '13.01.2023'
        },
        {
          nmonto: 500,
          sfecha: '14.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02947-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '17.08.2021'
        },
        {
          nmonto: 500,
          sfecha: '06.09.2021'
        },
        {
          nmonto: 500,
          sfecha: '03.11.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03173-2021-0-0401-JR-LA-09',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '29.09.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04466-2022-0-0401-JR-LA-07',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 2000,
          sfecha: '02.02.2022'
        },
        {
          nmonto: 1000,
          sfecha: '05.01.2023'
        },
        {
          nmonto: 1000,
          sfecha: '20.04.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02670-2022-0-0401-JR-LA-08',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '06.06.2022'
        },
        {
          nmonto: 1000,
          sfecha: '07.02.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03019-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '30.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '13.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03011-2022-0-0401-JR-LA-08',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '19.10.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02806-2022-0-0401-JR-LA-07',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '19.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01865-2022-0-0401-JR-LA-08',
      nmontocontrato: 6230,
      lstpagos: [
        {
          nmonto: 200,
          sfecha: 'VIVIANA'
        },
        {
          nmonto: 300,
          sfecha: 'VIVIANA'
        },
        {
          nmonto: 500,
          sfecha: '15.07.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03025-2021-0-0401-JR-LA-01',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '12.11.2021'
        },
        {
          nmonto: 300,
          sfecha: '22.03.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03023-2021-0-0401-JR-LA-01',
      nmontocontrato: 5930,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '25.08.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01268-2021-0-0401-JR-LA-08',
      nmontocontrato: 0,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '01.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05124-2019-0-0401-JR-LA-07',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '28.10.2019'
        },
        {
          nmonto: 1000,
          sfecha: '05.07.2020'
        },
        {
          nmonto: 1000,
          sfecha: '28.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '31.01.2022'
        },
        {
          nmonto: 1000,
          sfecha: '15.09.2022'
        },
        {
          nmonto: 500,
          sfecha: '30.11.2022'
        },
        {
          nmonto: 1000,
          sfecha: '02.10.2022'
        },
        {
          nmonto: 2000,
          sfecha: '24.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '06973-2019-0-0401-JR-LA-01',
      nmontocontrato: 8800,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '11.09.2019'
        },
        {
          nmonto: 400,
          sfecha: '17.04.2020'
        },
        {
          nmonto: 1700,
          sfecha: '10.04.2021'
        },
        {
          nmonto: 1000,
          sfecha: '24.04.2021'
        },
        {
          nmonto: 1500,
          sfecha: '17.01.2022'
        },
        {
          nmonto: 500,
          sfecha: '30.01.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05006-2021-0-0401-JR-LA-02',
      nmontocontrato: 4000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '29.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '18.02.2022'
        },
        {
          nmonto: 500,
          sfecha: '16.06.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02377-2019-0-0401-JR-LA-02',
      nmontocontrato: 3200,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '13.01.2022'
        },
        {
          nmonto: 1200,
          sfecha: '19.01.2023'
        },
        {
          nmonto: 500,
          sfecha: '05.04.2023'
        },
        {
          nmonto: 1000,
          sfecha: '25.04.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01404-2020-0-0401-JR-LA-02',
      nmontocontrato: 5500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '25.07.2020'
        },
        {
          nmonto: 1000,
          sfecha: '08.09.2020'
        },
        {
          nmonto: 500,
          sfecha: '02.02.2021'
        },
        {
          nmonto: 1000,
          sfecha: '23.03.2021'
        },
        {
          nmonto: 1000,
          sfecha: '02.06.2021'
        },
        {
          nmonto: 500,
          sfecha: '13.01.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02672-2020-0-0401-JR-LA-09',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '11.12.2020'
        },
        {
          nmonto: 1000,
          sfecha: '03.01.2022'
        },
        {
          nmonto: 500,
          sfecha: '21.02.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05164-2018-0-0401-JR-LA-07',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 1500,
          sfecha: '07.09.2019'
        },
        {
          nmonto: 1000,
          sfecha: '29.10.2013'
        },
        {
          nmonto: 1000,
          sfecha: '31.10.2019'
        },
        {
          nmonto: 300,
          sfecha: '11.11.2019'
        },
        {
          nmonto: 1000,
          sfecha: '29.11.2019'
        },
        {
          nmonto: 1000,
          sfecha: '30.11.2019'
        },
        {
          nmonto: 2200,
          sfecha: 'VIVIANA'
        },
        {
          nmonto: 500,
          sfecha: '12.01.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '08560-2019-0-0401-JR-LA-02',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '29.11.2019'
        },
        {
          nmonto: 1000,
          sfecha: '12.12.2019'
        },
        {
          nmonto: 500,
          sfecha: '27.04.2020'
        },
        {
          nmonto: 3000,
          sfecha: '29.04.2021'
        },
        {
          nmonto: 1000,
          sfecha: '19.12.2020'
        },
        {
          nmonto: 750,
          sfecha: '28.09.2021'
        },
        {
          nmonto: 750,
          sfecha: '28.10.2021'
        },
        {
          nmonto: 250,
          sfecha: '27.11.2021'
        },
        {
          nmonto: 250,
          sfecha: '02.12.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '07141-2019-0-0401-JR-LA-02',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 700,
          sfecha: '01.10.2019'
        },
        {
          nmonto: 300,
          sfecha: '04.10.2019'
        },
        {
          nmonto: 1000,
          sfecha: '29.10.2019'
        },
        {
          nmonto: 2000,
          sfecha: '07.11.2019'
        },
        {
          nmonto: 1000,
          sfecha: '18.02.2021'
        },
        {
          nmonto: 500,
          sfecha: '30.04.2021'
        },
        {
          nmonto: 500,
          sfecha: '11.10.2021'
        },
        {
          nmonto: 1000,
          sfecha: '18.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '03.01.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '06071-2018-0-0401-JR-LA-09',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05145-2018-0-0401-JR-LA-02',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 300,
          sfecha: '21.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05738-2019-0-0401-JR-LA-01',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '08.08.2019'
        },
        {
          nmonto: 200,
          sfecha: '10.08.2020'
        },
        {
          nmonto: 500,
          sfecha: '02.09.2020'
        },
        {
          nmonto: 1000,
          sfecha: '19.04.2021'
        },
        {
          nmonto: 300,
          sfecha: '20.04.2021'
        },
        {
          nmonto: 500,
          sfecha: '05.07.2021'
        },
        {
          nmonto: 200,
          sfecha: '08.08.2021'
        },
        {
          nmonto: 1000,
          sfecha: '05.06.2021'
        },
        {
          nmonto: 1500,
          sfecha: '08.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '16.02.2022'
        },
        {
          nmonto: 250,
          sfecha: '08.11.2022'
        },
        {
          nmonto: 550,
          sfecha: '24.11.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01896-2020-0-0401-JR-LA-02',
      nmontocontrato: 10500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '26.02.2021'
        },
        {
          nmonto: 1000,
          sfecha: '29.03.2021'
        },
        {
          nmonto: 1000,
          sfecha: '11.05.2021'
        },
        {
          nmonto: 250,
          sfecha: '07.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '21.12.2021'
        },
        {
          nmonto: 1500,
          sfecha: '28.04.2022'
        },
        {
          nmonto: 750,
          sfecha: '18.08.2022'
        },
        {
          nmonto: 500,
          sfecha: '07.10.2022'
        },
        {
          nmonto: 1500,
          sfecha: '14.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '06703-2019-0-0401-JR-LA-01',
      nmontocontrato: 6300,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '03.09.2019'
        },
        {
          nmonto: 1000,
          sfecha: '14.01.2020'
        },
        {
          nmonto: 1000,
          sfecha: '16.02.2021'
        },
        {
          nmonto: 1000,
          sfecha: '06.03.2022'
        },
        {
          nmonto: 1000,
          sfecha: '31.07.2022'
        },
        {
          nmonto: 500,
          sfecha: '19.10.2022'
        },
        {
          nmonto: 400,
          sfecha: '13.12.2022'
        },
        {
          nmonto: 400,
          sfecha: '10.04.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '07433-2018-0-0401-JR-LA-08',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 2000,
          sfecha: '12.09.2018'
        },
        {
          nmonto: 1000,
          sfecha: '17.05.2019'
        },
        {
          nmonto: 1000,
          sfecha: '10.10.2019'
        },
        {
          nmonto: 1500,
          sfecha: '22.10.2019'
        },
        {
          nmonto: 2500,
          sfecha: '31.01.2020'
        },
        {
          nmonto: 1000,
          sfecha: '24.08.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04966-2019-0-0401-JR-LA-09',
      nmontocontrato: 7500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '01.07.2019'
        },
        {
          nmonto: 400,
          sfecha: '26.11.2019'
        },
        {
          nmonto: 600,
          sfecha: '31.01.2020'
        },
        {
          nmonto: 1000,
          sfecha: '28.04.2020'
        },
        {
          nmonto: 1000,
          sfecha: '03.09.2020'
        },
        {
          nmonto: 1000,
          sfecha: '03.09.2020'
        },
        {
          nmonto: 500,
          sfecha: '20.10.2020'
        },
        {
          nmonto: 500,
          sfecha: '11.12.2020'
        },
        {
          nmonto: 900,
          sfecha: '24.03.2021'
        },
        {
          nmonto: 600,
          sfecha: '04.10.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03113-2022-0-0401-JR-LA-09',
      nmontocontrato: 11000,
      lstpagos: [
        {
          nmonto: 250,
          sfecha: '01.03.2022'
        },
        {
          nmonto: 250,
          sfecha: '01.07.2022'
        },
        {
          nmonto: 500,
          sfecha: '12.07.2022'
        },
        {
          nmonto: 500,
          sfecha: '22.07.2022'
        },
        {
          nmonto: 1000,
          sfecha: '09.09.2022'
        },
        {
          nmonto: 1000,
          sfecha: '20.10.2022'
        },
        {
          nmonto: 2000,
          sfecha: '09.09.2022'
        },
        {
          nmonto: 1000,
          sfecha: '23.12.2022'
        },
        {
          nmonto: 1000,
          sfecha: '05.01.2023'
        },
        {
          nmonto: 1000,
          sfecha: '30.04.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01396-2020-0-0401-JR-LA-01',
      nmontocontrato: 13800,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: 'xx.05.2020'
        },
        {
          nmonto: 500,
          sfecha: '23.11.2020'
        },
        {
          nmonto: 500,
          sfecha: '03.09.2021'
        },
        {
          nmonto: 500,
          sfecha: '21.06.2021'
        },
        {
          nmonto: 800,
          sfecha: '05.10.2021'
        },
        {
          nmonto: 1100,
          sfecha: '08.03.2022'
        },
        {
          nmonto: 500,
          sfecha: '27.12.2022'
        },
        {
          nmonto: 500,
          sfecha: '30.05.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '08181-2017-0-0401-JR-LA-07',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '02.10.2019'
        },
        {
          nmonto: 2000,
          sfecha: '07.11.2019'
        },
        {
          nmonto: 5000,
          sfecha: '15.01.2020'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '02837-2021-0-0401-JR-LA-01',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '04.08.2021'
        },
        {
          nmonto: 1000,
          sfecha: '19.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '16.12.2021'
        },
        {
          nmonto: 1000,
          sfecha: '18.02.2022'
        },
        {
          nmonto: 1000,
          sfecha: '14.03.2022'
        },
        {
          nmonto: 2500,
          sfecha: '02.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01405-2020-0-0401-JR-LA-01',
      nmontocontrato: 7500,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '06.07.2020'
        },
        {
          nmonto: 900,
          sfecha: '07.08.2020'
        },
        {
          nmonto: 1000,
          sfecha: '01.09.2020'
        },
        {
          nmonto: 1000,
          sfecha: '15.03.2021'
        },
        {
          nmonto: 500,
          sfecha: '15.07.2021'
        },
        {
          nmonto: 500,
          sfecha: '04.11.2021'
        },
        {
          nmonto: 500,
          sfecha: '29.12.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01428-2020-0-0401-JR-LA-02',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: 'xx.07.2020'
        },
        {
          nmonto: 1000,
          sfecha: '16.11.2020'
        },
        {
          nmonto: 1000,
          sfecha: '09.03.2021'
        },
        {
          nmonto: 800,
          sfecha: '29.04.2021'
        },
        {
          nmonto: 1000,
          sfecha: '06.12.2021'
        },
        {
          nmonto: 2000,
          sfecha: '27.07.2022'
        },
        {
          nmonto: 1000,
          sfecha: '28.10.2022'
        },
        {
          nmonto: 700,
          sfecha: '26.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01409-2020-0-0401-JR-LA-08',
      nmontocontrato: 8700,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '30.06.2020'
        },
        {
          nmonto: 900,
          sfecha: '07.07.2020'
        },
        {
          nmonto: 1000,
          sfecha: '21.11.2020'
        },
        {
          nmonto: 1000,
          sfecha: '28.01.2021'
        },
        {
          nmonto: 500,
          sfecha: '04.02.2021'
        },
        {
          nmonto: 1000,
          sfecha: '24.03.2021'
        },
        {
          nmonto: 1500,
          sfecha: '24.06.2021'
        },
        {
          nmonto: 2200,
          sfecha: '05.01.2022'
        },
        {
          nmonto: 500,
          sfecha: '17.05.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01389-2020-0-0401-JR-LA-01',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 2000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01932-2019-0-0401-JR-LA-01',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '01.03.2019'
        },
        {
          nmonto: 1000,
          sfecha: '11.03.2019'
        },
        {
          nmonto: 1000,
          sfecha: '12.05.2021'
        },
        {
          nmonto: 1000,
          sfecha: '15.07.2021'
        },
        {
          nmonto: 1000,
          sfecha: '27.08.2021'
        },
        {
          nmonto: 1000,
          sfecha: '03.11.2021'
        },
        {
          nmonto: 600,
          sfecha: '03.01.2022'
        },
        {
          nmonto: 900,
          sfecha: '03.01.2022'
        },
        {
          nmonto: 1000,
          sfecha: '26.01.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03846-2022-0-0401-JR-LA-07',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '03.08.2022'
        },
        {
          nmonto: 1000,
          sfecha: '30.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01852-2021-0-0401-JR-LA-02',
      nmontocontrato: 7200,
      lstpagos: [
        {
          nmonto: 100,
          sfecha: '30.04.2021'
        },
        {
          nmonto: 900,
          sfecha: '03.05.2021'
        },
        {
          nmonto: 1000,
          sfecha: '19.07.2021'
        },
        {
          nmonto: 1000,
          sfecha: '03.11.2021'
        },
        {
          nmonto: 1500,
          sfecha: '04.05.2021'
        },
        {
          nmonto: 250,
          sfecha: '09.05.2022'
        },
        {
          nmonto: 250,
          sfecha: '01.06.2022'
        },
        {
          nmonto: 1000,
          sfecha: '19.12.2022'
        },
        {
          nmonto: 500,
          sfecha: 'VIVIANA'
        },
        {
          nmonto: 700,
          sfecha: '28.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00511-2019-0-0401-JR-LA-02',
      nmontocontrato: 9500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '15.01.2019'
        },
        {
          nmonto: 2000,
          sfecha: '18.06.2019'
        },
        {
          nmonto: 1000,
          sfecha: '05.07.2019'
        },
        {
          nmonto: 500,
          sfecha: '02.04.2020'
        },
        {
          nmonto: 500,
          sfecha: '10.05.2021'
        },
        {
          nmonto: 1000,
          sfecha: '15.12.2021'
        },
        {
          nmonto: 1500,
          sfecha: '04.04.2022'
        },
        {
          nmonto: 500,
          sfecha: '23.12.2022'
        },
        {
          nmonto: 500,
          sfecha: '15.02.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '06657-2019-0-0401-JR-LA-08',
      nmontocontrato: 9100,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '03.09.2019'
        },
        {
          nmonto: 500,
          sfecha: '12.09.2019'
        },
        {
          nmonto: 1000,
          sfecha: '09.10.2022'
        },
        {
          nmonto: 500,
          sfecha: '22.09.2021'
        },
        {
          nmonto: 500,
          sfecha: '12.03.2021'
        },
        {
          nmonto: 1000,
          sfecha: '18.08.2021'
        },
        {
          nmonto: 1000,
          sfecha: '22.10.2021'
        },
        {
          nmonto: 500,
          sfecha: '04.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '16.12.2021'
        },
        {
          nmonto: 300,
          sfecha: '18.01.2022'
        },
        {
          nmonto: 150,
          sfecha: '02.09.2022'
        },
        {
          nmonto: 600,
          sfecha: '20.04.2022'
        },
        {
          nmonto: 350,
          sfecha: '17.06.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01388-2020-0-0401-JR-LA-07',
      nmontocontrato: 8800,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '08.06.2020'
        },
        {
          nmonto: 500,
          sfecha: '24.06.2020'
        },
        {
          nmonto: 500,
          sfecha: '25.08.2020'
        },
        {
          nmonto: 500,
          sfecha: '19.10.2020'
        },
        {
          nmonto: 400,
          sfecha: '01.03.2020'
        },
        {
          nmonto: 600,
          sfecha: '06.04.2021'
        },
        {
          nmonto: 600,
          sfecha: '16.04.2021'
        },
        {
          nmonto: 600,
          sfecha: '07.05.2021'
        },
        {
          nmonto: 600,
          sfecha: '07.07.2021'
        },
        {
          nmonto: 700,
          sfecha: '03.08.2022'
        },
        {
          nmonto: 500,
          sfecha: '28.08.2021'
        },
        {
          nmonto: 500,
          sfecha: '01.10.2021'
        },
        {
          nmonto: 500,
          sfecha: '22.10.2021'
        },
        {
          nmonto: 500,
          sfecha: '17.11.2021'
        },
        {
          nmonto: 300,
          sfecha: '15.12.2021'
        },
        {
          nmonto: 500,
          sfecha: '19.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04156-2019-0-0401-JR-LA-02',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '17.05.2019'
        },
        {
          nmonto: 1000,
          sfecha: '24.10.2019'
        },
        {
          nmonto: 1000,
          sfecha: '15.12.2019'
        },
        {
          nmonto: 2000,
          sfecha: '06.10.2020'
        },
        {
          nmonto: 2500,
          sfecha: '26.03.2021'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '08183-2017-0-0401-JR-LA-01',
      nmontocontrato: 5000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03926-2019-0-0401-JR-LA-02',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '03.05.2019'
        },
        {
          nmonto: 500,
          sfecha: '01.11.2019'
        },
        {
          nmonto: 500,
          sfecha: '22.04.2020'
        },
        {
          nmonto: 500,
          sfecha: '29.04.2021'
        },
        {
          nmonto: 500,
          sfecha: '19.07.2021'
        },
        {
          nmonto: 200,
          sfecha: '31.08.2022'
        },
        {
          nmonto: 300,
          sfecha: '23.09.2022'
        },
        {
          nmonto: 300,
          sfecha: '29.12.2022'
        },
        {
          nmonto: 500,
          sfecha: '24.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '10249-2018-0-0401-JR-LA-09',
      nmontocontrato: 500,
      lstpagos: [
        {
          nmonto: 500,
          sfecha: '19.12.2019'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '05034-2019-0-0401-JR-LA-08',
      nmontocontrato: 7500,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '09.04.2019'
        },
        {
          nmonto: 1000,
          sfecha: '13.08.2019'
        },
        {
          nmonto: 1000,
          sfecha: '19.08.2020'
        },
        {
          nmonto: 1000,
          sfecha: '25.11.2020'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '00649-2020-0-0401-JR-LA-01',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '31.01.2020'
        },
        {
          nmonto: 500,
          sfecha: '16.03.2023'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01586-2019-0-0401-JR-LA-01',
      nmontocontrato: 7000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '21.02.2019'
        },
        {
          nmonto: 1000,
          sfecha: '24.01.2020'
        },
        {
          nmonto: 500,
          sfecha: '28.01.2020'
        },
        {
          nmonto: 2000,
          sfecha: '07.01.2021'
        },
        {
          nmonto: 1000,
          sfecha: '24.02.2021'
        },
        {
          nmonto: 1500,
          sfecha: '30.05.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '04264-2019-0-0401-JR-LA-07',
      nmontocontrato: 8000,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: '10.05.2019'
        },
        {
          nmonto: 1000,
          sfecha: '09.10.2019'
        },
        {
          nmonto: 500,
          sfecha: '26.11.2020'
        },
        {
          nmonto: 1000,
          sfecha: '16.07.2021'
        },
        {
          nmonto: 1500,
          sfecha: '17.11.2021'
        },
        {
          nmonto: 500,
          sfecha: '29.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '03927-2019-0-0401-JR-LA-01',
      nmontocontrato: 4900,
      lstpagos: [
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 1000,
          sfecha: 'xx.xx.xxxx'
        },
        {
          nmonto: 900,
          sfecha: 'xx.xx.xxxx'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01911-2020-0-0401-JR-LA-02',
      nmontocontrato: 8500,
      lstpagos: [
        {
          nmonto: 700,
          sfecha: '13.10.2020'
        },
        {
          nmonto: 300,
          sfecha: '19.10.2020'
        },
        {
          nmonto: 500,
          sfecha: '14.11.2020'
        },
        {
          nmonto: 500,
          sfecha: '13.01.2020'
        },
        {
          nmonto: 1000,
          sfecha: '19.11.2021'
        },
        {
          nmonto: 1000,
          sfecha: '01.03.2021'
        },
        {
          nmonto: 1000,
          sfecha: '28.12.2021'
        },
        {
          nmonto: 500,
          sfecha: '17.05.2022'
        },
        {
          nmonto: 500,
          sfecha: '24.10.2022'
        },
        {
          nmonto: 1000,
          sfecha: '27.12.2022'
        },
      ]
    }),
    new ObjPago({
      sexpediente: '01462-2020-0-0401-JR-LA-07',
      nmontocontrato: 7300,
      lstpagos: [
        {
          sfecha: '21.04.2021',
          nmonto: 500
        },
        {
          sfecha: '15.10.2020',
          nmonto: 500
        },
        {
          sfecha: '04.05.2020',
          nmonto: 500
        },
        {
          sfecha: '01.06.2021',
          nmonto: 500
        },
        {
          sfecha: '10.08.2021',
          nmonto: 500
        },
        {
          sfecha: '13.10.2021',
          nmonto: 500
        },
        {
          sfecha: '02.12.2021',
          nmonto: 500
        },
        {
          sfecha: '25.03.2022',
          nmonto: 500
        },
        {
          sfecha: '24.06.2022',
          nmonto: 500
        },
        {
          sfecha: '25.01.2023',
          nmonto: 500
        },
      ]
    }),
    new ObjPago({
      sexpediente: '',
      nmontocontrato: 0,
      lstpagos: [
        {
          sfecha: '',
          nmonto: 0
        },
      ]
    })

  ];

  constructor(
    private db: AngularFirestore,
  ) {
    let a = new ObjPago({
      sexpediente: '',
      nmontocontrato: 0,
      lstpagos: [
        {
          sfecha: '',
          nmonto: 0
        },
      ]
    })
  }

  get listNoMatch() {
    return [
      {
        "sespecialista": "CARPIO MONTES, ALEXANDRA",
        "sdemandado": "IMPUTADO: ABRIL GARCIA, MICHAEL WINSTON4",
        "sorganojuris": "7° JUZGADO DE INV. PREPARATORIA VIOL. C MUJER E IGF MOD. AREQUIPA",
        "sfechainicio": "x",
        "sjuez": "X",
        "smateria": "X",
        "sfechacreacion": "1692292983420",
        "salias": "05215-2022",
        "sespecialidad": "PENAL",
        "sexpediente": "05215-2022-93-0401-JR-PE-07",
        "sfechamodificacion": "1692292983420",
        "sdemandante": "AGRAVIADO: LTAP REPRESENTADA POR LIZ SHIRLEY PINTO HUAMANI"
      }
    ]
  }

}
