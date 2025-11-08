import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Checkpoint } from '../_interfaces/checkpoint';
import { Changelog } from '../_interfaces/changelog';


@Component({
  selector: 'app-exp-item-roadmap',
  templateUrl: './exp-item-roadmap.component.html',
  styleUrl: './exp-item-roadmap.component.scss'
})
export class ExpItemRoadmapComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  frmCheckpoint: FormGroup;
  checkpoints: Checkpoint[] = [];

  actualizando = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmCheckpoint = new FormGroup({
      id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      let checkpoints = [
        {
          "idCheckpoint": "001",
          "especialidad": "laboral",
          "orden": 1,
          "nombre": "PRIMERA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "002",
          "especialidad": "laboral",
          "orden": 2,
          "nombre": "1.1.- redaccion de demanda",
          "activo": true
        },
        {
          "idCheckpoint": "003",
          "especialidad": "laboral",
          "orden": 3,
          "nombre": "1.2.- presentacion de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "004",
          "especialidad": "laboral",
          "orden": 4,
          "nombre": "1.3.- programacion de audiencia / autoadmisorio",
          "activo": true
        },
        {
          "idCheckpoint": "005",
          "especialidad": "laboral",
          "orden": 5,
          "nombre": "1.4.- oralización de la audiencia",
          "activo": true
        },
        {
          "idCheckpoint": "006",
          "especialidad": "laboral",
          "orden": 6,
          "nombre": "1.5.- en espera de la sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "007",
          "especialidad": "laboral",
          "orden": 7,
          "nombre": "1.6.- sentencia de primera instancia",
          "activo": true
        },
        {
          "idCheckpoint": "008",
          "especialidad": "laboral",
          "orden": 8,
          "nombre": "SEGUNDA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "009",
          "especialidad": "laboral",
          "orden": 9,
          "nombre": "2.1.- redaccion de apelacion",
          "activo": true
        },
        {
          "idCheckpoint": "010",
          "especialidad": "laboral",
          "orden": 10,
          "nombre": "2.2.- presentacion de la apelacion",
          "activo": true
        },
        {
          "idCheckpoint": "011",
          "especialidad": "laboral",
          "orden": 11,
          "nombre": "2.3.- programacion de la audiencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "012",
          "especialidad": "laboral",
          "orden": 12,
          "nombre": "2.4.- oralizacion de la audiencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "013",
          "especialidad": "laboral",
          "orden": 13,
          "nombre": "2.5.- en espera de la sentencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "014",
          "especialidad": "laboral",
          "orden": 14,
          "nombre": "2.6.- sentencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "015",
          "especialidad": "laboral",
          "orden": 15,
          "nombre": "CASACION",
          "activo": true
        },
        {
          "idCheckpoint": "016",
          "especialidad": "laboral",
          "orden": 16,
          "nombre": "3.1.- elaboracion de recurso de casacion",
          "activo": true
        },
        {
          "idCheckpoint": "017",
          "especialidad": "laboral",
          "orden": 17,
          "nombre": "3.2.- presentacion del recurso de casacion",
          "activo": true
        },
        {
          "idCheckpoint": "018",
          "especialidad": "laboral",
          "orden": 18,
          "nombre": "3.3.- elevacion del recurso de casacion a la corte suprema",
          "activo": true
        },
        {
          "idCheckpoint": "019",
          "especialidad": "laboral",
          "orden": 19,
          "nombre": "3.4.- programacion de vista de la causa - corte suprema",
          "activo": true
        },
        {
          "idCheckpoint": "020",
          "especialidad": "laboral",
          "orden": 20,
          "nombre": "3.5.- oralizacion de audiencia de vista - corte suprema",
          "activo": true
        },
        {
          "idCheckpoint": "021",
          "especialidad": "laboral",
          "orden": 21,
          "nombre": "3.6.- en espera de la sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "022",
          "especialidad": "laboral",
          "orden": 22,
          "nombre": "3.7.- ejecutoria suprema final",
          "activo": true
        },
        {
          "idCheckpoint": "023",
          "especialidad": "laboral",
          "orden": 23,
          "nombre": "3.8.- bajada de autos al juzgado de origen",
          "activo": true
        },
        {
          "idCheckpoint": "024",
          "especialidad": "laboral",
          "orden": 24,
          "nombre": "EJECUCION",
          "activo": true
        },
        {
          "idCheckpoint": "025",
          "especialidad": "laboral",
          "orden": 25,
          "nombre": "4.1.- resolucion consentida y firme",
          "activo": true
        },
        {
          "idCheckpoint": "026",
          "especialidad": "laboral",
          "orden": 26,
          "nombre": "4.2.- redaccion de liquidacion de costos y costas",
          "activo": true
        },
        {
          "idCheckpoint": "027",
          "especialidad": "laboral",
          "orden": 27,
          "nombre": "4.3.- endose de costos y costas",
          "activo": true
        },
        {
          "idCheckpoint": "028",
          "especialidad": "laboral",
          "orden": 28,
          "nombre": "4.4.- cobro efectivo de costos y costas",
          "activo": true
        },
        {
          "idCheckpoint": "029",
          "especialidad": "laboral",
          "orden": 29,
          "nombre": "4.5.- redaccion de la solicitud de intereses legales",
          "activo": true
        },
        {
          "idCheckpoint": "030",
          "especialidad": "laboral",
          "orden": 30,
          "nombre": "4.6.- endose de los interes legales",
          "activo": true
        },
        {
          "idCheckpoint": "031",
          "especialidad": "laboral",
          "orden": 31,
          "nombre": "4.7.- cobro efectivo de intereses legales",
          "activo": true
        },
        {
          "idCheckpoint": "032",
          "especialidad": "familia",
          "orden": 1,
          "nombre": "PRIMERA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "033",
          "especialidad": "familia",
          "orden": 2,
          "nombre": "1.1.- Recolección de medios probatorios",
          "activo": true
        },
        {
          "idCheckpoint": "034",
          "especialidad": "familia",
          "orden": 3,
          "nombre": "1.2.- Preparación de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "035",
          "especialidad": "familia",
          "orden": 4,
          "nombre": "1.3.- Presentación de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "036",
          "especialidad": "familia",
          "orden": 5,
          "nombre": "1.4.- Calificación de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "037",
          "especialidad": "familia",
          "orden": 6,
          "nombre": "1.5.- Subsanación de la demanda (si aplica)",
          "activo": true
        },
        {
          "idCheckpoint": "038",
          "especialidad": "familia",
          "orden": 7,
          "nombre": "1.6.- Traslado de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "039",
          "especialidad": "familia",
          "orden": 8,
          "nombre": "1.7.- Contestación de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "040",
          "especialidad": "familia",
          "orden": 9,
          "nombre": "1.8.- Audiencia",
          "activo": true
        },
        {
          "idCheckpoint": "041",
          "especialidad": "familia",
          "orden": 10,
          "nombre": "1.9.- Sentencia de primera instancia",
          "activo": true
        },
        {
          "idCheckpoint": "042",
          "especialidad": "familia",
          "orden": 11,
          "nombre": "SEGUNDA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "043",
          "especialidad": "familia",
          "orden": 12,
          "nombre": "2.1.- Apelación o absolución de apelación",
          "activo": true
        },
        {
          "idCheckpoint": "044",
          "especialidad": "familia",
          "orden": 13,
          "nombre": "2.2.- Elevación del expediente a superior",
          "activo": true
        },
        {
          "idCheckpoint": "045",
          "especialidad": "familia",
          "orden": 14,
          "nombre": "2.3.- Audiencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "046",
          "especialidad": "familia",
          "orden": 15,
          "nombre": "2.4.- Sentencia de vista",
          "activo": true
        },
        {
          "idCheckpoint": "047",
          "especialidad": "familia",
          "orden": 16,
          "nombre": "RECUSOS EXTRAORDINARIOS",
          "activo": true
        },
        {
          "idCheckpoint": "048",
          "especialidad": "familia",
          "orden": 17,
          "nombre": "3.1.- Elaboración de casación, queja o amparo",
          "activo": true
        },
        {
          "idCheckpoint": "049",
          "especialidad": "familia",
          "orden": 18,
          "nombre": "3.2.- Calificación de recurso",
          "activo": true
        },
        {
          "idCheckpoint": "050",
          "especialidad": "familia",
          "orden": 19,
          "nombre": "3.3.- Audiencia de Vista de la causa",
          "activo": true
        },
        {
          "idCheckpoint": "051",
          "especialidad": "familia",
          "orden": 20,
          "nombre": "3.4.- Sentencia de casación, queja o amparo",
          "activo": true
        },
        {
          "idCheckpoint": "052",
          "especialidad": "familia",
          "orden": 21,
          "nombre": "ETAPA EJECUTORIA",
          "activo": true
        },
        {
          "idCheckpoint": "053",
          "especialidad": "familia",
          "orden": 22,
          "nombre": "4.1.- Consentimiento de sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "054",
          "especialidad": "familia",
          "orden": 23,
          "nombre": "4.2.- Cursar oficios",
          "activo": true
        },
        {
          "idCheckpoint": "055",
          "especialidad": "familia",
          "orden": 24,
          "nombre": "4.3.- Presentar o absolver liquidaciones",
          "activo": true
        },
        {
          "idCheckpoint": "056",
          "especialidad": "familia",
          "orden": 25,
          "nombre": "4.4.- Requerimiento de pago",
          "activo": true
        },
        {
          "idCheckpoint": "057",
          "especialidad": "familia",
          "orden": 26,
          "nombre": "4.5.- Remisión al Ministerio Público",
          "activo": true
        },
        {
          "idCheckpoint": "058",
          "especialidad": "familia",
          "orden": 27,
          "nombre": "MEDIDAS CAUTELARES",
          "activo": true
        },
        {
          "idCheckpoint": "059",
          "especialidad": "familia",
          "orden": 28,
          "nombre": "5.1.- Elaboración de medida cautelar",
          "activo": true
        },
        {
          "idCheckpoint": "060",
          "especialidad": "familia",
          "orden": 29,
          "nombre": "5.2.- Presentación de medida cautelar",
          "activo": true
        },
        {
          "idCheckpoint": "061",
          "especialidad": "familia",
          "orden": 30,
          "nombre": "5.3.- Calificación de medida cautelar",
          "activo": true
        },
        {
          "idCheckpoint": "062",
          "especialidad": "familia",
          "orden": 31,
          "nombre": "5.4.- Ejecución de medida cautelar",
          "activo": true
        },
        {
          "idCheckpoint": "063",
          "especialidad": "familia",
          "orden": 32,
          "nombre": "5.5.- Levantamiento de medida cautelar",
          "activo": true
        },
        {
          "idCheckpoint": "064",
          "especialidad": "civil",
          "orden": 1,
          "nombre": "PRIMERA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "065",
          "especialidad": "civil",
          "orden": 2,
          "nombre": "1.- Conciliación Extrajudicial",
          "activo": true
        },
        {
          "idCheckpoint": "066",
          "especialidad": "civil",
          "orden": 3,
          "nombre": "2.- Interposición de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "067",
          "especialidad": "civil",
          "orden": 4,
          "nombre": "3.- Calificación de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "068",
          "especialidad": "civil",
          "orden": 5,
          "nombre": "4.- Subsanar de acuerdo al auto de inadmisibilidad de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "069",
          "especialidad": "civil",
          "orden": 6,
          "nombre": "5.- Emplazamiento de la demanda",
          "activo": true
        },
        {
          "idCheckpoint": "070",
          "especialidad": "civil",
          "orden": 7,
          "nombre": "6.- Interponer tachas u oposiciones a las pruebas",
          "activo": true
        },
        {
          "idCheckpoint": "071",
          "especialidad": "civil",
          "orden": 8,
          "nombre": "7.- Absolver tachas u oposiciones",
          "activo": true
        },
        {
          "idCheckpoint": "072",
          "especialidad": "civil",
          "orden": 9,
          "nombre": "8.- Interponer excepciones o defensas previas",
          "activo": true
        },
        {
          "idCheckpoint": "073",
          "especialidad": "civil",
          "orden": 10,
          "nombre": "9.- Absolver el traslado de las excepciones o defensas previas",
          "activo": true
        },
        {
          "idCheckpoint": "074",
          "especialidad": "civil",
          "orden": 11,
          "nombre": "10.- Contestar la demanda y reconvenir",
          "activo": true
        },
        {
          "idCheckpoint": "075",
          "especialidad": "civil",
          "orden": 12,
          "nombre": "11.- Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención",
          "activo": true
        },
        {
          "idCheckpoint": "076",
          "especialidad": "civil",
          "orden": 13,
          "nombre": "12.- Absolver el traslado de la reconvención",
          "activo": true
        },
        {
          "idCheckpoint": "077",
          "especialidad": "civil",
          "orden": 14,
          "nombre": "13.- Saneamiento",
          "activo": true
        },
        {
          "idCheckpoint": "078",
          "especialidad": "civil",
          "orden": 15,
          "nombre": "14.- Fijación de puntos controvertidos",
          "activo": true
        },
        {
          "idCheckpoint": "079",
          "especialidad": "civil",
          "orden": 16,
          "nombre": "15.- Realización de la audiencia de pruebas",
          "activo": true
        },
        {
          "idCheckpoint": "080",
          "especialidad": "civil",
          "orden": 17,
          "nombre": "16.- Audiencia especial y complementaria",
          "activo": true
        },
        {
          "idCheckpoint": "081",
          "especialidad": "civil",
          "orden": 18,
          "nombre": "17.- Alegados",
          "activo": true
        },
        {
          "idCheckpoint": "082",
          "especialidad": "civil",
          "orden": 19,
          "nombre": "18.- Sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "083",
          "especialidad": "civil",
          "orden": 20,
          "nombre": "SEGUNDA INSTANCIA",
          "activo": true
        },
        {
          "idCheckpoint": "084",
          "especialidad": "civil",
          "orden": 21,
          "nombre": "19.- Apelar sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "085",
          "especialidad": "civil",
          "orden": 22,
          "nombre": "20.- Subsanar el recurso de apelación según el auto que declara la inadmisibilidad",
          "activo": true
        },
        {
          "idCheckpoint": "086",
          "especialidad": "civil",
          "orden": 23,
          "nombre": "21.- Elevar el expediente",
          "activo": true
        },
        {
          "idCheckpoint": "087",
          "especialidad": "civil",
          "orden": 24,
          "nombre": "22.- Traslado para absolver el escrito el escrito de apelación o adherirse al mismo",
          "activo": true
        },
        {
          "idCheckpoint": "088",
          "especialidad": "civil",
          "orden": 25,
          "nombre": "23.- Traslado al apelante para absolver la adhesión",
          "activo": true
        },
        {
          "idCheckpoint": "089",
          "especialidad": "civil",
          "orden": 26,
          "nombre": "24.- Audiencia de pruebas",
          "activo": true
        },
        {
          "idCheckpoint": "090",
          "especialidad": "civil",
          "orden": 27,
          "nombre": "25.- Vista de la causa",
          "activo": true
        },
        {
          "idCheckpoint": "091",
          "especialidad": "civil",
          "orden": 28,
          "nombre": "26.- Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa",
          "activo": true
        },
        {
          "idCheckpoint": "092",
          "especialidad": "civil",
          "orden": 29,
          "nombre": "CASACION",
          "activo": true
        },
        {
          "idCheckpoint": "093",
          "especialidad": "civil",
          "orden": 30,
          "nombre": "27.- Interposición de casación",
          "activo": true
        },
        {
          "idCheckpoint": "094",
          "especialidad": "civil",
          "orden": 31,
          "nombre": "28.- Vista de la causa",
          "activo": true
        },
        {
          "idCheckpoint": "095",
          "especialidad": "civil",
          "orden": 32,
          "nombre": "29.- Solicitar informe oral por parte de las partes",
          "activo": true
        },
        {
          "idCheckpoint": "096",
          "especialidad": "civil",
          "orden": 33,
          "nombre": "30.- Sentencia de casación",
          "activo": true
        },
        {
          "idCheckpoint": "097",
          "especialidad": "notarial",
          "orden": 1,
          "nombre": "ETAPAS NOTARIALES",
          "activo": true
        },
        {
          "idCheckpoint": "098",
          "especialidad": "notarial",
          "orden": 2,
          "nombre": "1.1.- Solicitud de requisitos",
          "activo": true
        },
        {
          "idCheckpoint": "099",
          "especialidad": "notarial",
          "orden": 3,
          "nombre": "1.2.- Citas con el modulo especializado",
          "activo": true
        },
        {
          "idCheckpoint": "100",
          "especialidad": "notarial",
          "orden": 4,
          "nombre": "1.3.- Firmas de escritura",
          "activo": true
        },
        {
          "idCheckpoint": "101",
          "especialidad": "notarial",
          "orden": 5,
          "nombre": "1.4.- Publicacion en edictos",
          "activo": true
        },
        {
          "idCheckpoint": "102",
          "especialidad": "notarial",
          "orden": 6,
          "nombre": "1.5.- Entrega de escrituras",
          "activo": true
        },
        {
          "idCheckpoint": "103",
          "especialidad": "notarial",
          "orden": 7,
          "nombre": "ETAPAS REGISTRALES",
          "activo": true
        },
        {
          "idCheckpoint": "104",
          "especialidad": "notarial",
          "orden": 8,
          "nombre": "2.1.- Inscripcion en Registros Publicos",
          "activo": true
        },
        {
          "idCheckpoint": "105",
          "especialidad": "notarial",
          "orden": 9,
          "nombre": "2.2.- Observaciones en Registros Publicos",
          "activo": true
        },
        {
          "idCheckpoint": "106",
          "especialidad": "notarial",
          "orden": 10,
          "nombre": "2.3.- Subsanacion de observaciones",
          "activo": true
        },
        {
          "idCheckpoint": "107",
          "especialidad": "notarial",
          "orden": 11,
          "nombre": "2.4.- Cita con registrador",
          "activo": true
        },
        {
          "idCheckpoint": "108",
          "especialidad": "notarial",
          "orden": 12,
          "nombre": "2.5.- Inscripcion preventiva con publicacion",
          "activo": true
        },
        {
          "idCheckpoint": "109",
          "especialidad": "notarial",
          "orden": 13,
          "nombre": "2.6.- Inscripcion definitiva",
          "activo": true
        },
        {
          "idCheckpoint": "110",
          "especialidad": "penal",
          "orden": 1,
          "nombre": "ETAPA I: DENUNCIA",
          "activo": true
        },
        {
          "idCheckpoint": "111",
          "especialidad": "penal",
          "orden": 2,
          "nombre": "1.- Denuncia",
          "activo": true
        },
        {
          "idCheckpoint": "112",
          "especialidad": "penal",
          "orden": 3,
          "nombre": "ETAPA II: INVESTIGACIÓN PREPARATORIA PRELIMINAR",
          "activo": true
        },
        {
          "idCheckpoint": "113",
          "especialidad": "penal",
          "orden": 4,
          "nombre": "2.- Solicitar diligencias y/o presentar medios de prueba",
          "activo": true
        },
        {
          "idCheckpoint": "114",
          "especialidad": "penal",
          "orden": 5,
          "nombre": "3.- Solicitar el archivo de la investigación (INVESTIGADO) / Solicitar que se formalice la investigación (AGRAVIADO)",
          "activo": true
        },
        {
          "idCheckpoint": "115",
          "especialidad": "penal",
          "orden": 6,
          "nombre": "4.- Tutela de derechos/audiencia tutela de derechos",
          "activo": true
        },
        {
          "idCheckpoint": "116",
          "especialidad": "penal",
          "orden": 7,
          "nombre": "5.- Control de plazos/audiencia de control de plazos",
          "activo": true
        },
        {
          "idCheckpoint": "117",
          "especialidad": "penal",
          "orden": 8,
          "nombre": "6.- Elevación de actuados",
          "activo": true
        },
        {
          "idCheckpoint": "118",
          "especialidad": "penal",
          "orden": 9,
          "nombre": "7.- Oposición de Incoación de Proceso Inmediato/Audiencia de Incoación de Proceso Inmediato",
          "activo": true
        },
        {
          "idCheckpoint": "119",
          "especialidad": "penal",
          "orden": 10,
          "nombre": "ETAPA III: INVESTIGACIÓN PREPARATORIA FORMALIZADA",
          "activo": true
        },
        {
          "idCheckpoint": "120",
          "especialidad": "penal",
          "orden": 11,
          "nombre": "8.- Solicitar diligencias y/o presentar medios de prueba",
          "activo": true
        },
        {
          "idCheckpoint": "121",
          "especialidad": "penal",
          "orden": 12,
          "nombre": "9.- Tutela de derechos/audiencia tutela de derechos",
          "activo": true
        },
        {
          "idCheckpoint": "122",
          "especialidad": "penal",
          "orden": 13,
          "nombre": "10.- Control de plazos/audiencia de control de plazos",
          "activo": true
        },
        {
          "idCheckpoint": "123",
          "especialidad": "penal",
          "orden": 14,
          "nombre": "11.- Solicitar Prisión Preventiva (AGRAVIADO) / Absolver requerimiento de prisión preventiva (IMPUTADO). AUDIENCIA",
          "activo": true
        },
        {
          "idCheckpoint": "124",
          "especialidad": "penal",
          "orden": 15,
          "nombre": "12.- Solicitar Prorroga de Prisión Preventiva (AGRAVIADO) / Solicitar Cesación de prisión preventiva (IMPUTADO). AUDIENCIA",
          "activo": true
        },
        {
          "idCheckpoint": "125",
          "especialidad": "penal",
          "orden": 16,
          "nombre": "13.- Solicitar Constitución en Actor Civil y/o Tercero Civil (AGRAVIADO) / Oponerse a solicitud de Actor Civil y/o Tercero Civil (IMPUTADO)",
          "activo": true
        },
        {
          "idCheckpoint": "126",
          "especialidad": "penal",
          "orden": 17,
          "nombre": "ETAPA IV: ETAPA INTERMEDIA",
          "activo": true
        },
        {
          "idCheckpoint": "127",
          "especialidad": "penal",
          "orden": 18,
          "nombre": "14.- Absolución de la Acusación y/o Sobreseimiento / Audiencia de Control",
          "activo": true
        },
        {
          "idCheckpoint": "128",
          "especialidad": "penal",
          "orden": 19,
          "nombre": "ETAPA V: ETAPA DE JUICIO ORAL",
          "activo": true
        },
        {
          "idCheckpoint": "129",
          "especialidad": "penal",
          "orden": 20,
          "nombre": "15.- Audiencia de Juicio",
          "activo": true
        },
        {
          "idCheckpoint": "130",
          "especialidad": "penal",
          "orden": 21,
          "nombre": "16.- Sentencia 1° Instancia",
          "activo": true
        },
        {
          "idCheckpoint": "131",
          "especialidad": "penal",
          "orden": 22,
          "nombre": "ETAPA VI: IMPUGNATORIA",
          "activo": true
        },
        {
          "idCheckpoint": "132",
          "especialidad": "penal",
          "orden": 23,
          "nombre": "17.- Apelación Auto/Sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "133",
          "especialidad": "penal",
          "orden": 24,
          "nombre": "18.- Recurso de Reposición",
          "activo": true
        },
        {
          "idCheckpoint": "134",
          "especialidad": "penal",
          "orden": 25,
          "nombre": "19.- Audiencia de Apelación",
          "activo": true
        },
        {
          "idCheckpoint": "135",
          "especialidad": "penal",
          "orden": 26,
          "nombre": "20.- Sentencia de Vista",
          "activo": true
        },
        {
          "idCheckpoint": "136",
          "especialidad": "penal",
          "orden": 27,
          "nombre": "21.- Casación",
          "activo": true
        },
        {
          "idCheckpoint": "137",
          "especialidad": "penal",
          "orden": 28,
          "nombre": "ETAPA VII: ETAPA EJECUTORA",
          "activo": true
        },
        {
          "idCheckpoint": "138",
          "especialidad": "penal",
          "orden": 29,
          "nombre": "22.- Solicitar al PJ se ejecute la sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "139",
          "especialidad": "penal",
          "orden": 30,
          "nombre": "23.- Solicitar al Ministerio Publico Revocatoria de pena",
          "activo": true
        },
        {
          "idCheckpoint": "140",
          "especialidad": "penal",
          "orden": 31,
          "nombre": "24.- Audiencia de Revocatoria de Pena Suspendida",
          "activo": true
        },
        {
          "idCheckpoint": "141",
          "especialidad": "constitucional",
          "orden": 1,
          "nombre": "ETAPA I: POSTULATORIA",
          "activo": true
        },
        {
          "idCheckpoint": "142",
          "especialidad": "constitucional",
          "orden": 2,
          "nombre": "1.1.- Elaboración Demanda",
          "activo": true
        },
        {
          "idCheckpoint": "143",
          "especialidad": "constitucional",
          "orden": 3,
          "nombre": "1.2- Presentación Demanda",
          "activo": true
        },
        {
          "idCheckpoint": "144",
          "especialidad": "constitucional",
          "orden": 4,
          "nombre": "1.3.- Auto Admisorio",
          "activo": true
        },
        {
          "idCheckpoint": "145",
          "especialidad": "constitucional",
          "orden": 5,
          "nombre": "1.4.- Contestación de demanda",
          "activo": true
        },
        {
          "idCheckpoint": "146",
          "especialidad": "constitucional",
          "orden": 6,
          "nombre": "ETAPA II: PROBATORIA",
          "activo": true
        },
        {
          "idCheckpoint": "147",
          "especialidad": "constitucional",
          "orden": 7,
          "nombre": "2.1.- Audiencia Única",
          "activo": true
        },
        {
          "idCheckpoint": "148",
          "especialidad": "constitucional",
          "orden": 8,
          "nombre": "ETAPA III: DECISORIA",
          "activo": true
        },
        {
          "idCheckpoint": "149",
          "especialidad": "constitucional",
          "orden": 9,
          "nombre": "3.1.- Sentencia 1ra instancia",
          "activo": true
        },
        {
          "idCheckpoint": "150",
          "especialidad": "constitucional",
          "orden": 10,
          "nombre": "ETAPA IV: IMPUGNATORIA",
          "activo": true
        },
        {
          "idCheckpoint": "151",
          "especialidad": "constitucional",
          "orden": 11,
          "nombre": "4.1.- Recurso apelación",
          "activo": true
        },
        {
          "idCheckpoint": "152",
          "especialidad": "constitucional",
          "orden": 12,
          "nombre": "4.2.- Audiencia vista de la causa",
          "activo": true
        },
        {
          "idCheckpoint": "153",
          "especialidad": "constitucional",
          "orden": 13,
          "nombre": "4.3.- Sentencia de vista 2da instancia",
          "activo": true
        },
        {
          "idCheckpoint": "154",
          "especialidad": "constitucional",
          "orden": 14,
          "nombre": "4.4.- Recurso de Agravio Constitucional",
          "activo": true
        },
        {
          "idCheckpoint": "155",
          "especialidad": "constitucional",
          "orden": 15,
          "nombre": "4.5.- Sentencia del Tribunal Constitucional",
          "activo": true
        },
        {
          "idCheckpoint": "156",
          "especialidad": "constitucional",
          "orden": 16,
          "nombre": "ETAPA V: EJECUTORIA",
          "activo": true
        },
        {
          "idCheckpoint": "157",
          "especialidad": "constitucional",
          "orden": 17,
          "nombre": "5.1.- Ejecución de Sentencia",
          "activo": true
        },
        {
          "idCheckpoint": "158",
          "especialidad": "constitucional",
          "orden": 18,
          "nombre": "5.2.- Resolución concentida y firme",
          "activo": true
        },
        {
          "idCheckpoint": "159",
          "especialidad": "constitucional",
          "orden": 19,
          "nombre": "5.3.- Costas y Costos",
          "activo": true
        }
      ];

      let especialidad = this.expediente.especialidad.toLocaleLowerCase();
      // let especialidad = 'laboral';

      switch (especialidad) {
        case 'laboral':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'laboral');
          break;
        case 'familia':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'familia');
          break;
        case 'civil':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'civil');
          break;
        case 'penal':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'penal');
          break;
        case 'notarial':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'notarial');
          break;
        case 'constitucional':
          this.checkpoints = checkpoints.filter(a => a.especialidad == 'constitucional');
          break;
        default:
          console.log('f bb')
      }

    }
  }

  iniciarCambioCheckpoint(modal: any) {
    this.frmCheckpoint.reset();

    let especialidad = this.expediente?.especialidad.toLocaleLowerCase();
    let size = especialidad == 'penal' ? 'lg' : 'md';

    this.modalService.open(modal, {
      size: size
    });
  }

  seleccionarCheckpoint() {
    let idCheckpoint = this.frmCheckpoint.controls['id'].value;
    let checkpointSeleccionado = this.checkpoints.filter(a => a.idCheckpoint == idCheckpoint)[0];
    this.frmCheckpoint.patchValue({
      nombre: checkpointSeleccionado.nombre,
    })
  }

  concretarCambioCheckpoint() {
    this.actualizando = true;

    let idCheckpoint = this.frmCheckpoint.controls['id'].value;
    let nombreCheckpoint = this.frmCheckpoint.controls['nombre'].value;
    let fechaCheckpoint = this.frmCheckpoint.controls['fecha'].value;

    // agregar el nuevo checkpoint
    const timestamp = (new Date()).getTime();
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp}${letraAleatoria}`;
    const usuario = localStorage.getItem('nombre');

    this.db.collection('changelog').doc(idGenerado).set({
      idChangelog: idGenerado,
      idExpediente: this.expediente?.idExpediente,
      idCheckpoint: idCheckpoint,
      nombreCheckpoint: nombreCheckpoint,
      fecha: fechaCheckpoint,

      actualizadoPor: usuario,
      fechaCreacion: timestamp,
    }).then(() => {
      this.frmCheckpoint.reset();
      this.modalService.dismissAll();

      this.db.collection('expedientes').doc(this.expediente?.idExpediente).update({
        idCheckpoint: idCheckpoint,
        nombreCheckpoint: nombreCheckpoint,
      });
      if (this.expediente)
        this.expediente.nombreCheckpoint = nombreCheckpoint;
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.actualizando = false;
    })
  }

  generarLetraAleatoria() {
    const codigoASCII_A = 65;
    const codigoASCII_Z = 90;

    const codigoAleatorio = Math.floor(Math.random() * (codigoASCII_Z - codigoASCII_A + 1)) + codigoASCII_A;

    // Convierte el código ASCII a su carácter correspondiente
    const letraAleatoria = String.fromCharCode(codigoAleatorio);

    return letraAleatoria;
  }

}
