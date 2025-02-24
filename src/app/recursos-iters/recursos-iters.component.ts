import { Component } from '@angular/core';

interface Iter {
  code: string,
  eligible: boolean,
  title: string
}

const lstIterLaboral: Array<Iter> = [
  { code: '0.1', eligible: true, title: 'Consulta Nueva' },

  { code: '1.0', eligible: false, title: 'ETAPA I: POSTULATORIA' },
  { code: '1.1', eligible: true, title: 'Elaboración Demanda' },
  { code: '1.2', eligible: true, title: 'Presentación Demanda' },
  { code: '1.3', eligible: true, title: 'Auto Admisorio' },
  { code: '1.4', eligible: true, title: 'Contestación de demanda' },

  { code: '2.0', eligible: false, title: 'ETAPA II: PROBATORIA' },
  { code: '2.1', eligible: true, title: 'Audiencia de Conciliación' },
  { code: '2.2', eligible: true, title: 'Audiencia Única' },
  { code: '2.3', eligible: true, title: 'Audiencia de Juzgamiento' },

  { code: '3.0', eligible: false, title: 'ETAPA III: DECISORIA' },
  { code: '3.1', eligible: true, title: 'Sentencia 1ra instancia' },

  { code: '4.0', eligible: false, title: 'ETAPA IV: MEDIDA CAUTELAR' },
  { code: '4.1', eligible: true, title: 'Elaboración de la medida cautelar' },
  { code: '4.2', eligible: true, title: 'Presentación de la medida cautelar' },
  { code: '4.3', eligible: true, title: 'Resolución - MP' },
  { code: '4.4', eligible: true, title: 'Recurso de apelación contra resolución' },
  { code: '4.5', eligible: true, title: 'Auto de Vista - MP' },
  { code: '4.6', eligible: true, title: 'Ejecución de la medida cautelar' },

  { code: '5.0', eligible: false, title: 'ETAPA V: IMPUGNATORIA' },
  { code: '5.1', eligible: true, title: 'Recurso apelación' },
  { code: '5.2', eligible: true, title: 'Audiencia vista de la causa' },
  { code: '5.3', eligible: true, title: 'Sentencia de vista 2da instancia' },

  { code: '6.0', eligible: false, title: 'ETAPA VI: EJECUCIÓN ANTICIPADA DE SENTENCIA' },
  { code: '6.1', eligible: true, title: 'Elaboración de la EAS' },
  { code: '6.2', eligible: true, title: 'Presentación de la EAS' },
  { code: '6.3', eligible: true, title: 'Resolución - EAS' },
  { code: '6.4', eligible: true, title: 'Recurso de Apelación contra resolución' },
  { code: '6.5', eligible: true, title: 'Auto de Vista - EAS' },
  { code: '6.6', eligible: true, title: 'Ejecución de la EAS' },
  { code: '6.7', eligible: true, title: 'Recurso de Casación' },

  { code: '7.0', eligible: false, title: 'ETAPA VII: EJECUTORIA' },
  { code: '7.1', eligible: true, title: 'Ejecución de Sentencia' },
  { code: '7.2', eligible: true, title: 'Resolución consentida y firme' },
  { code: '7.3', eligible: true, title: 'Costas y Costos' },
];

