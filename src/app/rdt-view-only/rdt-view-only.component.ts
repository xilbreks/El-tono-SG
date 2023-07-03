import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

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
  selector: 'app-rdt-view-only',
  templateUrl: './rdt-view-only.component.html',
  styleUrls: ['./rdt-view-only.component.scss'],
})
export class RdtViewOnlyComponent {
  idrdt: string;
  lstTareas: ObjTarea[] = [];
  idusuario: any = localStorage.getItem('idusuario');

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.idrdt = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('RDT ' + this.idrdt);
    this.getTareas();
  }

  public getTareas(): void {
    this.db
      .collection('tareas', (ref) => {
        return ref.where('idrdt', '==', this.idrdt);
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.lstTareas = val;
        console.log(val);
      });
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
