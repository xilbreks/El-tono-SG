import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public dfecha: string = '';
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
  public leditable: boolean = true;
  constructor() {}
}

@Component({
  selector: 'app-colaborador-rdt',
  templateUrl: './colaborador-rdt.component.html',
  styleUrls: ['./colaborador-rdt.component.scss']
})
export class ColaboradorRdtComponent {
  idColaborador: any = '';
  lstRDTs: Array<ObjRdt> = [];

  constructor(private db: AngularFirestore) {
    this.idColaborador = localStorage.getItem('idusuario');
    this.getRdts();
  }

  public getRdts(): void {
    console.log(this.idColaborador);
    this.db
      .collection('rdts', (ref) => {
        return ref.where('idcolaborador', '==', this.idColaborador);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstRDTs = val.reverse();
      });
  }

  updateHoraIngreso(objHora: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      shoraingreso: objHora.value
    });
  }

  updateMinutoIngreso(objMinuto: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      sminutoingreso: objMinuto.value
    });
  }

  updateHoraSalida(objHora: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      shorasalida: objHora.value
    });
  }

  updateMinutoSalida(objMinuto: any, idrdt: string): void {
    this.db.collection('rdts').doc(idrdt).update({
      sminutosalida: objMinuto.value
    });
  }

  /**
   * Json de tareas ********************
   */

  public tareasJson(): Array<any> {
    return [
      {
        tipoCliente: 'No corresponde',
        atencion: 'No corresponde',
        delegado: 'No corresponde',
        expediente: '054232-2023',
        especialidad: 'no corresponde',
        descripcion: 'Repartir sinoe de la fecha 09, 12 y 13',
        cliente: 'No corresponde',
        demandado: 'No corresponde',
        iter: '-',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '1h y 16min',
        codigoEj: '32',
        descEj:
          'Se repartió el Sinoe de fecha 09, 12 y 13, consistente en 29 Resoluciones',
        accEj: 'Verificar el cumplimiento señalado en cada resolución',
      },
      {
        tipoCliente: 'Nuevo',
        atencion: 'Por expediente',
        delegado: 'Dr.a Lizbet',
        expediente: '04951-2020-0-0401-JR-LA-09',
        especialidad: 'Laboral',
        descripcion: 'Ejecucion anticipada de sentencia',
        cliente: 'Elvis Maica',
        demandado: 'Racionalizacion Empresarial y YURA',
        iter: '8',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '17min',
        codigoEj: '39',
        descEj:
          'Se reviso la medida cautelar de ejecucion anticipada de sentencia elaborada por el bachiller Alvaro Cuba, mostrando mi conformidad para que se presente',
        accEj:
          'Que se presente la medida cautelar previa coordinacion con la Dra. Lizbet',
      },
      {
        tipoCliente: 'Nuevo',
        atencion: 'Por Expediente',
        delegado: 'Dr.a Lizbet',
        expediente: '05615-2020-0-0401-JR-LA-07',
        especialidad: 'Laboral',
        descripcion: 'Ejecucion anticipada de sentencia',
        cliente: 'Elias Quispe Mamani',
        demandado: 'Racionalizacion empresarial y YURA',
        iter: '8',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '11min',
        codigoEj: '39',
        descEj:
          'Se reviso la medida cautelar de ejecucion anticipada de sentencia elaborada por el bachiller Alvaro Cuba, mostrando mi conformidad para que se presente',
        accEj:
          'Que se presente la medida cautelar previa coordinacion con la Dra. Lizbet',
      },
      {
        tipoCliente: 'Nuevo',
        atencion: 'No corresponde',
        delegado: 'Dr.a Lizbet',
        expediente: 'No corresponde',
        especialidad: 'Familiar',
        descripcion: 'Divorcio por causal',
        cliente: 'Walter Acuña',
        demandado: 'Mercedes Chavez',
        iter: '1',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '11min',
        codigoEj: '37',
        descEj:
          'Se revisó la demanda de divorcio por causal elaborada por la bachiller Angel Cusi, sele hizo observaciones que debe modificar y agregar',
        accEj: 'Una vez modificada y ampliada la demanda, presentarla',
      },
      {
        tipoCliente: 'Nuevo',
        atencion: 'No corresponde',
        delegado: 'Dr.a Lizbet',
        expediente: 'No corresponde',
        especialidad: 'Familiar',
        descripcion: 'Exoneracion de alimentos',
        cliente: 'Walter Acuña',
        demandado: 'Giuliana Acuña',
        iter: '1',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '11min',
        codigoEj: '37',
        descEj:
          'Se reviso la demanda de exoneracion de alimentos elaborado por el bachiller Angel Cusi, se le hizo observaciones que debe modificar y agregar',
        accEj: 'Una vez modificada y ampliada la demanda, presentarla',
      },
      {
        tipoCliente: 'Nuevo',
        atencion: 'Por expediente',
        delegado: 'Dr.a Lizbet',
        expediente: '01452-2023-43-0411-JP-FC-01',
        especialidad: 'Familiar',
        descripcion: 'Exoneracion de alimentos',
        cliente: 'Victor Chuquiyauri',
        demandado: 'Lucero Chuquiyauri',
        iter: '3',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '25min',
        codigoEj: '6',
        descEj: 'Se realizo el escrito de subsanacion de medida cautelar',
        accEj: 'Presentarse el día de mañana',
      },
      {
        tipoCliente: 'Antiguo',
        atencion: 'Por expediente',
        delegado: 'Dr.a Lizbet',
        expediente: 'No corresponde',
        especialidad: 'Familiar',
        descripcion: 'Prorrateo de alimentos',
        cliente: 'Carla Azorin y Wilson Vargas',
        demandado: 'Wilson Vargas',
        iter: '2',
        avance: '100%',
        fCulminacion: '14 Jun 2023',
        tAtencion: '21min',
        codigoEj: '6',
        descEj:
          'Se elaboro el escrito de delego facultades a practicantes para que puedan revisar el expediente y realizar otros actuados',
        accEj: 'Presentarlo el dia de mañana',
      },
    ];
  }
}