const lstIterPenal: Array<Iter> = [
  { code: '0', eligible: false, title: 'ETAPA I: DENUNCIA' },
  { code: '1', eligible: true, title: 'Denuncia' },
  { code: '0', eligible: false, title: 'ETAPA II: INVESTIGACIÓN PREPARATORIA PRELIMINAR' },
  { code: '2', eligible: true, title: 'Solicitar diligencias y/o presentar medios de prueba' },
  { code: '3', eligible: true, title: 'Solicitar el archivo de la investigación (INVESTIGADO) / Solicitar que se formalice la investigación (AGRAVIADO)' },
  { code: '4', eligible: true, title: 'Tutela de derechos/audiencia tutela de derechos' },
  { code: '5', eligible: true, title: 'Control de plazos/audiencia de control de plazos' },
  { code: '6', eligible: true, title: 'Elevación de actuados' },
  { code: '7', eligible: true, title: 'Oposición de Incoación de Proceso Inmediato/Audiencia de Incoación de Proceso Inmediato' },
  { code: '0', eligible: false, title: 'ETAPA III: INVESTIGACIÓN PREPARATORIA FORMALIZADA' },
  { code: '8', eligible: true, title: 'Solicitar diligencias y/o presentar medios de prueba' },
  { code: '9', eligible: true, title: 'Tutela de derechos/audiencia tutela de derechos' },
  { code: '10', eligible: true, title: 'Control de plazos/audiencia de control de plazos' },
  { code: '11', eligible: true, title: 'Solicitar Prisión Preventiva (AGRAVIADO) / Absolver requerimiento de prisión preventiva (IMPUTADO). AUDIENCIA' },
  { code: '12', eligible: true, title: 'Solicitar Prorroga de Prisión Preventiva (AGRAVIADO) / Solicitar Cesación de prisión preventiva (IMPUTADO). AUDIENCIA' },
  { code: '13', eligible: true, title: 'Solicitar Constitución en Actor Civil y/o Tercero Civil (AGRAVIADO) / Oponerse a solicitud de Actor Civil y/o Tercero Civil (IMPUTADO)' },
  { code: '0', eligible: false, title: 'ETAPA IV: ETAPA INTERMEDIA' },
  { code: '14', eligible: true, title: 'Absolución de la Acusación y/o Sobreseimiento / Audiencia de Control' },
  { code: '0', eligible: false, title: 'ETAPA V: ETAPA DE JUICIO ORAL' },
  { code: '15', eligible: true, title: 'Audiencia de Juicio' },
  { code: '16', eligible: true, title: 'Sentencia 1° Instancia' },
  { code: '0', eligible: false, title: 'ETAPA VI: IMPUGNATORIA' },
  { code: '17', eligible: true, title: 'Apelación Auto/Sentencia' },
  { code: '18', eligible: true, title: 'Recurso de Reposición' },
  { code: '19', eligible: true, title: 'Audiencia de Apelación' },
  { code: '20', eligible: true, title: 'Sentencia de Vista' },
  { code: '21', eligible: true, title: 'Casación' },
  { code: '0', eligible: false, title: 'ETAPA VII: ETAPA EJECUTORA' },
  { code: '22', eligible: true, title: 'Solicitar al PJ se ejecute la sentencia' },
  { code: '23', eligible: true, title: 'Solicitar al Ministerio Publico Revocatoria de pena' },
  { code: '24', eligible: true, title: 'Audiencia de Revocatoria de Pena Suspendida' },
];

