import { Component } from '@angular/core';

class ObjTarea {
  id: number = 0;
  pick: boolean = false;
  desc: string = 'NULL';
  constructor(data: {
    id: number, pick: boolean, desc: string
  }) {
    this.id = data.id;
    this.pick = data.pick;
    this.desc = data.desc;
  }
}

@Component({
  selector: 'app-recursos-tareas',
  templateUrl: './recursos-tareas.component.html',
  styleUrls: ['./recursos-tareas.component.scss']
})
export class RecursosTareasComponent {
  lstTareas: Array<ObjTarea> = [];

  constructor() {
    this.setTareas();
  }

  setTareas() {
    this.lstTareas = [
      { id: 1, pick: true, desc: '1.- INFORMES - INICIALES' },
      { id: 2, pick: true, desc: '2.- INFORMES - DE 1RA INSTANCIA' },
      { id: 3, pick: true, desc: '3.- INFORMES - DE 2DA INSTANCIA' },
      { id: 4, pick: true, desc: '4.- INFORMES - DE CASACIÓN (EJECUTORIAS SUPREMAS)' },
      { id: 5, pick: true, desc: '5.- INFORMES - FINALES' },
      { id: 6, pick: true, desc: '6.- REDACCIÓN DE ESCRITOS DE MERO TRÁMITE SEGÚN SINOE E IMPULSO DE PARTE' },
      { id: 7, pick: true, desc: '7.- IMPRIMIR ANEXOS RESOLUCIONES' },
      { id: 8, pick: true, desc: '8.- REDACCIÓN DE ACTAS DE ACUERDOS, TRANSACCIONES, CONCILIACIONES' },
      { id: 9, pick: true, desc: '9.- REDACCIÓN CONTRATOS PARA CLIENTES' },
      { id: 10, pick: true, desc: '10.- BORRADORES DE DEMANDAS, CONTESTACIONES, RECONVENCIONES, EXCEPCIONES, TACHAS Y OPOSICIONES' },
      { id: 11, pick: true, desc: '11.- PROPUESTAS ECONÓMICAS CLIENTES E INFORMES' },
      { id: 12, pick: true, desc: '12.- TRÁMITES - NOTARIALES Y REGISTRALES' },
      { id: 13, pick: true, desc: '13.- REDACCIÓN CARTAS, SOLICITUDES Y MINUTAS' },
      { id: 14, pick: true, desc: '14.- BORRADORES - MEDIDAS CAUTELARES' },
      { id: 15, pick: true, desc: '15.- ASISTIR CENTROS DE CONCILIACIÓN' },
      { id: 16, pick: true, desc: '16.- PREPARAR ALEGATOS, DIAPOSITIVAS, PLIEGOS INTERROGATORIOS' },
      { id: 17, pick: true, desc: '17.- ASISTIR A LOS CLIENTES EN AUDIENCIAS' },
      { id: 18, pick: true, desc: '18.- ASISTIR AL PJ Y/O MP PARA CONVERSAR CON JUECES, FISCALES, ESPECIALISTAS' },
      { id: 19, pick: true, desc: '19.- TRÁMITES ADMINISTRATIVOS PAGAR ARANCELES JUDICIALES, TASAS Y OTROS' },
      { id: 20, pick: true, desc: '20.- APOYAR EN COBRANZAS (HACERLAS EFECTIVAS)' },
      { id: 21, pick: true, desc: '21.- BÚSQUEDA DE EXPEDIENTE' },
      { id: 22, pick: true, desc: '22.- DESARCHIVAR EXPEDIENTES DEL ARCHIVO CENTRAL DEL PJ' },
      { id: 23, pick: true, desc: '23.- REVISAR, ORDENAR Y ACTUALIZACIÓN DE EXPEDIENTE' },
      { id: 24, pick: true, desc: '24.- COORDINAR AUDIENCIAS' },
      { id: 25, pick: true, desc: '25.- SIMULACIÓN DE AUDIENCIAS' },
      { id: 26, pick: true, desc: '26.- SEGUIMIENTO DEL PROCESO (CEJ Y SINOE)' },
      { id: 27, pick: true, desc: '27.- RECABAR MEDIOS PROBATORIOS' },
      { id: 28, pick: true, desc: '28.- RECEPCIÓN-REGISTRO Y/O ATENCIÓN DE CLIENTES VÍA CELULAR' },
      { id: 29, pick: true, desc: '29.- ASISTIR A MUNICIPALIDADES, MINISTERIOS U OTRAS INSTITUCIONES' },
      { id: 0, pick: false, desc: '------------------------------' },
      { id: 30, pick: true, desc: '30.- ATENDER CLIENTES ANTIGUOS, NUEVOS Y CAPTAR CLIENTES' },
      { id: 31, pick: true, desc: '31.- ANALIZAR Y REVISAR DOCUMENTOS (MEDIOS PROBATORIOS)' },
      { id: 32, pick: true, desc: '32.- ASIGNACIÓN Y SUPERVISIÓN DEL SINOE DE ESCRITOS DE MERO TRÁMITE Y COMPLEJOS REALIZADOS POR LOS ASISTENTES Y PRACTICANTES' },
      { id: 33, pick: true, desc: '33.- SUPERVISAR ESCRITO DE MERO TRÁMITE E IMPULSO DE PARTE' },
      { id: 34, pick: true, desc: '34.- SUPERVISAR ESCRITOS COMPLEJOS SEAN DEMANDAS, DENUNCIAS, APELACIONES, CASACIONES, ETC.' },
      { id: 35, pick: true, desc: '35.- DILIGENCIAS EXTERNAS, VISUALIZACIONES, DECLARACIONES, CÁMARAS GESSEL' },
      { id: 36, pick: true, desc: '36.- REVISAR Y ELABORAR INFORMES LEGALES DE LOS EXPEDIENTES' },
      { id: 37, pick: true, desc: '37.- REVISAR DEMANDAS QUE ESTÉN AL 100%' },
      { id: 38, pick: true, desc: '38.- REVISAR REDACCIÓN DE DENUNCIAS, QUERELLAS AL 100% Y OTROS' },
      { id: 39, pick: true, desc: '39.- REVISIÓN DE MEDIDAS CAUTELARES' },
      { id: 40, pick: true, desc: '40.- REVISIÓN DE CONTESTACIÓN DE DEMANDAS Y RECONVENCIONES' },
      { id: 41, pick: true, desc: '41.- REVISIÓN/MODIFICACIÓN DE ABSOLUCIÓN DE DENUNCIAS Y QUERELLAS' },
      { id: 42, pick: true, desc: '42.- REVISIÓN/MODIFICACIÓN DE RECURSO APELACIÓN' },
      { id: 43, pick: true, desc: '43.- REVISIÓN DE RECURSOS DE CASACIÓN' },
      { id: 44, pick: true, desc: '44.- REVISIÓN DE ALEGATOS, DISPOSITIVAS Y PLIEGOS INTERROGATORIOS' },
      { id: 45, pick: true, desc: '45.- REVISAR QUE LAS DEMANDAS, MC Y OTROS ESCRITOS SEAN PRESENTADOS CON ARANCELES JUDICIALES' },
      { id: 46, pick: true, desc: '46.- PREPARACIÓN DE CLIENTES, TESTIGOS PARA AUDIENCIAS' },
      { id: 47, pick: true, desc: '47.- ORALIZAR AUDIENCIAS DE CONCILIACIÓN / JUZGAMIENTO / ÚNICA' },
      { id: 48, pick: true, desc: '48.- ORALIZAR VISTAS DE CAUSA ANTE SALAS SUPERIORES' },
      { id: 49, pick: true, desc: '49.- ORALIZAR VISTAS DE LA CAUSA ANTE CORTE SUPREMA' },
      { id: 50, pick: true, desc: '50.- ENTREVISTAS CON JUECES, FISCALES, ESPECIALISTAS' },
      { id: 51, pick: true, desc: '51.- CONFERENCIAR CON LA CONTRA PARTE Y ABOGADOS' },
      { id: 52, pick: true, desc: '52.- ATENCIÓN CLIENTES VÍA CELULAR' },
      { id: 53, pick: true, desc: '53.- ORGANIZAR ASAMBLEAS, REUNIONES VIRTUALES' },
      { id: 54, pick: true, desc: '54.- COBRAR CLIENTES (HACERLAS EFECTIVAS)' },
      { id: 0, pick: false, desc: '------------------------------' },
      { id: 100, pick: true, desc: '100.- SESIONES SEMANALES' },
      { id: 101, pick: true, desc: '101.- ALMUERZO' },
      { id: 102, pick: true, desc: '102.- ORDEN Y LIMPIEZA' },
      { id: 103, pick: true, desc: '103.- ACTUALIZACION DEL PLANER' },
      { id: 104, pick: true, desc: '104.- SESIONES DE COMPARTIR(ANIVERSARIOS, CUMPLEAÑOS, FESTIVIDADES, ETC)' },
      { id: 103, pick: true, desc: '105.- TAREAS ADMINISTRATIVAS' },
      { id: 103, pick: true, desc: '106.- TAREAS CONTABLES' },
    ];
  }
}
