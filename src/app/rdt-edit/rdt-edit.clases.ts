interface Iter {
  code: string,
  eligible: boolean,
  title: string
}

export const lstIterLaboral: Array<Iter> = [
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

export const lstIterPenal: Array<Iter> = [
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

export const lstIterCivil: Array<Iter> = [
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

export const lstIterFamilia: Array<Iter> = [
  { code: '1', eligible: true, title: 'Preparación de la demanda' },
  { code: '2', eligible: true, title: 'Recabación de medios probatorios' },
  { code: '3', eligible: true, title: 'Postulación del proceso' },
  { code: '4', eligible: true, title: 'Calificación de la demanda' },
  { code: '5', eligible: true, title: 'Subsanación de la demanda' },
  { code: '6', eligible: true, title: 'Traslado de la demanda' },
  { code: '7', eligible: true, title: 'Contestación de la demanda' },
  { code: '8', eligible: true, title: 'Audiencia' },
  { code: '9', eligible: true, title: 'Sentencia' },
  { code: '10', eligible: true, title: 'Apelación' },
  { code: '11', eligible: true, title: 'Audiencia de vista' },
  { code: '12', eligible: true, title: 'Ejecución de sentencia' },
  { code: '13', eligible: true, title: 'Medidas cautelares' },
];

export const lstIterConstitucional: Array<Iter> = [
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

export const lstIterOtros: Array<Iter> = [
  { code: '0', eligible: true, title: 'nc' },
  { code: '1', eligible: true, title: '1' },
  { code: '2', eligible: true, title: '2' },
  { code: '3', eligible: true, title: '3' },
  { code: '4', eligible: true, title: '4' },
  { code: '5', eligible: true, title: '5' },
  { code: '6', eligible: true, title: '6' },
  { code: '7', eligible: true, title: '7' },
  { code: '8', eligible: true, title: '8' },
  { code: '9', eligible: true, title: '9' },
  { code: '10', eligible: true, title: '10' },
  { code: '11', eligible: true, title: '11' },
  { code: '12', eligible: true, title: '12' },
  { code: '13', eligible: true, title: '13' },
  { code: '14', eligible: true, title: '14' },
  { code: '15', eligible: true, title: '15' },
]

export const lstDiligencias = [
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
  { id: 47, pick: true, desc: '47.- ORALIZAR AUDIENCIAS DE CONCILIACIÓN Y JUZGAMIENTO' },
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
  { id: 103, pick: true, desc: '103.- ACTUALIZACION DEL PLANER y/o EXCELS' },
  { id: 104, pick: true, desc: '104.- SESIONES DE COMPARTIR(ANIVERSARIOS, CUMPLEAÑOS, FESTIVIDADES, ETC)' },
  { id: 105, pick: true, desc: '105.- SACAR COPIAS / IMPRIMIR / QUEMAR CDs' },
  { id: 106, pick: true, desc: '106.- GRABACION DE VIDEOS y/o TOMA DE FOTOS' },
  { id: 107, pick: true, desc: '107.- TRANSCRIPCION DE AUDIOS y/o VIDEOS' },
  { id: 110, pick: true, desc: '110.- LLENADO DE RDT' },
];