const lstIterCivil: Array<Iter> = [
  { code: '0', eligible: false, title: 'PRIMERA INSTANCIA' },
  { code: '1', eligible: true, title: 'Conciliación Extrajudicial' },
  { code: '2', eligible: true, title: 'Interposición de la demanda' },
  { code: '3', eligible: true, title: 'Calificación de la demanda' },
  { code: '4', eligible: true, title: 'Subsanar de acuerdo al auto de inadmisibilidad de la demanda' },
  { code: '5', eligible: true, title: 'Emplazamiento de la demanda' },
  { code: '6', eligible: true, title: 'Interponer tachas u oposiciones a las pruebas' },
  { code: '7', eligible: true, title: 'Absolver tachas u oposiciones' },
  { code: '8', eligible: true, title: 'Interponer excepciones o defensas previas' },
  { code: '9', eligible: true, title: 'Absolver el traslado de las excepciones o defensas previas' },
  { code: '10', eligible: true, title: 'Contestar la demanda y reconvenir' },
  { code: '11', eligible: true, title: 'Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención' },
  { code: '12', eligible: true, title: 'Absolver el traslado de la reconvención' },
  { code: '13', eligible: true, title: 'Saneamiento' },
  { code: '14', eligible: true, title: 'Fijación de puntos controvertidos' },
  { code: '15', eligible: true, title: 'Realización de la audiencia de pruebas' },
  { code: '16', eligible: true, title: 'Audiencia especial y complementaria' },
  { code: '17', eligible: true, title: 'Alegados' },
  { code: '18', eligible: true, title: 'Sentencia' },
  { code: '0', eligible: false, title: 'SEGUNDA INSTANCIA' },
  { code: '19', eligible: true, title: 'Apelar sentencia' },
  { code: '20', eligible: true, title: 'Subsanar el recurso de apelación según el auto que declara la inadmisibilidad' },
  { code: '21', eligible: true, title: 'Elevar el expediente' },
  { code: '22', eligible: true, title: 'Traslado para absolver el escrito el escrito de apelación o adherirse al mismo' },
  { code: '23', eligible: true, title: 'Traslado al apelante para absolver la adhesión' },
  { code: '24', eligible: true, title: 'Audiencia de pruebas' },
  { code: '25', eligible: true, title: 'Vista de la causa' },
  { code: '26', eligible: true, title: 'Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa' },
  { code: '0', eligible: false, title: 'CASACION' },
  { code: '27', eligible: true, title: 'Interposición de casación' },
  { code: '28', eligible: true, title: 'Vista de la causa' },
  { code: '29', eligible: true, title: 'Solicitar informe oral por parte de las partes' },
  { code: '30', eligible: true, title: 'Sentencia de casación' },
  { code: '0', eligible: false, title: 'ETAPAS NOTARIALES' },
  { code: '101', eligible: true, title: 'Solicitud de requisitos' },
  { code: '102', eligible: true, title: 'Citas con el modulo especializado' },
  { code: '103', eligible: true, title: 'Firmas de escritura' },
  { code: '104', eligible: true, title: 'Publicacion en edictos' },
  { code: '105', eligible: true, title: 'Entrega de escrituras' },
  { code: '0', eligible: false, title: 'ETAPAS REGISTRALES' },
  { code: '201', eligible: true, title: 'Inscripcion en Registros Publicos' },
  { code: '202', eligible: true, title: 'Observaciones en Registros Publicos' },
  { code: '203', eligible: true, title: 'Subsanacion de observaciones' },
  { code: '204', eligible: true, title: 'Cita con registrador' },
  { code: '205', eligible: true, title: 'Inscripcion preventiva con publicacion' },
  { code: '206', eligible: true, title: 'Inscripcion definitiva' },
];

