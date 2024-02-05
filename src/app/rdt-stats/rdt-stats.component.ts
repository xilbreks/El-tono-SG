import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-rdt-stats',
  templateUrl: './rdt-stats.component.html',
  styleUrls: ['./rdt-stats.component.scss']
})
export class RdtStatsComponent {
  sTitulo: string = '';
  lstStats: Array<any> = [];
  tipoAtencionChart: any;
  tipoProcesoChart: any;
  tipoClienteChart: any;
  tipoTareaChart: any;
  tipoAtencionChart2: any;
  tipoProcesoChart2: any;
  tipoClienteChart2: any;
  tipoTareaChart2: any;
  montoRecaudadoChart: any;

  constructor(
    private db: AngularFirestore,
    private titleService: Title
  ) {
    this.getStats();
  }

  getStats() {
    let obs = this.db.collection('estadisticas').valueChanges()
      .subscribe((lstRes: Array<any>) => {
        let stime = lstRes[0]['stime'];
        this.sTitulo = lstRes[0]['texto'];

        this.lstStats = lstRes;
        this.lstStats.shift();
        this.lstStats = this.lstStats.filter(x => x.stime == stime);

        this.crearTipoAtencionChart();
        this.crearTipoProcesoChart();
        this.crearTipoClienteChart();

        this.crearTipoProcesoChart2();
        this.crearTipoAtencionChart2();
        this.crearTipoClienteChart2();

        this.crearTipoTareaChart();
        this.crearMontoRecaudadoChart();

        obs.unsubscribe();
      })
  }

  crearTipoAtencionChart() {
    let nc = 0;
    let porExpediente = 0;
    let presencial = 0;
    let viaCelular = 0;
    let viaInternet = 0;

    this.lstStats.forEach(user => {
      nc += user.ta['nc'];
      porExpediente += user.ta['por-expediente'];
      presencial += user.ta['presencial'];
      viaCelular += user.ta['via-celular'];
      viaInternet += user.ta['via-internet'];
    });

    this.tipoAtencionChart = new Chart("TipoAtencionChart", {
      type: 'doughnut',
      data: {
        labels: [
          nc + ' : NC',
          porExpediente + ' : Por expediente',
          presencial + ' : Presencial',
          viaCelular + ' : Vía celular',
          viaInternet + ' : Vía internet'
        ],
        datasets: [
          {
            data: [
              nc,
              porExpediente,
              presencial,
              viaCelular,
              viaInternet
            ],
            backgroundColor: ['black', 'green', 'red', 'skyblue', 'purple']
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Atención'
          },
        },
        responsive: true,
      }
    });
  }

  crearTipoProcesoChart() {
    let nc = 0;
    let laboral = 0;
    let civil = 0;
    let penal = 0;
    let familia = 0;
    let constitucional = 0;
    let tramAdm = 0;
    let tramNot = 0;
    let varios = 0;

    this.lstStats.forEach(user => {
      nc += user.tp['nc'];
      laboral += user.tp['laboral'];
      civil += user.tp['civil'];
      penal += user.tp['penal'];
      familia += user.tp['familia'];
      constitucional += user.tp['constitucional'];
      tramAdm += user.tp['tramite-adm'];
      tramNot += user.tp['tramite-not'];
      varios += user.tp['varios'];
    });

    this.tipoProcesoChart = new Chart("TipoProcesoChart", {
      type: 'doughnut',
      data: {
        labels: [
          nc + ' : NC',
          laboral + ' : Laboral',
          civil + ' : Civil',
          penal + ' : Penal',
          familia + ' : Familia',
          constitucional + ' : Constitucional',
          tramAdm + ' : Trámite Adm.',
          tramNot + ' : Trámite Notarial',
          varios + ' : varios',
        ],
        datasets: [
          {
            data: [
              nc,
              laboral,
              civil,
              penal,
              familia,
              constitucional,
              tramAdm,
              tramNot,
              varios
            ],
            backgroundColor: ['black', 'green', 'skyblue', 'purple', 'pink', 'red', 'teal', 'yellow', 'orange']
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Proceso'
          },
        },
        responsive: true,
      }
    });
  }

  crearTipoClienteChart() {
    let nc = 0;
    let consulta = 0;
    let nuevo = 0;
    let antiguo = 0;
    let varios = 0;

    this.lstStats.forEach(user => {
      nc += user.tc['nc'];
      consulta += user.tc['consulta']
      nuevo += user.tc['nuevo'];
      antiguo += user.tc['antiguo'];
      varios += user.tc['varios'];
    });

    this.tipoClienteChart = new Chart("TipoClienteChart", {
      type: 'doughnut',
      data: {
        labels: [
          nc + ' : NC',
          consulta + ' : Consulta',
          nuevo + ' : Nuevo',
          antiguo + ' : Antiguo',
          varios + ' : Varios'
        ],
        datasets: [
          {
            data: [
              nc,
              consulta,
              nuevo,
              antiguo,
              varios
            ],
            backgroundColor: ['black', 'orange', 'green', 'skyblue', 'purple']
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Cliente'
          },
        },
        responsive: true,
      }
    });
  }

