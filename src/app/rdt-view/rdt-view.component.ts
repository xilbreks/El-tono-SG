import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public scolaborador: string = '';
  public sfecha2: string = '';
  public nfecha: number = 0;
  public nsemana: number = 0;
  public ndia: number = 0;
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
  public leditable: boolean = true;

  constructor() { }
}

class ObjTarea {
  public idrdt: string = '';
  public idtarea: string = '';
  public stipocliente: string = '';
  public stipoatencion: string = '';
  public sdelegadopor: string = '';
  public sexpediente: string = '';
  public sespecialidad: string = '';
  public sdemandante: string = '';
  public sdemandado: string = '';
  public niter: number = 0;
  public navance: number = 0;
  public sfculminacion: string = '';
  public ncodeje: number = 0;
  public sdeseje: string = '';
  public sacceje: string = '';
  public shorasatencion: string = '';
  public sminutosatencion: string = '';

  constructor() { }
}


@Component({
  selector: 'app-rdt-view',
  templateUrl: './rdt-view.component.html',
  styleUrls: ['./rdt-view.component.scss']
})
export class RdtViewComponent {
  idrdt: string;
  objRdt: ObjRdt = new ObjRdt();
  lstTareas: ObjTarea[] = [];
  nSumaTiempoTareas: string = '--:--';
  lLoading: boolean = false;

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
    this.db.collection('rdts')
      .doc(this.idrdt)
      .valueChanges()
      .subscribe((rdt: any) => {
        this.objRdt.scolaborador = rdt.scolaborador;
        this.objRdt.sfecha2 = (new Date(rdt.nfecha)).toLocaleDateString();
        this.objRdt.shoraingreso = rdt.shoraingreso;
        this.objRdt.shorasalida = rdt.shorasalida;
        this.objRdt.sminutoingreso = rdt.sminutoingreso;
        this.objRdt.sminutosalida = rdt.sminutosalida;
      });
  }

  public getTareas(): void {
    this.lLoading = true;
    this.db
      .collection('tareas', (ref) => {
        return ref.where('idrdt', '==', this.idrdt);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstTareas = [];
        let horas = 0;
        let minutos = 0;

        val.forEach((tarea: any) => {
          let objTarea = new ObjTarea();
          objTarea.idrdt = tarea.idrdt;
          objTarea.idtarea = tarea.idtarea;
          objTarea.stipocliente = tarea.stipocliente;
          objTarea.stipoatencion = tarea.stipoatencion;
          objTarea.sdelegadopor = tarea.sdelegadopor;
          objTarea.sexpediente = tarea.sexpediente;
          objTarea.sespecialidad = tarea.sespecialidad;
          objTarea.sdemandante = tarea.sdemandante;
          objTarea.sdemandado = tarea.sdemandado;
          objTarea.niter = tarea.niter;
          objTarea.navance = tarea.navance;
          objTarea.sfculminacion = tarea.sfculminacion;
          objTarea.ncodeje = tarea.ncodeje;
          objTarea.sdeseje = tarea.sdeseje;
          objTarea.sacceje = tarea.sacceje;
          objTarea.shorasatencion = tarea.shorasatencion;
          objTarea.sminutosatencion = tarea.sminutosatencion;

          this.lstTareas.push(objTarea);
          horas = horas + Number(tarea.shorasatencion);
          minutos = minutos + Number(tarea.sminutosatencion);
        });

        let nTotalMinutos = horas * 60 + minutos;
        let sHoras = '';
        let sMinutos = '';

        sHoras = Math.floor(nTotalMinutos / 60).toString();
        sMinutos = (nTotalMinutos - Math.floor(nTotalMinutos / 60) * 60).toString();

        this.nSumaTiempoTareas = sHoras + 'h ' + sMinutos + 'm';

        this.lLoading = false;
      });
  }

}
