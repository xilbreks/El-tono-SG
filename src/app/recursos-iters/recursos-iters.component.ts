import { Component } from '@angular/core';

class ObjIter {
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
  selector: 'app-recursos-iters',
  templateUrl: './recursos-iters.component.html',
  styleUrls: ['./recursos-iters.component.scss']
})
export class RecursosItersComponent {
  lstIterLaboral: Array<ObjIter> = [];
  lstIterPenal: Array<ObjIter> = [];
  lstIterCivil: Array<ObjIter> = [];
  lstIterFamilia: Array<ObjIter> = [];

  constructor() {
    this.setIterLaboral();
    this.setIterPenal();
    this.setIterCivil();
    this.setIterFamilia();
    console.log(this.lstIterLaboral);
    console.log(this.lstIterPenal)
  }

  setIterLaboral() {
    this.lstIterLaboral = [
      { id: 0, pick: false, desc: 'ETAPA I: POSTULATORIA' },
      { id: 1, pick: true, desc: '1.- Elaboración Demanda' },
      { id: 2, pick: true, desc: '2.- Presentación Demanda' },
      { id: 3, pick: true, desc: '3.- Auto Admisorio' },
      { id: 4, pick: true, desc: '4.- Contestación de demanda' },
      { id: 0, pick: false, desc: 'ETAPA II: PROBATORIA' },
      { id: 5, pick: true, desc: '5.- Audiencia de Conciliacion' },
      { id: 6, pick: true, desc: '6.- Audiencia Única' },
      { id: 7, pick: true, desc: '7.- Audiencia de Juzgamiento' },
      { id: 0, pick: false, desc: 'ETAPA III: DECISORIA' },
      { id: 8, pick: true, desc: '8.- Sentencia 1ra instancia' },
      { id: 0, pick: false, desc: 'ETAPA IV: IMPUGNATORIA' },
      { id: 9, pick: true, desc: '9.- Recurso apelación' },
      { id: 10, pick: true, desc: '10.- Audiencia vista de la causa' },
      { id: 11, pick: true, desc: '11.- Sentencia de vista 2da instancia' },
      { id: 12, pick: true, desc: '12.- Recurso de casación' },
      { id: 0, pick: false, desc: 'ETAPA V: EJECUTORIA' },
      { id: 13, pick: true, desc: '13.- Resolución concentida y firme' },
      { id: 14, pick: true, desc: '14.- Costas y Costos' },
    ];
  }

  setIterPenal() {
    this.lstIterPenal = [
      { id: 0, pick: false, desc: 'ETAPA I: DENUNCIA' },
      { id: 1, pick: true, desc: '1.- Denuncia' },
      { id: 0, pick: false, desc: 'ETAPA II: INVESTIGACIÓN PREPARATORIA PRELIMINAR' },
      { id: 2, pick: true, desc: '2.- Solicitar diligencias y/o presentar medios de prueba' },
      { id: 3, pick: true, desc: '3.- Solicitar el archivo de la investigación (INVESTIGADO) / Solicitar que se formalice la investigación (AGRAVIADO)' },
      { id: 4, pick: true, desc: '4.- Tutela de derechos/audiencia tutela de derechos' },
      { id: 5, pick: true, desc: '5.- Control de plazos/audiencia de control de plazos' },
      { id: 6, pick: true, desc: '6.- Elevación de actuados' },
      { id: 7, pick: true, desc: '7.- Oposición de Incoación de Proceso Inmediato/Audiencia de Incoación de Proceso Inmediato' },
      { id: 0, pick: false, desc: 'ETAPA III: INVESTIGACIÓN PREPARATORIA FORMALIZADA' },
      { id: 8, pick: true, desc: '8.- Solicitar diligencias y/o presentar medios de prueba' },
      { id: 9, pick: true, desc: '9.- Tutela de derechos/audiencia tutela de derechos' },
      { id: 10, pick: true, desc: '10.- Control de plazos/audiencia de control de plazos' },
      { id: 11, pick: true, desc: '11.- Solicitar Prisión Preventiva (AGRAVIADO) / Absolver requerimiento de prisión preventiva (IMPUTADO). AUDIENCIA' },
      { id: 12, pick: true, desc: '12.- Solicitar Prorroga de Prisión Preventiva (AGRAVIADO) / Solicitar Cesación de prisión preventiva (IMPUTADO). AUDIENCIA' },
      { id: 13, pick: true, desc: '13.- Solicitar Constitución en Actor Civil y/o Tercero Civil (AGRAVIADO) / Oponerse a solicitud de Actor Civil y/o Tercero Civil (IMPUTADO)' },
      { id: 0, pick: false, desc: 'ETAPA IV: ETAPA INTERMEDIA' },
      { id: 14, pick: true, desc: '14.- Absolución de la Acusación y/o Sobreseimiento / Audiencia de Control' },
      { id: 0, pick: false, desc: 'ETAPA V: ETAPA DE JUICIO ORAL' },
      { id: 15, pick: true, desc: '15.- Audiencia de Juicio' },
      { id: 16, pick: true, desc: '16.- Sentencia 1° Instancia' },
      { id: 0, pick: false, desc: 'ETAPA VI: IMPUGNATORIA' },
      { id: 17, pick: true, desc: '17.- Apelación Auto/Sentencia' },
      { id: 18, pick: true, desc: '18.- Recurso de Reposición' },
      { id: 19, pick: true, desc: '19.- Audiencia de Apelación' },
      { id: 20, pick: true, desc: '20.- Sentencia de Vista' },
      { id: 21, pick: true, desc: '21.- Casación' },
      { id: 0, pick: false, desc: 'ETAPA VII: ETAPA EJECUTORA' },
      { id: 22, pick: true, desc: '22.- Solicitar al PJ se ejecute la sentencia' },
      { id: 23, pick: true, desc: '23.- Solicitar al Ministerio Publico Revocatoria de pena' },
      { id: 24, pick: true, desc: '24.- Audiencia de Revocatoria de Pena Suspendida' },
    ];
  }