  crearTipoProcesoChart2() {
    this.tipoProcesoChart2 = new Chart("TipoProcesoChart2", {
      type: 'bar',
      data: {
        labels: this.lstStats.map(u => u.name),
        datasets: [
          {
            label: 'NC',
            data: this.lstStats.map(u => u.tp['nc']),
            backgroundColor: ['black']
          },
          {
            label: 'Laboral',
            data: this.lstStats.map(u => u.tp['laboral']),
            backgroundColor: ['green']
          },
          {
            label: 'Familia',
            data: this.lstStats.map(u => u.tp['familia']),
            backgroundColor: ['deeppink']
          },
          {
            label: 'Civil',
            data: this.lstStats.map(u => u.tp['civil']),
            backgroundColor: ['purple']
          },
          {
            label: 'Penal',
            data: this.lstStats.map(u => u.tp['penal']),
            backgroundColor: ['blue']
          },
          {
            label: 'Constitucional',
            data: this.lstStats.map(u => u.tp['constitucional']),
            backgroundColor: ['red']
          },
          {
            label: 'Tram-adm-not',
            data: this.lstStats.map(u => (u.tp['tramite-adm'] + u.tp['tramite-not'])),
            backgroundColor: ['yellow']
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Proceso'
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

  crearTipoAtencionChart2(): void {
    this.tipoAtencionChart2 = new Chart("TipoAtencionChart2", {
      type: 'bar',
      data: {
        labels: this.lstStats.map(u => u.name),
        datasets: [
          {
            label: 'NC',
            data: this.lstStats.map(u => u.ta['nc']),
            backgroundColor: ['black']
          },
          {
            label: 'Por Expediente',
            data: this.lstStats.map(u => u.ta['por-expediente']),
            backgroundColor: ['green']
          },
          {
            label: 'Presencial',
            data: this.lstStats.map(u => u.ta['presencial']),
            backgroundColor: ['red']
          },
          {
            label: 'Vía Celular',
            data: this.lstStats.map(u => u.ta['via-celular']),
            backgroundColor: ['skyblue']
          },
          {
            label: 'Vía Internet',
            data: this.lstStats.map(u => u.ta['via-internet']),
            backgroundColor: ['purple']
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
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

  crearTipoClienteChart2(): void {
    this.tipoClienteChart2 = new Chart("TipoClienteChart2", {
      type: 'bar',
      data: {
        labels: this.lstStats.map(u => u.name),
        datasets: [
          {
            label: 'NC',
            data: this.lstStats.map(u => u.tc['nc']),
            backgroundColor: ['black']
          },
          {
            label: 'Nuevo',
            data: this.lstStats.map(u => u.tc['nuevo']),
            backgroundColor: ['green']
          },
          {
            label: 'Antiguo',
            data: this.lstStats.map(u => u.tc['antiguo']),
            backgroundColor: ['skyblue']
          },
          {
            label: 'varios',
            data: this.lstStats.map(u => u.ta['varios']),
            backgroundColor: ['purple']
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tipo de Cliente'
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

  /**********************************************
   * ********************************************
   *********************************************/

  crearTipoTareaChart() {
    let lstCantTipoTarea = [
      0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0
    ];

    this.tipoTareaChart2 = new Chart("TipoTareaChart2", {
      type: 'bar',
      data: {
        labels: lstCantTipoTarea.map((a, b) => (b + 1)),
        datasets: this.lstStats.map(u => {
          return {
            label: u.name,
            data: u.tt,
            backgroundColor: u.color,
            borderColor: 'cccccc',
            borderWidth: 1
          }
        }),
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Tareas y Diligencias'
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
    })
  }

  /**
   * Estadística sobre monto recaudados
   */
  crearMontoRecaudadoChart() {
    this.montoRecaudadoChart = new Chart("MontoRecaudadoChart", {
      type: 'bar',
      data: {
        labels: this.lstStats.map(u => u.name),
        datasets: [
          {
            label: 'Cobro Honorarios',
            data: this.lstStats.map(u => u.ncobrohonorario),
            backgroundColor: ['blue']
          },
          {
            label: 'Cobro Aranceles u otros',
            data: this.lstStats.map(u => u.ningresoarancel),
            backgroundColor: ['green']
          },
          {
            label: 'Gasto Aranceles u otros',
            data: this.lstStats.map(u => u.nsalidaarancel),
            backgroundColor: ['red']
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Movimiento de Dinero'
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

}
