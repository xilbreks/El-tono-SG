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
  nsemana: number = 0;
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
  tipoTareaChart: any;
  tipoAtencionChart2: any;
  tipoProcesoChart2: any;
  tipoClienteChart2: any;
  tipoTareaChart2: any;
  nSemana: number = 0;

  constructor(
    private db: AngularFirestore,
    private titleService: Title
  ) {
    this.titleService.setTitle('Reporte Semanal');
    this.nSemana = this.getSemanaHoy();
    this.getTareas(this.nSemana);
  }

  ngOnInit(): void {
  }

  public getSemanaHoy(): number {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    
    return Math.ceil(days / 7);
  }

  public cambiarSemana(objSemana: any): void {
    this.nSemana = objSemana.value;
    this.getTareas(this.nSemana);
  }

  public getTareas(nSemana: number): void {
    let observando =  this.db
      .collection('tareas', ref => {
        return ref.where('nsemana','==', Number(nSemana))
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.lstTareas = val;
        this.crearTipoAtencionChart();
        this.crearTipoProcesoChart();
        this.crearTipoClienteChart();
        this.crearTipoProcesoChart2();
        this.crearTipoAtencionChart2();
        this.crearTipoClienteChart2();
        this.crearTipoTareaChart();

        observando.unsubscribe();
      });
  }

  crearTipoAtencionChart(){
    let nc = 0;
    let porExpediente = 0;
    let presencial = 0;
    let viaCelular = 0;
    let viaInternet = 0;
    this.lstTareas.forEach((tarea)=>{{
      switch(tarea.ntipoatencion) {
        case 'nc':
          nc++;
          break;
        case 'por-expediente':
          porExpediente++;
          break;
        case 'presencial':
          presencial++;
          break;
        case 'via-celular':
          viaCelular++;
          break;
        case 'via-internet':
          viaInternet++;
          break;
        default:
          console.log('ERROR', tarea.ntipoatencion)
      }
    }});
    if (this.tipoAtencionChart) this.tipoAtencionChart.destroy();
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
        aspectRatio:2.5,
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

  crearTipoProcesoChart(){
    let nc = 0;
    let laboral = 0;
    let civil = 0;
    let penal = 0;
    let familia = 0;
    let constitucional = 0;
    let tramAdm = 0;
    let tramNot = 0;
    let varios = 0;
    this.lstTareas.forEach((tarea)=>{{
      switch(tarea.ntipoproceso) {
        case 'nc':
          nc++;
          break;
        case 'laboral':
          laboral++;
          break;
        case 'civil':
          civil++;
          break;
        case 'penal':
          penal++;
          break;
        case 'familia':
          familia++;
          break;
        case 'constitucional':
          constitucional++;
          break;
        case 'tramite-adm':
          tramAdm++;
          break;
        case 'tramite-not':
          tramNot++;
          break;
        case 'varios':
          varios++;
          break;
        default:
          console.log('ERROR', tarea.ntipoproceso)
      }
    }});
    if (this.tipoProcesoChart) this.tipoProcesoChart.destroy();
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
            backgroundColor: ['black', 'green', 'skyblue', 'purple', 'pink', 'red' ,'teal', 'yellow', 'orange']
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
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

  crearTipoClienteChart(){
    let nc = 0;
    let nuevo = 0;
    let antiguo = 0;
    let varios = 0;
    this.lstTareas.forEach((tarea)=>{{
      switch(tarea.ntipocliente) {
        case 'nc':
          nc++;
          break;
        case 'nuevo':
          nuevo++;
          break;
        case 'antiguo':
          antiguo++;
          break;
        case 'varios':
          varios++;
          break;
        default:
          console.log('ERROR', tarea.ntipocliente)
      }
    }});
    if (this.tipoClienteChart) this.tipoClienteChart.destroy();
    this.tipoClienteChart = new Chart("TipoClienteChart", {
      type: 'doughnut',
      data: {
        labels: [
          nc + ' : NC',
          nuevo + ' : Nuevo', 
          antiguo + ' : Antiguo', 
          varios + ' : Varios'
        ], 
	       datasets: [
          {
            data: [
              nc,
              nuevo,
              antiguo,
              varios
            ],
            backgroundColor: ['black', 'green', 'skyblue', 'purple']
          } 
        ]
      },
      options: {
        aspectRatio:2.5,
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

  crearTipoProcesoChart2(){
    let users = [
      {
        id: 'alvaro-morvelli',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'diana-zevallos',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'erica-nina',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'estrella-mendoza',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'fabiola-mayta',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'fabriszio-silva',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'isabel-cosi',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'jackeline-flores',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'johana-paredes',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'jorge-cuba',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'lizbet-silva',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'maryori-garate',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
      {
        id: 'nicolas-barrionuevo',
        nc: 0,
        laboral: 0,
        civil: 0,
        penal: 0,
        familia: 0,
        constitucional: 0,
        tramAdm: 0,
        tramNot: 0,
        varios: 0
      },
    ];

    this.lstTareas.forEach((tarea)=>{{
      users.forEach((user)=>{
        if (tarea.idrdt.slice(11) == user.id) {
          switch (tarea.ntipoproceso) {
            case 'nc':
              user.nc++;
              break;
            case 'laboral':
              user.laboral++;
              break;
            case 'civil':
              user.civil++;
              break;
            case 'penal':
              user.penal++;
              break;
            case 'familia':
              user.familia++;
              break;
            case 'constitucional':
              user.constitucional++;
              break;
            case 'tramite-adm':
              user.tramAdm++;
              break;
            case 'tramite-not':
              user.tramNot++;
              break;
            case 'varios':
              user.varios++;
              break;
            default:
              console.log('ERROR', tarea.ntipoproceso)
          }
        }
      })
    }});
    if (this.tipoProcesoChart2) this.tipoProcesoChart2.destroy();
    this.tipoProcesoChart2 = new Chart("TipoProcesoChart2", {
      type: 'bar',
      data: {
        labels: [
          'alvaro',
          'diana',
          'erica',
          'estrella',
          'fabiola',
          'fabriszio',
          'isabel',
          'jackeline',
          'johana',
          'jorge',
          'lizbet',
          'maryori',
          'nicolas',
        ], 
	       datasets: [
          {
            label: 'NC',
            data: users.map(u=>u.nc),
            backgroundColor: ['black']
          },
          {
            label: 'Laboral',
            data: users.map(u=>u.laboral),
            backgroundColor: ['green']
          },
          {
            label: 'Civil',
            data: users.map(u=>u.civil),
            backgroundColor: ['skyblue']
          },
          {
            label: 'Penal',
            data: users.map(u=>u.penal),
            backgroundColor: ['purple']
          },
          {
            label: 'Familia',
            data: users.map(u=>u.familia),
            backgroundColor: ['pink']
          },
          {
            label: 'Constitucional',
            data: users.map(u=>u.constitucional),
            backgroundColor: ['red']
          },
          {
            label: 'Trámite Adm.',
            data: users.map(u=>u.tramAdm),
            backgroundColor: ['teal']
          },
          {
            label: 'Trámite Notarial',
            data: users.map(u=>u.tramNot),
            backgroundColor: ['yellow']
          },
          {
            label: 'Varios',
            data: users.map(u=>u.varios),
            backgroundColor: ['orange']
          },
        ]
      },
      options: {
        aspectRatio:2.5,
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
    let users = [
      {
        id: 'alvaro-morvelli',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'diana-zevallos',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'erica-nina',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'estrella-mendoza',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'fabiola-mayta',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'fabriszio-silva',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'isabel-cosi',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'jackeline-flores',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'johana-paredes',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'jorge-cuba',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'lizbet-silva',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'maryori-garate',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
      {
        id: 'nicolas-barrionuevo',
        nc: 0,
        porExpediente: 0,
        presencial: 0,
        viaCelular: 0,
        viaInternet: 0,
      },
    ];

    this.lstTareas.forEach((tarea)=>{{
      users.forEach((user)=>{
        if (tarea.idrdt.slice(11) == user.id) {
          switch (tarea.ntipoatencion) {
            case 'nc':
              user.nc++;
              break;
            case 'por-expediente':
              user.porExpediente++;
              break;
            case 'presencial':
              user.presencial++;
              break;
            case 'via-celular':
              user.viaCelular++;
              break;
            case 'via-internet':
              user.viaInternet++;
              break;
            default:
              console.log('ERROR', tarea.ntipoatencion)
          }
        }
      })
    }});
    if (this.tipoAtencionChart2) this.tipoAtencionChart2.destroy();
    this.tipoAtencionChart2 = new Chart("TipoAtencionChart2", {
      type: 'bar',
      data: {
        labels: [
          'alvaro',
          'diana',
          'erica',
          'estrella',
          'fabiola',
          'fabriszio',
          'isabel',
          'jackeline',
          'johana',
          'jorge',
          'lizbet',
          'maryori',
          'nicolas',
        ], 
	       datasets: [
          {
            label: 'NC',
            data: users.map(u=>u.nc),
            backgroundColor: ['black']
          },
          {
            label: 'Por Expediente',
            data: users.map(u=>u.porExpediente),
            backgroundColor: ['green']
          },
          {
            label: 'Presencial',
            data: users.map(u=>u.presencial),
            backgroundColor: ['red']
          },
          {
            label: 'Vía celular',
            data: users.map(u=>u.viaCelular),
            backgroundColor: ['skyblue']
          },
          {
            label: 'Vía internet',
            data: users.map(u=>u.viaInternet),
            backgroundColor: ['purple']
          },
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

  crearTipoClienteChart2(): void{
    let users = [
      {
        id: 'alvaro-morvelli',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'diana-zevallos',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'erica-nina',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'estrella-mendoza',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'fabiola-mayta',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'fabriszio-silva',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'isabel-cosi',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'jackeline-flores',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'johana-paredes',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'jorge-cuba',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'lizbet-silva',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'maryori-garate',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
      {
        id: 'nicolas-barrionuevo',
        nc: 0,
        nuevo: 0,
        antiguo: 0,
        varios: 0,
      },
    ];

    this.lstTareas.forEach((tarea)=>{{
      users.forEach((user)=>{
        if (tarea.idrdt.slice(11) == user.id) {
          switch (tarea.ntipocliente) {
            case 'nc':
              user.nc++;
              break;
            case 'nuevo':
              user.nuevo++;
              break;
            case 'antiguo':
              user.antiguo++;
              break;
            case 'varios':
              user.varios++;
              break;
            default:
              console.log('ERROR', tarea.ntipocliente)
          }
        }
      })
    }});
    if (this.tipoClienteChart2) this.tipoClienteChart2.destroy();
    this.tipoClienteChart2 = new Chart("TipoClienteChart2", {
      type: 'bar',
      data: {
        labels: [
          'alvaro',
          'diana',
          'erica',
          'estrella',
          'fabiola',
          'fabriszio',
          'isabel',
          'jackeline',
          'johana',
          'jorge',
          'lizbet',
          'maryori',
          'nicolas',
        ], 
	       datasets: [
          {
            label: 'NC',
            data: users.map(u=>u.nc),
            backgroundColor: ['black']
          },
          {
            label: 'Varios',
            data: users.map(u=>u.varios),
            backgroundColor: ['purple']
          },
          {
            label: 'Antiguo',
            data: users.map(u=>u.antiguo),
            backgroundColor: ['skyblue']
          },
          {
            label: 'Nuevo',
            data: users.map(u=>u.nuevo),
            backgroundColor: ['green']
          },
        ]
      },
      options: {
        aspectRatio:2.5,
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
  
  crearTipoTareaChart(){
    let lstCantTipoTarea = [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ];
    this.lstTareas.forEach((tarea) => {
      if (tarea.ncodeje == 'nc') {
        lstCantTipoTarea[0]++;
      } else {
        lstCantTipoTarea[Number(tarea.ncodeje)]++;
      }
    });
    
    let lstTipoTareaUsadas: Array<any> = [];

    lstCantTipoTarea.forEach((cantTipoTarea, index) => {
      if (cantTipoTarea > 0) {
        let color = '';
        if (index == 0) color = 'black';
        else if (index < 29) color = 'blue';
        else color = 'yellow';
        lstTipoTareaUsadas.push({
          codigo: index == 0 ? 'nc' : index,
          cantidad: cantTipoTarea,
          color: color
        });
      }
    });
    
    if (this.tipoTareaChart2) this.tipoTareaChart2.destroy();
    this.tipoTareaChart2 = new Chart("TipoTareaChart2", {
      type: 'bar',
      data: {
        labels: lstTipoTareaUsadas.map(x => x.codigo), 
	       datasets: [
          {
            label: 'Cantidad de tareas realizadas',
            data: lstTipoTareaUsadas.map(x => x.cantidad),
            backgroundColor: lstTipoTareaUsadas.map(x => x.color)
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
            display: true,
            text: 'Listado de tareas - diligencias'
          },
        },
        responsive: true,
      }
    });

  }

}
