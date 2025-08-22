import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { Tareo } from '../_interfaces/tareo';

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
  public sfecharegistro: string = '';
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
  // public ncobrohonorario: number = 0;
  // public ningresoarancel: number = 0;
  // public nsalidaarancel: number = 0;
  public lcontrato: boolean = false;
  // public nsaldo: number = 0;
  public nmontocontrato: number = 0;
  public npagoshechos: number = 0;
  public nmontoultimopago: number = 0;
  public sfechaultimopago: number = 0;

  constructor() { }
}

@Component({
  selector: 'app-tareo-view',
  templateUrl: './tareo-view.component.html',
  styleUrl: './tareo-view.component.scss'
})
export class TareoViewComponent {
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
    // Old code
    // this.db.collection('rdts')
    //   .doc(this.idrdt)
    //   .valueChanges()
    //   .subscribe((rdt: any) => {
    //     let dDate = new Date(rdt.nfecha);
    //     let syear = dDate.getFullYear();
    //     let smonth = (dDate.getMonth() + 1) < 10 ? '0' + (dDate.getMonth() + 1) : '' + (dDate.getMonth() + 1);
    //     let sday = (dDate.getDate()) < 10 ? '0' + (dDate.getDate()) : '' + (dDate.getDate());

    //     this.objRdt.scolaborador = rdt.scolaborador;
    //     this.objRdt.sfecha2 = sday + '/' + smonth + '/' + syear;
    //     this.objRdt.shoraingreso = rdt.shoraingreso;
    //     this.objRdt.shorasalida = rdt.shorasalida;
    //     this.objRdt.sminutoingreso = rdt.sminutoingreso;
    //     this.objRdt.sminutosalida = rdt.sminutosalida;
    //   });

    // New code
    const query = this.db.collection('tareo').doc(this.idrdt).get();
    firstValueFrom(query).then((snapshot: any) => {
      let tareo: Tareo = snapshot.data();

      this.objRdt.scolaborador = tareo.nombreUsuario;
      this.objRdt.sfecha2 = tareo.fecha;
      this.objRdt.shoraingreso = tareo.entradaHora;
      this.objRdt.shorasalida = tareo.salidaHora;
      this.objRdt.sminutoingreso = tareo.entradaMinuto;
      this.objRdt.sminutosalida = tareo.salidaMinuto;
    })
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
          let dfreg = new Date(Number(tarea.idtarea));
          objTarea.idrdt = tarea.idrdt;
          objTarea.idtarea = tarea.idtarea;
          objTarea.sfecharegistro = dfreg.getDate() + '/' +
            (dfreg.getMonth() + 1) + '/' + dfreg.getFullYear() + ' ' +
            (dfreg.getHours() > 9 ? dfreg.getHours() : '0' + dfreg.getHours()) + ':' +
            (dfreg.getMinutes() > 9 ? dfreg.getMinutes() : '0' + dfreg.getMinutes());
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
          // objTarea.ncobrohonorario = tarea.ncobrohonorario;
          // objTarea.ningresoarancel = tarea.ningresoarancel;
          // objTarea.nsalidaarancel = tarea.nsalidaarancel;
          objTarea.lcontrato = tarea.lcontrato;
          // objTarea.nsaldo = tarea.nsaldo ? tarea.nsaldo : '-';
          objTarea.nmontocontrato = tarea.nmontocontrato ? tarea.nmontocontrato : '-';
          objTarea.npagoshechos = tarea.npagoshechos ? tarea.npagoshechos : '-';
          objTarea.nmontoultimopago = tarea.nmontoultimopago ? tarea.nmontoultimopago : '-';
          objTarea.sfechaultimopago = tarea.sfechaultimopago ? tarea.sfechaultimopago : '-';

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
