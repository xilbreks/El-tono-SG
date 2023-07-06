import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js/auto';


class ObjTarea {
  idtarea: string = '';
  idrdt: string = '';
  ntipocliente: string = '';
  ntipoatencion: string = '';
  sdelegadopor: string = '';
  sexpediente: string = '';
  ntipoproceso: string = '';
  sdestarea: string = '';
  scliente: string = '';
  sdemandado: string = '';
  niter: string = '';
  navance: string = '';
  fculminacion: string = '';
  stiempoatencion: string = '';
  ncodeje: string = '';
  sdeseje: string = '';
  sacceje: string = '';
  constructor() {}
}

@Component({
  selector: 'app-stats-rdt',
  templateUrl: './stats-rdt.component.html',
  styleUrls: ['./stats-rdt.component.scss']
})
export class StatsRdtComponent implements OnInit {
  lstTareas: ObjTarea[] = [];
  idusuario: any = localStorage.getItem('idusuario');
  tipoAtencionChart: any;
  tipoProcesoChart: any;
  tipoClienteChart: any;

  constructor(
    private db: AngularFirestore,
    private titleService: Title
  ) {
    this.titleService.setTitle('Reporte Semanal');
    this.getTareas();
  }

  ngOnInit(): void {
    this.crearTipoAtencionChart();
    this.crearTipoProcesoChart();
    this.crearTipoClienteChart();
  }

  public getTareas(): void {
    this.db
      .collection('tareas')
      .valueChanges()
      .subscribe((val: any) => {
        this.lstTareas = val;
      });
  }

  crearTipoAtencionChart(){
    this.lstTareas.forEach((x)=>{{

    }});

    this.tipoAtencionChart = new Chart("TipoAtencionChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['NC','Por expediente', 'Presencial', 'Vía celular', 'Vía internet'], 
	       datasets: [
          {
            // label: "Tipo de Atención",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: ['black', 'blue', 'red', 'green', 'gray', 'pink', 'teal', 'yellow']
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Atención'
          },
        },
        responsive: true,
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

  crearTipoProcesoChart(){
    this.tipoProcesoChart = new Chart("TipoProcesoChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          'Alvaro',
          'Diana', 
          'Erica',
          'Estrella',
					'Fabiola',
          'Fabriszio',
          'Isabel',
          'Jackeline'
        ], 
	       datasets: [
          {
            label: "Laboral",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Penal",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Civil",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'gray'
          },
          {
            label: "Familia",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'teal'
          }  
        ]
      },
      options: {
        aspectRatio:2.5,
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

  crearTipoClienteChart(){
    this.tipoClienteChart = new Chart("TipoClienteChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
