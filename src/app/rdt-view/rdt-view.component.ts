import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public dfecha: string = '';
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
  public leditable: boolean = true;
  public nsemana: number = 0;
  constructor() {}
}

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
  stiempoatencion: string = ''; // deprecated
  ncodeje: string = '';
  sdeseje: string = '';
  sacceje: string = '';
  nsemana: number = 0;
  nhorasatencion: string = '';
  nminutosatencion: string = '';
  constructor() {}
}


@Component({
  selector: 'app-rdt-view',
  templateUrl: './rdt-view.component.html',
  styleUrls: ['./rdt-view.component.scss']
})
export class RdtViewComponent {
  idrdt: string;
  lstTareas: ObjTarea[] = [];
  idusuario: any = localStorage.getItem('idusuario');
  objRdt: ObjRdt = new ObjRdt();
  nTiempoTrabajo: any = '--';
  nSumaTiempoTareas: any = '--';

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.idrdt = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('RDT ' + this.idrdt);
    this.getObjRdt();
    this.getTareas();
  }

  public getObjRdt(): void {
    this.db.collection('rdts', ref => {
      return ref.where('idrdt', '==', this.idrdt)
    }).valueChanges()
    .subscribe((rdt: any)=>{
      this.objRdt = rdt[0];
      this.nTiempoTrabajo = this.calcularTiempoTrabajo();
    });
  }

  public getTareas(): void {
    this.db
      .collection('tareas', (ref) => {
        return ref.where('idrdt', '==', this.idrdt);
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.lstTareas = val;
        let horas = 0;
        let minutos = 0;
        val.forEach((tarea: any) => {
          horas = horas + Number(tarea.nhorasatencion);
          minutos = minutos + Number(tarea.nminutosatencion);
        });
        this.nSumaTiempoTareas = horas * 60 + minutos;
      });
  }

  public calcularTiempoTrabajo(): number | string {
    if(
      this.objRdt.shoraingreso != '--' &&
      this.objRdt.sminutoingreso != '--' &&
      this.objRdt.shorasalida != '--' &&
      this.objRdt.sminutosalida != '--'
    ) {
      let horasTrabajadas = Number(this.objRdt.shorasalida) - Number(this.objRdt.shoraingreso);
      let minutosTrbajados = Number(this.objRdt.sminutosalida) - Number(this.objRdt.sminutoingreso);
      let totalMinutos = horasTrabajadas * 60 + minutosTrbajados;
      return totalMinutos;
    } else {
      return 'ERROR';
    }
  }

  public downloadCSV(): void {
    let csv: string = '';
    csv = '#,Cliente,Atención,Delegado por,Expediente,Tipo de proceso, Mención de la tarea,cliente,demandado,ITER,Avance(%),Fecha culminación,Tiempo de Atención,Código,Descripción,Acciones a Realizar\r\n';
    this.lstTareas.forEach((tarea, index)=>{
      csv = csv + index + ',';
      csv = csv + tarea.ntipocliente + ',';
      csv = csv + index + ',';
      csv = csv + index + ',';
      csv = csv + index + ',';
      csv = csv + index + ',';
    });
  }
}