const lstIterFamilia: Array<Iter> = [
  { code: '0', eligible: false, title: 'ETAPAS PREVIAS O ALTERNAS' },
  { code: '0.1', eligible: true, title: 'Consulta Nueva' },
  { code: '0.2', eligible: true, title: 'Invitación a Conciliar' },
  { code: '0.3', eligible: true, title: 'Audiencia de Conciliación' },
  { code: '1', eligible: false, title: 'PRIMERA INSTANCIA' },
  { code: '1.1', eligible: true, title: 'Recolección de medios probatorios' },
  { code: '1.2', eligible: true, title: 'Preparación de la demanda' },
  { code: '1.3', eligible: true, title: 'Presentación de la demanda' },
  { code: '1.4', eligible: true, title: 'Calificación de la demanda' },
  { code: '1.5', eligible: true, title: 'Subsanación de la demanda (si aplica)' },
  { code: '1.6', eligible: true, title: 'Traslado de la demanda' },
  { code: '1.7', eligible: true, title: 'Contestación de la demanda' },
  { code: '1.8', eligible: true, title: 'Audiencia' },
  { code: '1.9', eligible: true, title: 'Sentencia de primera instancia' },
  { code: '2', eligible: false, title: 'SEGUNDA INSTANCIA' },
  { code: '2.1', eligible: true, title: 'Apelación o absolución de apelación' },
  { code: '2.2', eligible: true, title: 'Elevación del expediente a superior' },
  { code: '2.3', eligible: true, title: 'Audiencia de vista' },
  { code: '2.4', eligible: true, title: 'Sentencia de vista' },
  { code: '3', eligible: false, title: 'RECUSOS EXTRAORDINARIOS' },
  { code: '3.1', eligible: true, title: 'Elaboración de casación, queja o amparo' },
  { code: '3.2', eligible: true, title: 'Calificación de recurso' },
  { code: '3.3', eligible: true, title: 'Audiencia de Vista de la causa' },
  { code: '3.4', eligible: true, title: 'Sentencia de casación, queja o amparo' },
  { code: '4', eligible: false, title: 'ETAPA EJECUTORIA' },
  { code: '4.1', eligible: true, title: 'Consentimiento de sentencia' },
  { code: '4.2', eligible: true, title: 'Cursar oficios' },
  { code: '4.3', eligible: true, title: 'Presentar o absolver liquidaciones' },
  { code: '4.4', eligible: true, title: 'Requerimiento de pago' },
  { code: '4.5', eligible: true, title: 'Remisión al Ministerio Público' },
  { code: '5', eligible: false, title: 'MEDIDAS CAUTELARES' },
  { code: '5.1', eligible: true, title: 'Elaboración de medida cautelar' },
  { code: '5.2', eligible: true, title: 'Presentación de medida cautelar' },
  { code: '5.3', eligible: true, title: 'Calificación de medida cautelar' },
  { code: '5.4', eligible: true, title: 'Ejecución de medida cautelar' },
  { code: '5.5', eligible: true, title: 'Levantamiento de medida cautelar' },
];

const lstIterConstitucional: Array<Iter> = [
  { code: '1.0', eligible: false, title: 'ETAPA I: POSTULATORIA' },
  { code: '1.1', eligible: true, title: 'Elaboración Demanda' },
  { code: '1.2', eligible: true, title: 'Presentación Demanda' },
  { code: '1.3', eligible: true, title: 'Auto Admisorio' },
  { code: '1.4', eligible: true, title: 'Contestación de demanda' },

  { code: '2.0', eligible: false, title: 'ETAPA II: PROBATORIA' },
  { code: '2.1', eligible: true, title: 'Audiencia Única' },

  { code: '3.0', eligible: false, title: 'ETAPA III: DECISORIA' },
  { code: '3.1', eligible: true, title: 'Sentencia 1ra instancia' },

  { code: '4.0', eligible: false, title: 'ETAPA IV: IMPUGNATORIA' },
  { code: '4.1', eligible: true, title: 'Recurso apelación' },
  { code: '4.2', eligible: true, title: 'Audiencia vista de la causa' },
  { code: '4.3', eligible: true, title: 'Sentencia de vista 2da instancia' },
  { code: '4.4', eligible: true, title: 'Recurso de Agravio Constitucional' },
  { code: '4.5', eligible: true, title: 'Sentencia del Tribunal Constitucional' },

  { code: '5.0', eligible: false, title: 'ETAPA V: EJECUTORIA' },
  { code: '5.1', eligible: true, title: 'Ejecución de Sentencia' },
  { code: '5.2', eligible: true, title: 'Resolución concentida y firme' },
  { code: '5.3', eligible: true, title: 'Costas y Costos' },
];

@Component({
  selector: 'app-recursos-iters',
  templateUrl: './recursos-iters.component.html',
  styleUrls: ['./recursos-iters.component.scss']
})
export class RecursosItersComponent {
  lstIterLaboral: Array<Iter> = lstIterLaboral;
  lstIterFamilia: Array<Iter> = lstIterFamilia;
  lstIterCivil: Array<Iter> = lstIterCivil;
  lstIterPenal: Array<Iter> = lstIterPenal;
  lstIterConstitucional: Array<Iter> = lstIterConstitucional;

  constructor() { }

}