  setIterCivil() {
    this.lstIterCivil = [
      { id: 0, pick: false, desc: 'PRIMERA INSTANCIA' },
      { id: 1, pick: true, desc: '1.- Interposición de la demanda' },
      { id: 2, pick: true, desc: '2.- Calificación de la demanda' },
      { id: 3, pick: true, desc: '3.- Subsanar de acuerdo al auto de inadmisibilidad de la demanda' },
      { id: 4, pick: true, desc: '4.- Emplazamiento de la demanda' },
      { id: 5, pick: true, desc: '5.- Interponer tachas u oposiciones a las pruebas' },
      { id: 6, pick: true, desc: '6.- Absolver tachas u oposiciones' },
      { id: 7, pick: true, desc: '7.- Interponer excepciones o defensas previas' },
      { id: 8, pick: true, desc: '8.- Absolver el traslado de las excepciones o defensas previas' },
      { id: 9, pick: true, desc: '9.- Contestar la demanda y reconvenir' },
      { id: 10, pick: true, desc: '10.- Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención' },
      { id: 11, pick: true, desc: '11.- Absolver el traslado de la reconvención' },
      { id: 12, pick: true, desc: '12.- Saneamiento' },
      { id: 13, pick: true, desc: '13.- Fijación de puntos controvertidos' },
      { id: 14, pick: true, desc: '14.- Realización de la audiencia de pruebas' },
      { id: 15, pick: true, desc: '15.- Audiencia especial y complementaria' },
      { id: 16, pick: true, desc: '16.- Alegados' },
      { id: 17, pick: true, desc: '17.- Sentencia' },
      { id: 0, pick: false, desc: 'SEGUNDA INSTANCIA' },
      { id: 18, pick: true, desc: '18.- Apelar sentencia' },
      { id: 19, pick: true, desc: '19.- Subsanar el recurso de apelación según el auto que declara la inadmisibilidad' },
      { id: 20, pick: true, desc: '20.- Elevar el expediente' },
      { id: 21, pick: true, desc: '21.- Traslado para absolver el escrito el escrito de apelación o adherirse al mismo' },
      { id: 22, pick: true, desc: '22.- Traslado al apelante para absolver la adhesión' },
      { id: 23, pick: true, desc: '23.- Audiencia de pruebas' },
      { id: 24, pick: true, desc: '24.- Vista de la causa' },
      { id: 25, pick: true, desc: '25.- Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa' },
      { id: 0, pick: false, desc: 'CASACION' },
      { id: 26, pick: true, desc: '26.- Interposición de casación' },
      { id: 27, pick: true, desc: '27.- Vista de la causa' },
      { id: 28, pick: true, desc: '28.- Solicitar informe oral por parte de las partes' },
      { id: 29, pick: true, desc: '29.- Sentencia de casación' },
    ];
  }

  setIterFamilia() {
    this.lstIterFamilia = [
      { id: 1, pick: true, desc: '1: Postulación del proceso' },
      { id: 2, pick: true, desc: '2: Calificación de la demanda' },
      { id: 3, pick: true, desc: '3: Traslado de la demanda' },
      { id: 4, pick: true, desc: '4: Contestación de la demanda' },
      { id: 5, pick: true, desc: '5: Audiencia' },
      { id: 6, pick: true, desc: '6: Sentencia' },
      { id: 7, pick: true, desc: '7: Apelación' },
      { id: 8, pick: true, desc: '8: Medidas cautelares' },
    ];
  }
}
