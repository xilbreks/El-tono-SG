interface Iter {
  id: number,
  pick: boolean,
  desc: string,
}

export const lstIterLaboral: Array<Iter> = [
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

export const lstIterPenal: Array<Iter> = [
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

export const lstIterCivil: Array<Iter> = [
  { id: 0, pick: false, desc: 'PRIMERA INSTANCIA' },
  { id: 1, pick: true, desc: '1.- Conciliación Extrajudicial' },
  { id: 2, pick: true, desc: '2.- Interposición de la demanda' },
  { id: 3, pick: true, desc: '3.- Calificación de la demanda' },
  { id: 4, pick: true, desc: '4.- Subsanar de acuerdo al auto de inadmisibilidad de la demanda' },
  { id: 5, pick: true, desc: '5.- Emplazamiento de la demanda' },
  { id: 6, pick: true, desc: '6.- Interponer tachas u oposiciones a las pruebas' },
  { id: 7, pick: true, desc: '7.- Absolver tachas u oposiciones' },
  { id: 8, pick: true, desc: '8.- Interponer excepciones o defensas previas' },
  { id: 9, pick: true, desc: '9.- Absolver el traslado de las excepciones o defensas previas' },
  { id: 10, pick: true, desc: '10.- Contestar la demanda y reconvenir' },
  { id: 11, pick: true, desc: '11.- Ofrecimiento de medios probatorios si en la contestación se invoca hechos no expuestos en la demanda o en la reconvención' },
  { id: 12, pick: true, desc: '12.- Absolver el traslado de la reconvención' },
  { id: 13, pick: true, desc: '13.- Saneamiento' },
  { id: 14, pick: true, desc: '14.- Fijación de puntos controvertidos' },
  { id: 15, pick: true, desc: '15.- Realización de la audiencia de pruebas' },
  { id: 16, pick: true, desc: '16.- Audiencia especial y complementaria' },
  { id: 17, pick: true, desc: '17.- Alegados' },
  { id: 18, pick: true, desc: '18.- Sentencia' },
  { id: 0, pick: false, desc: 'SEGUNDA INSTANCIA' },
  { id: 19, pick: true, desc: '19.- Apelar sentencia' },
  { id: 20, pick: true, desc: '20.- Subsanar el recurso de apelación según el auto que declara la inadmisibilidad' },
  { id: 21, pick: true, desc: '21.- Elevar el expediente' },
  { id: 22, pick: true, desc: '22.- Traslado para absolver el escrito el escrito de apelación o adherirse al mismo' },
  { id: 23, pick: true, desc: '23.- Traslado al apelante para absolver la adhesión' },
  { id: 24, pick: true, desc: '24.- Audiencia de pruebas' },
  { id: 25, pick: true, desc: '25.- Vista de la causa' },
  { id: 26, pick: true, desc: '26.- Solicitar informe oral contado desde la notificación de la resolución que fija fecha para la vista de causa' },
  { id: 0, pick: false, desc: 'CASACION' },
  { id: 27, pick: true, desc: '27.- Interposición de casación' },
  { id: 28, pick: true, desc: '28.- Vista de la causa' },
  { id: 29, pick: true, desc: '29.- Solicitar informe oral por parte de las partes' },
  { id: 30, pick: true, desc: '30.- Sentencia de casación' },
];

export const lstIterFamilia: Array<Iter> = [
  { id: 1, pick: true, desc: '1: Preparación de la demanda' },
  { id: 2, pick: true, desc: '2: Recabación de medios probatorios' },
  { id: 3, pick: true, desc: '3: Postulación del proceso' },
  { id: 4, pick: true, desc: '4: Calificación de la demanda' },
  { id: 5, pick: true, desc: '5: Subsanación de la demanda' },
  { id: 6, pick: true, desc: '6: Traslado de la demanda' },
  { id: 7, pick: true, desc: '7: Contestación de la demanda' },
  { id: 8, pick: true, desc: '8: Audiencia' },
  { id: 9, pick: true, desc: '9: Sentencia' },
  { id: 10, pick: true, desc: '10: Apelación' },
  { id: 11, pick: true, desc: '11: Audiencia de vista' },
  { id: 12, pick: true, desc: '12: Ejecución de sentencia' },
  { id: 13, pick: true, desc: '13: Medidas cautelares' },
];

export const lstIterOtros = [
  { id: 0, pick: true, desc: 'nc' },
  { id: 1, pick: true, desc: '1' },
  { id: 2, pick: true, desc: '2' },
  { id: 3, pick: true, desc: '3' },
  { id: 4, pick: true, desc: '4' },
  { id: 5, pick: true, desc: '5' },
  { id: 6, pick: true, desc: '6' },
  { id: 7, pick: true, desc: '7' },
  { id: 8, pick: true, desc: '8' },
  { id: 9, pick: true, desc: '9' },
  { id: 10, pick: true, desc: '10' },
  { id: 11, pick: true, desc: '11' },
  { id: 12, pick: true, desc: '12' },
  { id: 13, pick: true, desc: '13' },
  { id: 14, pick: true, desc: '14' },
  { id: 15, pick: true, desc: '15' },
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

