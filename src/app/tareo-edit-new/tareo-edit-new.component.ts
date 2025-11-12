import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppService } from './../app.service';
import { Expediente } from '../_interfaces/expediente';
import { Tareo } from '../_interfaces/tareo';
import { Tarea } from '../_interfaces/tarea';

const URL_TAREAS = 'tareas';

@Component({
  selector: 'app-tareo-edit-new',
  templateUrl: './tareo-edit-new.component.html',
  styleUrl: './tareo-edit-new.component.scss'
})
export class TareoEditNewComponent {
  idTareo: string = '';
  tareo: Tareo | null = null;
  tareas: Tarea[] = [];
  tiempoTotalTareas: string = '--:--';
  cargando: boolean = false;

  fcTipoTarea: FormControl = new FormControl('con');
  fcQueryBox: FormControl = new FormControl('');

  frmNuevaTarea: FormGroup;         // Formulario para tareas nuevas
  frmEditarTarea: FormGroup;        // Formulario para tareas existentes

  registrando: boolean = false;
  actualizando: boolean = false;
  encontrando: boolean = false;

  expedientes: any[] = [];
  expedientesCompletos: any[] = [
    {
      "juzgado": "LURIN3",
      "prioridad": "MEDIA",
      "nombreCliente": "-",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "dni": "-",
      "idExpediente": "E000001",
      "codigo": "OL-001",
      "numeroPrincipal": null,
      "idCheckpoint": 1.2,
      "nombreCheckpoint": "nombre lorem",
      "tieneContrato": 'si',
      "numeroProvisional": "000-FRESELLA-EXP",
      "motivoFinalizacion": "Dado de baja para que no interrumpa",
      "especialidad": "NOTARIAL",
      "fechaCreacion": 1732320859914,
      "demandado": "MANAGERS SAC",
      "observaciones": "Notas de prueba.",
      "salaCasacion": null,
      "numero": "99999-9999-0-9999-AA-AA-99",
      "demandante": "UMBRELLITA ELLITA",
      "celular": "-",
      "clase": "PRINCIPAL",
      "fechaInicio": "2024-11-14",
      "estado": "FINALIZADO",
      "numeroCasacion": null,
      "detalleContrato": "-",
      "materia": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR"
    },
    {
      "dni": "29523788",
      "juzgado": "ESPECIALIZADO-CIVIL",
      "demandado": "EUSEBIA CARMELA VERA RIVERA",
      "especialidad": "CIVIL",
      "estado": "EN PROCESO",
      "numero": "0000",
      "motivoFinalizacion": null,
      "materia": "INFORME ECONOMICO DE TODOS SUS CASOS DR. JUAN PINTO LINARES",
      "codigo": null,
      "nombreCliente": "JUAN GILBERTO PINTO LINARES",
      "prioridad": "ALTA",
      "idCheckpoint": 2,
      "nombreCheckpoint": "nombre lorem",
      "titulo": "EXPEDIENTE PROVISIONAL",
      "fechaCreacion": 1734992547287,
      "numeroCasacion": null,
      "detalleContrato": "HONORARIOS PROFESIONALES",
      "numeroProvisional": null,
      "tieneContrato": 'si',
      "salaCasacion": null,
      "clase": "PROVISIONAL",
      "demandante": "JUAN GILBERTO PINTO LINARES",
      "idExpediente": "E000002",
      "observaciones": "SE ATENDIO PRESENCIALMENTE AL DR. JUAN PINTO LINARES, SE COMPROMETE A CANCELAR S/. 900.00 SOLES CON FECHA 30 DE JULIO 2025. ATTE. LIZBET SILVA GUILLEN \n\nSE DEJA CONSTANCIA QUE EL DR. JUAN PINTO LINARES, CANCELA S/. 700.00 SOLES MENSUALES DE TODOS SUS PROCESOS. ATTE. LIZBET SILVA\n\n\nEl 28 de abril cancelara la cuota de marzo, atentamente Camila Arnica, el 03 de abril.",
      "celular": "959662299",
      "numeroPrincipal": null,
      "fechaInicio": "2024-12-27"
    },
    {
      "detalleContrato": "HONORARIOS PROFESIONALES - incluye REDACCIÓN DE DEMANDA y CONTESTACIÓN DE DEMANDA, por la suma de S/. 3000.00 o el equivalente que es $/. 817.00 DÓLARES AMERICANOS, LUEGO SE REFORMULARA HONORARIOS;\nGASTOS ARANCELES JUDICIALES - COPIAS Y OTROS por la suma de S/. 800.00 SOLES, los cuales serán cancelados cuando el Abg. REYES les devuelva su dinero.",
      "motivoFinalizacion": null,
      "numeroProvisional": "00001",
      "nombreCliente": "SOTOMAYOR SAAVEDRA AMALIA",
      "estado": "EN PROCESO",
      "numeroCasacion": null,
      "demandante": "SOTOMAYOR SAAVEDRA AMALIA",
      "clase": "PRINCIPAL",
      "demandado": "SALAS SOTOMAYOR JULIO ROSENDO",
      "dni": "-",
      "salaCasacion": null,
      "juzgado": "10º JUZGADO CIVIL",
      "numero": "01669-2000-0-0401-JR-CI-10",
      "tieneContrato": 'si',
      "especialidad": "CIVIL",
      "prioridad": "ALTA",
      "materia": "APOYO Y SALVAGUARDA",
      "fechaCreacion": 1737134934868,
      "numeroPrincipal": null,
      "celular": "-",
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "idExpediente": "E000003",
      "observaciones": "",
      "codigo": null,
      "fechaInicio": "2025-01-14",
      "titulo": "EXPEDIENTE PRINCIPAL"
    },
    {
      "demandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "numero": "00003-2021-0-0401-JR-LA-02",
      "materia": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "dni": "-",
      "detalleContrato": "-",
      "prioridad": "MEDIA",
      "demandante": "FERREYRA BENDEZU CHRISTIAN ROGER",
      "codigo": "LI-0007",
      "clase": "PRINCIPAL",
      "nombreCliente": "FERREYRA BENDEZU CHRISTIAN ROGER",
      "numeroPrincipal": null,
      "fechaInicio": "2021-01-02",
      "idExpediente": "E000004",
      "fechaCreacion": 1693803600000,
      "numeroProvisional": null,
      "observaciones": "",
      "celular": "-",
      "salaCasacion": null,
      "idCheckpoint": 7.3,
      "nombreCheckpoint": "nombre lorem",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "numeroCasacion": null,
      "motivoFinalizacion": null,
      "estado": "EN PROCESO",
      "tieneContrato": 'no',
      "juzgado": "2º JUZGADO DE TRABAJO",
      "especialidad": "LABORAL"
    },
    {
      "dni": "-",
      "numeroCasacion": null,
      "motivoFinalizacion": "SE CONCLUYO PROCESO, ATTE. LIZBET SILVA",
      "numero": "00003-2021-78-0401-JR-LA-02",
      "demandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "idExpediente": "E000005",
      "numeroPrincipal": "00003-2021-0-0401-JR-LA-02",
      "fechaCreacion": 1698346667701,
      "juzgado": "2º JUZGADO DE TRABAJO",
      "salaCasacion": null,
      "titulo": "CUADERNO",
      "clase": "CUADERNO",
      "numeroProvisional": null,
      "especialidad": "LABORAL",
      "idCheckpoint": 7.3,
      "nombreCheckpoint": "nombre lorem",
      "detalleContrato": "-",
      "estado": "FINALIZADO",
      "tieneContrato": 'no',
      "prioridad": "MEDIA",
      "celular": "-",
      "fechaInicio": "2023-06-19",
      "observaciones": "",
      "codigo": null,
      "demandante": "FERREYRA BENDEZU CHRISTIAN ROGER",
      "nombreCliente": "-",
      "materia": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO"
    },
    {
      "demandado": "NEUENSCHWANDER ZORRILLA, CAROLINA VICTORIA NEUENSCHWANDER ZORRILLA, FABIOLA ALEJANDRA NEUENSCHWANDER ZORRILLA, ALONSO FABRICIO",
      "estado": "FINALIZADO",
      "materia": "NULIDAD DE ACTO JURIDICO",
      "dni": "-",
      "observaciones": "",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "demandante": "ESPINOSA TEJADA, LARIZA ZINADA",
      "fechaCreacion": 1713540167056,
      "numero": "00007-2019-0-0411-JM-CI-01",
      "especialidad": "CIVIL",
      "prioridad": "MEDIA",
      "tieneContrato": 'no',
      "celular": "-",
      "fechaInicio": "2019-01-08",
      "nombreCliente": "-",
      "numeroPrincipal": null,
      "idExpediente": "E000006",
      "clase": "PRINCIPAL",
      "numeroCasacion": null,
      "juzgado": "JUZGADO CIVIL SEDE JACOBO HUNTER",
      "numeroProvisional": null,
      "detalleContrato": "-",
      "salaCasacion": null,
      "motivoFinalizacion": "-",
      "idCheckpoint": 0,
      "nombreCheckpoint": "nombre lorem",
      "codigo": null
    },
    {
      "nombreCliente": "-",
      "codigo": null,
      "detalleContrato": "-",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "idExpediente": "E000007",
      "tieneContrato": 'no',
      "especialidad": "LABORAL",
      "numeroCasacion": null,
      "dni": "-",
      "idCheckpoint": 0,
      "nombreCheckpoint": "nombre lorem",
      "fechaCreacion": 1693803600000,
      "demandante": "PEREZ OLARTE RENE GARY",
      "clase": "PRINCIPAL",
      "celular": "-",
      "prioridad": "MEDIA",
      "fechaInicio": "2019-08-13",
      "motivoFinalizacion": "-",
      "salaCasacion": null,
      "numeroPrincipal": null,
      "numero": "00009-2019-0-1009-JM-LA-01",
      "numeroProvisional": null,
      "juzgado": "JUZGADO CIVIL - SEDE ESPINAR",
      "materia": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR",
      "estado": "FINALIZADO",
      "observaciones": "",
      "demandado": "COMPANIA MINERA ANTAPACCAY SA"
    },
    {
      "fechaCreacion": 1692292983419,
      "salaCasacion": null,
      "dni": "-",
      "observaciones": "",
      "numeroPrincipal": null,
      "juzgado": "4° JUZGADO DE INV. PREPARATORIA IVOL. C. MUJER E IGF",
      "tieneContrato": 'no',
      "materia": "AGRESIONES EN CONTRA DE LAS MUJERES O INTEGRANTES DEL GRUPO FAMILIAR",
      "demandado": "IMPUTADO: ANCHAHUA HUAMANI EDUARDO ALFREDO",
      "fechaInicio": "2023-01-06",
      "numeroProvisional": null,
      "celular": "-",
      "demandante": "AGRAVIADO: HERNANDEZ EUNICE REBECA",
      "nombreCliente": "-",
      "codigo": null,
      "especialidad": "PENAL",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "idCheckpoint": 2,
      "nombreCheckpoint": "nombre lorem",
      "detalleContrato": "-",
      "numeroCasacion": null,
      "estado": "FINALIZADO",
      "numero": "00009-2023-0-0412-JR-PE-04",
      "motivoFinalizacion": "-",
      "prioridad": "MEDIA",
      "idExpediente": "E000008",
      "clase": "PRINCIPAL"
    },
    {
      "demandado": "ORGANO DE CONTROL INSTITUCIONAL DE LA GERENCIA REGIONAL DE SALUD DE AREQUIPA -FREDY OSWALDO VILLANUEVA MACEDO",
      "detalleContrato": "-",
      "nombreCliente": "-",
      "titulo": "EXPEDIENTE PROVISIONAL",
      "numeroPrincipal": null,
      "motivoFinalizacion": "YA NO ES CLIENTE, ATTE. LIZBET SILVA",
      "idCheckpoint": 0,
      "nombreCheckpoint": "nombre lorem",
      "prioridad": "MEDIA",
      "fechaInicio": "2024-10-25",
      "demandante": "CONTRALORIA GENERAL DE LA REPUBLICA DEL PERU",
      "numeroProvisional": null,
      "numeroCasacion": null,
      "codigo": null,
      "estado": "FINALIZADO",
      "especialidad": "LABORAL",
      "tieneContrato": 'no',
      "dni": "-",
      "celular": "-",
      "fechaCreacion": 1729872595283,
      "observaciones": "",
      "materia": "POR DEFINIR",
      "juzgado": "CONTRALORIA GENERAL DE LA REPUBLICA DEL PERU",
      "salaCasacion": null,
      "idExpediente": "E000009",
      "clase": "PROVISIONAL",
      "numero": "0001-2024"
    },
    {
      "numero": "00010-2023-0-1401-JP-FC-01",
      "prioridad": "MEDIA",
      "detalleContrato": "-",
      "materia": "ALIMENTOS",
      "dni": "-",
      "motivoFinalizacion": "YA NO ES CLIENTE, SE FUE DEBIENDO",
      "fechaInicio": "2023-01-04",
      "idExpediente": "E000010",
      "numeroPrincipal": null,
      "juzgado": "1er. JUZGADO PAZ LETRADO - Sede Central",
      "codigo": null,
      "nombreCliente": "-",
      "tieneContrato": 'no',
      "salaCasacion": null,
      "demandado": "ARAUCO REYES RANDY JOEL",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "fechaCreacion": 1693803600000,
      "especialidad": "FAMILIA",
      "numeroProvisional": null,
      "estado": "FINALIZADO",
      "demandante": "ASPAJO TUANAMA NELLY NOHELIA",
      "numeroCasacion": null,
      "clase": "PRINCIPAL",
      "idCheckpoint": 1.9,
      "nombreCheckpoint": "nombre lorem",
      "observaciones": "CON FECHA DOMINGO 05 DE ENERO DEL 2025; SE ESTA DEPURANDO EL EXPEDIENTE FISICO, CABE RESALTAR QUE LA CLIENTE SE FUE DEBIENDO. ATTE. LIZBET SILVA GUILLÉN",
      "celular": "-"
    },
    {
      "numeroPrincipal": null,
      "materia": "DIVORCIO POR CAUSAL",
      "numeroProvisional": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "numeroCasacion": null,
      "nombreCliente": "LOPEZ TASSARA ERICK",
      "clase": "PRINCIPAL",
      "fechaCreacion": 1696808376835,
      "detalleContrato": "Demanda - Reconvesión S/4,000 ; Segunda instancia S/2,000; Audiencia de Actuacion Probatoria S/2,000",
      "idCheckpoint": 1.7,
      "nombreCheckpoint": "nombre lorem",
      "estado": "EN PROCESO",
      "especialidad": "FAMILIA",
      "fechaInicio": "2022-01-07",
      "juzgado": "JUZGADO DE FAMILIA DE CERRO COLORADO",
      "numero": "00011-2022-0-0401-JR-FC-01",
      "celular": "-",
      "observaciones": "",
      "salaCasacion": null,
      "codigo": null,
      "idExpediente": "E000011",
      "tieneContrato": 'no',
      "dni": "-",
      "motivoFinalizacion": null,
      "prioridad": "MEDIA",
      "demandado": "VELARDE PARDO LUCIA MARIA",
      "demandante": "LOPEZ TASSARA ERICK"
    },
    {
      "salaCasacion": null,
      "fechaInicio": "2024-01-08",
      "fechaCreacion": 1705618425667,
      "detalleContrato": "Honorarios profesionales 20% de la deuda el monto equivale a la suma de s/. 981.00 soles, el cliente condiciona pago cuando recupere su deuda.",
      "numeroProvisional": null,
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "numeroCasacion": null,
      "nombreCliente": "-",
      "numeroPrincipal": null,
      "motivoFinalizacion": null,
      "demandante": "REPUESTOS DAVID DIESEL E.I.R.L.",
      "codigo": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "especialidad": "CIVIL",
      "numero": "00011-2024-0-0401-JP-CI-02",
      "celular": "-",
      "clase": "PRINCIPAL",
      "materia": "OBLIGACION DE DAR SUMA DE DINERO",
      "tieneContrato": 'no',
      "prioridad": "MEDIA",
      "demandado": "C.G.G. TRANSPORTES, MINERIA Y CONSTRUCCION S.A.C.",
      "observaciones": "La Gerente General de DAVID DIESEL es la Sra. GEOVANNA TORRES BENAVENTE, su esposo es el Sr. DAVID SILVA FARFAN; ambos son tios de la Dra. LIZBET SILVA, el Sr. David ESTA MOLESTO ya que desde octubre del 2023 NO VE RESULTADOS EN ESTE EXPEDIENTE.\n\nSe Gasto en viáticos 15 soles el dia 27/08/2024.\n",
      "idExpediente": "E000012",
      "juzgado": "2° JUZGADO DE PAZ LETRADO DE CERRO COLORADO",
      "estado": "EN PROCESO",
      "dni": "-"
    },
    {
      "demandante": "CASTRO CAPAQUIRA ZONIA",
      "codigo": null,
      "fechaInicio": "2020-03-16",
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "numeroPrincipal": null,
      "detalleContrato": "-",
      "tieneContrato": 'no',
      "nombreCliente": "-",
      "materia": "SUCESION INTESTADA",
      "numeroProvisional": null,
      "numeroCasacion": null,
      "salaCasacion": null,
      "fechaCreacion": 1693803600000,
      "dni": "-",
      "observaciones": "Ya no es cliente.",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "especialidad": "CIVIL",
      "demandado": "BENEFICIENCIA PUBLICA DE PUNO REPRESENTADO POR SU GERENTE",
      "celular": "-",
      "idExpediente": "E000013",
      "motivoFinalizacion": "-",
      "clase": "PRINCIPAL",
      "prioridad": "MEDIA",
      "numero": "00013-2020-0-2114-JP-CI-01",
      "estado": "FINALIZADO",
      "juzgado": "1° JUZGADO DE PAZ LETRADO - SEDE DESAGUADERO"
    },
    {
      "numeroProvisional": null,
      "especialidad": "PENAL",
      "numeroCasacion": null,
      "numeroPrincipal": "00023-2020-0-0401-JR-PE-01",
      "prioridad": "MEDIA",
      "fechaInicio": "2020-12-30",
      "clase": "CUADERNO",
      "idCheckpoint": 15,
      "nombreCheckpoint": "nombre lorem",
      "demandado": "IMPUTADO : QUISPE GUTIERREZ, RUFINO MIRKO",
      "codigo": null,
      "observaciones": "",
      "materia": "OMISION A LA ASISTENCIA FAMILIAR",
      "dni": "-",
      "idExpediente": "E000014",
      "juzgado": "1° JUZ.INVESTIGACION PREP. DE MARIANO MELGAR",
      "estado": "EN PROCESO",
      "salaCasacion": null,
      "demandante": "AGRAVIADO : QUISPE GOMEZ, JEAN PIEER y QUISPE GOMEZ, DAYANA NICOL y QUISPE GOMEZ, MIRKO ALEXIS",
      "motivoFinalizacion": null,
      "numero": "00023-2020-63-0401-JR-PE-01",
      "titulo": "CUADERNO",
      "fechaCreacion": 1695306304103,
      "detalleContrato": "-",
      "celular": "-",
      "nombreCliente": "-",
      "tieneContrato": 'no'
    },
    {
      "nombreCliente": "-",
      "codigo": null,
      "detalleContrato": "-",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "idExpediente": "E000015",
      "tieneContrato": 'no',
      "especialidad": "PENAL",
      "numeroCasacion": null,
      "dni": "-",
      "fechaCreacion": 1692292983418,
      "demandante": "AGRAVIADO: AFCP y CJCP y CUCP",
      "clase": "PRINCIPAL",
      "celular": "-",
      "prioridad": "MEDIA",
      "fechaInicio": "2023-01-11",
      "motivoFinalizacion": "-",
      "salaCasacion": null,
      "numeroPrincipal": null,
      "numeroProvisional": null,
      "juzgado": "4° JUZGADO DE INVESTIGACIÓN PREPARATORIA VIOLENCIA CONTRA LA MUJER E INTEGRANTES DEL GRUPO FAMILIAR",
      "numero": "00027-2023-0-0412-JR-PE-04",
      "materia": "AGRESIONES EN CONTRA DE LAS MUJERES O INTEGRANTES DEL GRUPO FAMILIAR",
      "estado": "FINALIZADO",
      "observaciones": "",
      "demandado": "IMPUTADO: CALLAPIÑA NOA SAMUEL"
    },
    {
      "numeroProvisional": null,
      "especialidad": "LABORAL",
      "numeroCasacion": null,
      "numeroPrincipal": null,
      "prioridad": "MEDIA",
      "fechaInicio": "2021-07-26",
      "clase": "PRINCIPAL",
      "idCheckpoint": 1.2,
      "nombreCheckpoint": "nombre lorem",
      "demandado": "MUNICIPALIDAD DISTRITAL DE URACA",
      "codigo": null,
      "observaciones": "",
      "materia": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "dni": "-",
      "idExpediente": "E000016",
      "juzgado": "JUZGADO MIXTO DE APLAO",
      "estado": "FINALIZADO",
      "salaCasacion": null,
      "motivoFinalizacion": "Se depura este expediente debido a que de la revisión del CEJ, en el año 2022 SE RECHAZÓ LA DEMANDA y en el año 2023 YA SE ENVIÓ AL ARCHIVO GENERAL, no se ha impugnado. Por lo tanto ya no es válido este expediente, de igual forma se ha iniciado una nueva demanda con el expediente 00049-2023-0-0404-JM-LA-01. En consecuencia, ya no se utiliza este expediente ATTE. ABOG. GABRIELA MENDOZA",
      "demandante": "SALAS TORRES JORGE MARCELINO",
      "numero": "00032-2021-0-0404-JM-LA-01",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "fechaCreacion": 1693803600000,
      "detalleContrato": "-",
      "celular": "-",
      "nombreCliente": "-",
      "tieneContrato": 'no'
    },
    {
      "salaCasacion": null,
      "tieneContrato": 'no',
      "clase": "PRINCIPAL",
      "observaciones": "",
      "dni": "-",
      "motivoFinalizacion": "-",
      "codigo": null,
      "numeroPrincipal": null,
      "detalleContrato": "-",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "demandado": "HUAMANI MEDINA CHRISTIAN EDWARD",
      "prioridad": "MEDIA",
      "idCheckpoint": null,
      "nombreCheckpoint": "nombre lorem",
      "idExpediente": "E000017",
      "fechaInicio": "2021-01-26",
      "fechaCreacion": 1693803600000,
      "numeroCasacion": null,
      "numeroProvisional": null,
      "demandante": "MEDINA PERALTA VICTORIA CELINA HONORIA",
      "celular": "-",
      "materia": "EJECUCION DE ACTA DE CONCILIACION",
      "especialidad": "FAMILIA",
      "nombreCliente": "-",
      "estado": "FINALIZADO",
      "juzgado": "2° JUZGADO DE PAZ LETRADO (JPL Breña)",
      "numero": "00032-2021-0-1818-JP-FC-02"
    },
    {
      "especialidad": "LABORAL",
      "detalleContrato": "Primera y Segunda Instancia S/. 4.000.00 Cuatro Mil Soles, IGV de sus Costas y Costos, la suma de S/. 900.00 Novecientos Soles, TOTAL HONORARIOS COBRADOS S/. 4900.00 Cuatro Mil Novecientos Soles.",
      "nombreCliente": "COLANA GUTIERREZ CRISTOBAL VALERIANO",
      "demandado": "PERURAIL S.A.",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "tieneContrato": 'si',
      "numero": "00036-2024-0-0401-JR-LA-07",
      "materia": "DESNATURALIZACIÓN DE CONTRATO",
      "salaCasacion": null,
      "demandante": "COLANA GUTIERREZ CRISTOBAL VALERIANO",
      "motivoFinalizacion": null,
      "numeroPrincipal": null,
      "idCheckpoint": 7.3,
      "nombreCheckpoint": "nombre lorem",
      "numeroProvisional": null,
      "dni": "29381153",
      "codigo": "LR-0110",
      "prioridad": "MEDIA",
      "estado": "EN PROCESO",
      "clase": "PRINCIPAL",
      "idExpediente": "E000018",
      "celular": "948668600",
      "juzgado": "7º JUZGADO DE TRABAJO",
      "fechaInicio": "2024-01-03",
      "observaciones": "Con fecha MARTES 09 DE ABRIL se atendio presencialmente al sr. CRISTOBAL COLANA, junto con CRISTIAN ARROYO y GARIELLA OJEDA; se le explico su caso y recordo que tenemos programada su AUDIENCIA DE JUZGAMIENTO PARA EL DIA JUEVES 11 DE ABRIL DEL 2024 A LAS 10:00 se le esta citando para ese dia a las 9:30 am \nSe esta comprometiendo a cancelar la suma de S/. 500.00 SOLES EL DIA 30 DE ABRIL, S/. 500.00 SOLES EL 31 DE MAYO, S/. 500.00 EL 30 DE JUNIO Y EL SALDO DE S/. 500.00 EL DIA 31 DE JULIO DEL 2024 \nCon fecha LUNES 12 de agosto del 2024, se atendió presencialmente al Sr. CRISTOBAL COLANA, se esta comprometiendo a cancelar el saldo de 1000 soles en dos armada el dia 30 de agosto 500 soles y el 15 de septiembre el saldo de 500 soles, aun nos e presentara la demanda de indemnización y respecto a las COSTAS Y COSTOS SE PACTO EL 50% PARA EL CLEINTE Y EL 50% PARA EL ESTUDIO.\nAtte. LIZBET SILVA",
      "fechaCreacion": 1705433951038,
      "numeroCasacion": null
    },
    {
      "motivoFinalizacion": "-",
      "juzgado": "2º JUZGADO DE TRABAJO",
      "salaCasacion": null,
      "idExpediente": "E000019",
      "demandante": "COLANA GUTIERREZ CRISTOBAL VALERIANO",
      "numeroProvisional": null,
      "clase": "PRINCIPAL",
      "nombreCliente": "-",
      "especialidad": "LABORAL",
      "demandado": "PERURAIL S.A.",
      "dni": "-",
      "observaciones": "",
      "numeroCasacion": null,
      "prioridad": "MEDIA",
      "numero": "00037-2024-0-0401-JR-LA-02",
      "estado": "FINALIZADO",
      "tieneContrato": 'no',
      "fechaInicio": "2024-01-03",
      "fechaCreacion": 1704853665491,
      "materia": "DESNATURALIZACIÓN DE CONTRATO",
      "celular": "-",
      "numeroPrincipal": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "idCheckpoint": 0,
      "nombreCheckpoint": "nombre lorem",
      "codigo": null,
      "detalleContrato": "-"
    },
    {
      "celular": "-",
      "salaCasacion": null,
      "idExpediente": "E000020",
      "observaciones": "",
      "nombreCliente": "-",
      "clase": "PRINCIPAL",
      "materia": "OBLIGACION DE HACER",
      "numeroPrincipal": null,
      "idCheckpoint": 5,
      "nombreCheckpoint": "nombre lorem",
      "fechaInicio": "2010-01-06",
      "juzgado": "6º JUZGADO CIVIL",
      "estado": "FINALIZADO",
      "demandado": "RAMIREZ DE VILLANUEVA CARMEN (CURADORIA) Y  SUCESION DE SERGIO VILLANUEVA CALDERON REP POR LA CURADORA PROCESAL MAGALY MENDOZA YANA",
      "motivoFinalizacion": "DEPURADO POR LIZBET SILVA GUILLEN CON FECHA 24 SEPTIEMBRE 2025",
      "demandante": "VICTOR ATAMARI Y PILAR SUCA TORRES",
      "numeroCasacion": null,
      "numeroProvisional": null,
      "codigo": null,
      "especialidad": "CIVIL",
      "numero": "00041-2010-0-0401-JR-CI-12",
      "detalleContrato": "-",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "tieneContrato": 'no',
      "dni": "-",
      "prioridad": "MEDIA",
      "fechaCreacion": 1696809360955
    },
    {
      "motivoFinalizacion": null,
      "dni": "41486831",
      "celular": "913192251",
      "observaciones": "",
      "idCheckpoint": 4.1,
      "nombreCheckpoint": "nombre lorem",
      "numeroPrincipal": null,
      "clase": "PRINCIPAL",
      "nombreCliente": "MALAGA FLORES HOMAR CALEB",
      "numeroCasacion": null,
      "tieneContrato": 'no',
      "fechaCreacion": 1698347848599,
      "idExpediente": "E000021",
      "juzgado": "10º JUZGADO DE PAZ LETRADO - FAMILIA",
      "estado": "EN PROCESO",
      "demandado": "MALAGA FLORES HOMAR CALEB",
      "prioridad": "MEDIA",
      "fechaInicio": "2019-01-04",
      "salaCasacion": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "numero": "00041-2019-0-0401-JP-FC-09",
      "materia": "ALIMENTOS",
      "especialidad": "FAMILIA",
      "numeroProvisional": null,
      "codigo": "003",
      "detalleContrato": "Honorarios pactados de manera verbal con la Dra. Lizbet S/1,000 MIL SOLES",
      "demandante": "BELIZARIO RAMOS ZENDY ROCIO"
    },
    {
      "numeroCasacion": null,
      "salaCasacion": null,
      "especialidad": "CIVIL",
      "demandado": "GUSTAVO TORRES OCHOA,  OCTAVIO UYEN GORDILLO,  TAPIA NEYRA CLEMENTE Y VICTOR CHAVEZ ALVARADO",
      "observaciones": "",
      "tieneContrato": 'no',
      "numeroProvisional": null,
      "titulo": "CURADURIA",
      "fechaCreacion": 1715608173093,
      "fechaInicio": "2010-01-06",
      "prioridad": "MEDIA",
      "demandante": "URBANIZADORA Y CONSTRUCTORA SANTA ANA SRLTDA",
      "detalleContrato": "-",
      "idExpediente": "E000022",
      "celular": "-",
      "dni": "-",
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "juzgado": "6º JUZGADO CIVIL",
      "materia": "OBLIGACION DE HACER",
      "numero": "00043-2010-0-0401-JR-CI-01",
      "numeroPrincipal": null,
      "clase": "CURADURIA",
      "nombreCliente": "-",
      "codigo": null,
      "estado": "FINALIZADO",
      "motivoFinalizacion": "-"
    },
    {
      "especialidad": "CIVIL",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "numeroPrincipal": null,
      "demandado": "GUSTAVO TORRES OCHOA,  VICTOR CHAVEZ ALVARADO, OCTAVIO UYEN GORDILLO, TAPIA NEYRA CLEMENTE (CURADORIA)",
      "idExpediente": "E000023",
      "numero": "00043-2010-0-0401-JR-CI-1",
      "juzgado": "6º JUZGADO CIVIL_",
      "demandante": "URBANIZADORA Y CONSTRUCTORA SANTA ANA SRLTDA",
      "salaCasacion": null,
      "clase": "PRINCIPAL",
      "detalleContrato": "-",
      "observaciones": "",
      "motivoFinalizacion": "-",
      "nombreCliente": "-",
      "materia": "OBLIGACION DE HACER",
      "estado": "FINALIZADO",
      "dni": "-",
      "tieneContrato": 'no',
      "idCheckpoint": 0,
      "nombreCheckpoint": "nombre lorem",
      "prioridad": "MEDIA",
      "fechaInicio": "2010-01-06",
      "numeroCasacion": null,
      "codigo": null,
      "numeroProvisional": null,
      "fechaCreacion": 1715361760503,
      "celular": "-"
    },
    {
      "prioridad": "MEDIA",
      "estado": "EN PROCESO",
      "observaciones": "",
      "idExpediente": "E000024",
      "nombreCliente": "SALAS TORRES JORGE MARCELINO",
      "detalleContrato": "HONORARIOS PROFESIONALES PRIMERA Y SEGUNDA INSTANCIA S/. 3500.00 SOLES; FINALIZANDO EL PROCESO JUDICIAL Y/O CUANDO SE HAGA EFECTIVO EL COBRO SERÁ S/. 1,500.00",
      "especialidad": "LABORAL",
      "numero": "00049-2023-0-0404-JM-LA-01",
      "celular": "943827167",
      "materia": "PAGO DE BENEFICIOS ECONOMICOS",
      "idCheckpoint": 1.4,
      "nombreCheckpoint": "nombre lorem",
      "dni": "30580086",
      "numeroProvisional": null,
      "fechaCreacion": 1718395386977,
      "numeroPrincipal": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "demandante": "SALAS TORRES JORGE MARCELINO",
      "demandado": "MUNICIPALIDAD DISTRITAL DE URACA",
      "juzgado": "JUZGADO MIXTO DE APLAO",
      "fechaInicio": "2023-06-08",
      "clase": "PRINCIPAL",
      "salaCasacion": null,
      "numeroCasacion": null,
      "codigo": "LB-0012",
      "motivoFinalizacion": null,
      "tieneContrato": 'si'
    },
    {
      "numeroCasacion": null,
      "salaCasacion": null,
      "especialidad": "CIVIL",
      "demandado": "BOUTIQUE DEL HOGAR (CURADORIA)",
      "observaciones": "",
      "tieneContrato": 'no',
      "numeroProvisional": null,
      "titulo": "CURADURIA",
      "fechaCreacion": 1715607781778,
      "fechaInicio": "2011-01-05",
      "demandante": "SCOTIABANK PERU SAA",
      "prioridad": "MEDIA",
      "detalleContrato": "-",
      "idExpediente": "E000025",
      "celular": "-",
      "dni": "-",
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "juzgado": "6º JUZGADO CIVIL",
      "materia": "OBLIGACION DE HACER",
      "numeroPrincipal": null,
      "numero": "00050-2011-0-0401-JR-CI-06",
      "clase": "CURADURIA",
      "nombreCliente": "-",
      "codigo": null,
      "estado": "FINALIZADO",
      "motivoFinalizacion": "-"
    },
    {
      "tieneContrato": 'no',
      "idCheckpoint": null,
      "nombreCheckpoint": "nombre lorem",
      "juzgado": "10º JUZGADO DE PAZ LETRADO - FAMILIA",
      "numeroCasacion": null,
      "numeroPrincipal": null,
      "prioridad": "MEDIA",
      "numero": "00051-2018-0-0401-JP-FC-09",
      "demandado": "CCORIMANYA CONDORI CESAR ALIPIO",
      "numeroProvisional": null,
      "materia": "ALIMENTOS",
      "motivoFinalizacion": "-",
      "demandante": "SILVA GUILLEN LIZBET BRENDA",
      "salaCasacion": null,
      "observaciones": "",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "idExpediente": "E000026",
      "celular": "-",
      "detalleContrato": "-",
      "clase": "PRINCIPAL",
      "nombreCliente": "-",
      "estado": "FINALIZADO",
      "fechaCreacion": 1712526565011,
      "codigo": null,
      "fechaInicio": "2018-01-05",
      "dni": "-",
      "especialidad": "FAMILIA"
    },
    {
      "detalleContrato": "-",
      "materia": "ALIMENTOS",
      "estado": "FINALIZADO",
      "numeroCasacion": null,
      "idCheckpoint": 5.1,
      "nombreCheckpoint": "nombre lorem",
      "fechaInicio": "2018-01-23",
      "demandante": "SILVA GUILLEN LIZBET BRENDA",
      "fechaCreacion": 1712526565011,
      "clase": "CUADERNO",
      "celular": "-",
      "especialidad": "FAMILIA",
      "motivoFinalizacion": "-",
      "numero": "00051-2018-12-0401-JP-FC-09",
      "nombreCliente": "-",
      "dni": "-",
      "codigo": null,
      "observaciones": "",
      "numeroProvisional": null,
      "idExpediente": "E000027",
      "demandado": "CCORIMANYA CONDORI CESAR ALIPIO",
      "prioridad": "MEDIA",
      "tieneContrato": 'no',
      "numeroPrincipal": "00051-2018-0-0401-JP-FC-09",
      "titulo": "CUADERNO",
      "juzgado": "10º JUZGADO DE PAZ LETRADO - FAMILIA",
      "salaCasacion": null
    },
    {
      "motivoFinalizacion": "-",
      "dni": "-",
      "celular": "-",
      "observaciones": "",
      "numeroPrincipal": null,
      "idCheckpoint": 3,
      "nombreCheckpoint": "nombre lorem",
      "clase": "PRINCIPAL",
      "nombreCliente": "-",
      "numeroCasacion": null,
      "tieneContrato": 'no',
      "fechaCreacion": 1704853779546,
      "idExpediente": "E000028",
      "juzgado": "6º JUZGADO DE PAZ LETRADO - CIVIL",
      "estado": "FINALIZADO",
      "demandado": "SINDICATO CERRO VERDE",
      "prioridad": "MEDIA",
      "fechaInicio": "2024-01-08",
      "salaCasacion": null,
      "titulo": "EXPEDIENTE PRINCIPAL",
      "materia": "OBLIGACION DE DAR SUMA DE DINERO",
      "numero": "00053-2024-0-0401-JP-CI-06",
      "especialidad": "CIVIL",
      "numeroProvisional": null,
      "codigo": null,
      "detalleContrato": "-",
      "demandante": "SILVA GUILLEN ABOGADOS S.A.C."
    },
    {
      "demandante": "AYNA CHACOLLA JOSE ANTONIO",
      "juzgado": "JUZGADO CIVIL - SEDE NUEVO PALACIO",
      "prioridad": "MEDIA",
      "materia": "OBLIGACION DE DAR SUMA DE DINERO",
      "demandado": "NUÑEZ CONTRERAS JUAN",
      "numeroProvisional": null,
      "celular": "-",
      "fechaCreacion": 1693803600000,
      "detalleContrato": "-",
      "titulo": "CUADERNO",
      "idCheckpoint": 18,
      "nombreCheckpoint": "nombre lorem",
      "numeroPrincipal": "00062-2023-0-2801-JR-CI-01",
      "salaCasacion": null,
      "dni": "-",
      "especialidad": "CIVIL",
      "motivoFinalizacion": "-",
      "idExpediente": "E000029",
      "tieneContrato": 'no',
      "fechaInicio": "2023-02-28",
      "observaciones": "",
      "clase": "CUADERNO",
      "codigo": null,
      "numeroCasacion": null,
      "nombreCliente": "-",
      "estado": "FINALIZADO",
      "numero": "00062-2023-95-2801-JR-CI-01"
    },
    {
      "estado": "FINALIZADO",
      "numero": "00069-2022-60-0406-JR-PE-01",
      "numeroProvisional": null,
      "dni": "-",
      "nombreCliente": "-",
      "fechaCreacion": 1692767919395,
      "detalleContrato": "-",
      "observaciones": "",
      "numeroPrincipal": "00069-2022-0-0406-JR-PE-01",
      "tieneContrato": 'no',
      "titulo": "CUADERNO",
      "numeroCasacion": null,
      "idExpediente": "E000030",
      "materia": "SUSTRACCIÓN DE MENOR",
      "idCheckpoint": 16,
      "nombreCheckpoint": "nombre lorem",
      "especialidad": "PENAL",
      "fechaInicio": "2022-12-15",
      "juzgado": "JUZ. UNIPERSONAL DE CONDESUYOS",
      "salaCasacion": null,
      "codigo": null,
      "celular": "-",
      "demandado": "IMPUTADO: YAURI SILLOCA, FRANCISCA BASILIA",
      "motivoFinalizacion": "-",
      "demandante": "AGRAVIADO: CHACONDORI CHUQUICAÑA, HUBERT LEONEL",
      "clase": "CUADERNO",
      "prioridad": "MEDIA"
    },
    {
      "numeroPrincipal": null,
      "fechaInicio": "2023-01-07",
      "prioridad": "MEDIA",
      "fechaCreacion": 1693803600000,
      "idExpediente": "E000031",
      "demandante": "ZEGARRA MELENDEZ ANDREA JIMENA",
      "idCheckpoint": 1.7,
      "nombreCheckpoint": "nombre lorem",
      "codigo": null,
      "estado": "FINALIZADO",
      "numeroCasacion": null,
      "detalleContrato": "-",
      "salaCasacion": null,
      "materia": "AUMENTO DE ALIMENTOS",
      "celular": "-",
      "numero": "00077-2023-0-0410-JP-FC-02",
      "juzgado": "1° JUZGADO DE PAZ LETRADO DE MARIANO MELGAR (EX 2°)",
      "tieneContrato": 'no',
      "observaciones": "",
      "clase": "PRINCIPAL",
      "titulo": "EXPEDIENTE PRINCIPAL",
      "nombreCliente": "-",
      "motivoFinalizacion": "SE DEPURO CON FECHA 02 SEPTIEMBRE 2025 PORQUE YA NO ES CLIENTE, ATTE. LIZBET SILVA GUILLÉN",
      "especialidad": "FAMILIA",
      "numeroProvisional": null,
      "dni": "-",
      "demandado": "PANTA GOMEZ LUIS ANGEL"
    }
  ];

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    private service: AppService,
    route: ActivatedRoute
  ) {
    /*****************************
     * FORMULARIO DE NUEVA TAREA *
     *****************************/
    this.frmNuevaTarea = new FormGroup({
      // idTarea: new FormControl(null),
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: new FormControl('con', Validators.required),
      idExpediente: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      tieneContrato: new FormControl(null, Validators.required),
      codigoTarea: new FormControl(null, Validators.required),
      detalleTarea: new FormControl(null, Validators.required),
      pendienteTarea: new FormControl(null, Validators.required),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: new FormControl(null, Validators.required),
      nombreCheckpoint: new FormControl(null, Validators.required),
      tipoAtencion: new FormControl(null, Validators.required),
      delegadoPor: new FormControl(null, Validators.required),
      horasAtencion: new FormControl(null, Validators.required),
      minutosAtencion: new FormControl(null, Validators.required),
      montoPactado: new FormControl(null, Validators.required),
      abonoTotal: new FormControl(null, Validators.required),
      montoUltimoAbono: new FormControl(null, Validators.required),
      fechaUltimoAbono: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null),
    });

    /********************************
     * FORMULARIO PARA EDITAR TAREA *
     *******************************/
    this.frmEditarTarea = new FormGroup({
      idTarea: new FormControl(null, Validators.required),
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: new FormControl(null, Validators.required),
      idExpediente: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      tieneContrato: new FormControl(null, Validators.required),
      codigoTarea: new FormControl(null, Validators.required),
      detalleTarea: new FormControl(null, Validators.required),
      pendienteTarea: new FormControl(null, Validators.required),
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: new FormControl(null, Validators.required),
      nombreCheckpoint: new FormControl(null, Validators.required),
      tipoAtencion: new FormControl(null, Validators.required),
      delegadoPor: new FormControl(null, Validators.required),
      horasAtencion: new FormControl(null, Validators.required),
      minutosAtencion: new FormControl(null, Validators.required),
      montoPactado: new FormControl(null, Validators.required),
      abonoTotal: new FormControl(null, Validators.required),
      montoUltimoAbono: new FormControl(null, Validators.required),
      fechaUltimoAbono: new FormControl(null, Validators.required),
      // fechaCreacion: new FormControl(null),
    });

    this.idTareo = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(`RDT ${this.idTareo}`)
    this.recuperarTareo();
  }

  // Detalle del Tareo - ok
  recuperarTareo() {
    let query = this.db.collection('tareo', ref => {
      return ref.where('idTareo', '==', this.idTareo)
    }).get();

    firstValueFrom(query).then(snapshot => {
      let resultados: Tareo[] = [];
      snapshot.forEach((doc: any) => {
        resultados.push(doc.data());
      });

      if(resultados.length > 0) {
        this.tareo = resultados[0];
        this.recuperarTareas();
      } else {
        this.tareo = null;
        console.log('No se encontró Tareo')
      }
    })
    
    this.recuperarTareas();
  }

  // CREATE - ok ok
  empezarNuevaTarea(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });
  }
  // ok ok
  cambioTipoFormulario(val: any) {
    const tipoTarea = val.target.value;
    switch (tipoTarea) {
      case 'con':
        console.log('estamos con expediente en el rdt')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'con',
          idExpediente: null,
          numero: null,
          demandante: null,
          demandado: null,
          especialidad: null,
          tieneContrato: null,
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: null,
          idCheckpoint: null,
          nombreCheckpoint: null,
          tipoAtencion: null,
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          montoPactado: null,
          abonoTotal: null,
          montoUltimoAbono: null,
          fechaUltimoAbono: null,
        });
        break;
      case 'sin':
        console.log('estamos sin expediente en el rdt')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'sin',
          idExpediente: '-',
          numero: '-',
          demandante: null,
          demandado: null,
          especialidad: null,
          tieneContrato: '-',
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: '-',
          idCheckpoint: '-',
          nombreCheckpoint: '-',
          tipoAtencion: null,
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          montoPactado: '-',
          abonoTotal: '-',
          montoUltimoAbono: '-',
          fechaUltimoAbono: '-',
        });
        this.fcQueryBox.reset('');
        break;
      case 'nc':
        console.log('estamos con actividades varias')
        this.frmNuevaTarea.patchValue({
          idNaturaleza: 'nc',
          idExpediente: '-',
          numero: '-',
          demandante: '-',
          demandado: '-',
          especialidad: '-',
          tieneContrato: '-',
          codigoTarea: null,
          detalleTarea: null,
          pendienteTarea: '-',
          idCheckpoint: '-',
          nombreCheckpoint: '-',
          tipoAtencion: 'presencial',
          delegadoPor: null,
          horasAtencion: null,
          minutosAtencion: null,
          montoPactado: '-',
          abonoTotal: '-',
          montoUltimoAbono: '-',
          fechaUltimoAbono: '-',
        });
        this.fcQueryBox.reset('');
        break;
      default:
        console.log('estamos fatal')
    }
  }
  // ok ok
  mostrarAutocompletado() {
    let querySearch: string = this.fcQueryBox.value;
    let sterms = querySearch.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 2);

    if (sterms.length == 0) {
      this.expedientes = [];
      return;
    }

    this.expedientes = this.expedientesCompletos.filter(exp => {
      let lMatch = false;
      let nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.demandado.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.demandante.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.numero.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.codigo?.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.numeroCasacion?.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;

      return lMatch;
    }).slice(0, 7);
  }
  // ok ok
  pickExpediente(exp: Expediente) {
    // Autocompletar datos del expediente seleccionado
    this.frmNuevaTarea.controls['idExpediente'].setValue(exp.idExpediente);
    this.frmNuevaTarea.controls['numero'].setValue(exp.numero);
    this.frmNuevaTarea.controls['demandante'].setValue(exp.demandante);
    this.frmNuevaTarea.controls['demandado'].setValue(exp.demandado);
    this.frmNuevaTarea.controls['especialidad'].setValue(exp.especialidad.toLowerCase());
    // this.frmNuevaTarea.controls['idCheckpoint'].setValue(exp.idCheckpoint);
    // this.frmNuevaTarea.controls['nombreCheckpoint'].setValue(exp.nombreCheckpoint);
    this.frmNuevaTarea.controls['tieneContrato'].setValue(exp.tieneContrato ? 'si' : 'no');

    // Autocompetar la caja de busquedas
    this.fcQueryBox.setValue(exp.numero);

    // Remove popover list
    this.expedientes = [];

    // Colocar ITER correspondiente
    this.obtenerNivelIter(exp.idExpediente);
  }
  // ok ok
  obtenerNivelIter(idExpediente: string) {
    this.encontrando = true;
    let query = this.db.collection('expedientes').doc(idExpediente).get();

    firstValueFrom(query).then((snapshot: any) => {
      let exp: Expediente = snapshot.data();

      this.frmNuevaTarea.patchValue({
        idCheckpoint: exp.idCheckpoint,
        nombreCheckpoint: exp.nombreCheckpoint,
      })
    }).catch(err => {
      console.log('ocurrio un error', err);
    }).finally(() => {
      this.encontrando = false;
    })
  }
  // ok ok
  desfocusear() {
    // Remove popover list
    this.expedientes = [];
  }
  // ok ok
  prevenir(e: Event) {
    e.preventDefault()
  }
  // ok ok
  pressEnter() {
    if (this.expedientes.length == 1) {
      this.pickExpediente(this.expedientes[0]);
    }
  }
  // ok ok
  reiniciarExpediente() {
    // Reiniciar valores del expediente en el formulario
    this.frmNuevaTarea.patchValue({
      idExpediente: null,
      numero: null,
      demandante: null,
      demandado: null,
      especialidad: null,
      idCheckpoint: null,
      nombreCheckpoint: null,
      tieneContrato: null,
    });

    // Reiniciar la caja de busquedas
    this.fcQueryBox.reset('');
  }
  // ok ok
  concretarNuevaTarea() {
    this.registrando = true;
    // Validar formulario
    if (!this.frmNuevaTarea.valid) {
      console.log('Formulario invalido');
      return;
    }

    // Generar ID de la tarea
    const timestamp = (new Date()).getTime().toString();
    const letraAleatoria = this.generarLetraAleatoria();
    const idGenerado = `ID${timestamp}${letraAleatoria}`;

    // Armar la carga de datos
    let datosFormulario = this.frmNuevaTarea.value;

    let payload = {
      ...datosFormulario,
      idTareo: this.idTareo,
      idTarea: idGenerado,
      idUsuario: this.tareo?.idUsuario,
      nombreUsuario: this.tareo?.nombreUsuario,
      fechaTarea: this.tareo?.fecha,
      fechaCreacion: timestamp,
    }

    // Grabar los datos en la base de datos
    this.db.collection(`${URL_TAREAS}`).doc(idGenerado)
      .set(payload)
      .then(() => {
        this.modalService.dismissAll();
        this.frmNuevaTarea.reset();
        this.recuperarTareas();
      })
      .catch(err => {
        // err
        console.log('error al registrar la nueva tarea');
      })
      .finally(() => {
        this.registrando = false;
      });
  }

  // READ - ok ok
  recuperarTareas() {
    this.cargando = true;
    let query = this.db.collection(`${URL_TAREAS}`, ref => {
      return ref.where('idTareo', '==', this.idTareo);
    }).get();

    firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      let horas = 0;
      let minutos = 0;
      snapshot.forEach((doc: any) => {
        let datos: Tarea = doc.data();
        items.push(datos)
        horas += Number(datos.horasAtencion);
        minutos += Number(datos.minutosAtencion);
      })

      let totalMinutos = horas * 60 + minutos;
      let sHoras = '', sMinutos = '';

      sHoras = Math.floor(totalMinutos / 60).toString();
      sMinutos = (totalMinutos - Math.floor(totalMinutos / 60) * 60).toString();

      this.tareas = items;
      this.tiempoTotalTareas = sHoras + 'h ' + sMinutos + 'm';
    }).catch(err => {
      window.alert(err);
      throw (err);
    }).finally(() => {
      this.cargando = false;
    })

    // this.tareas = [
    //   {
    //     idTarea: '123456789',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'con',
    //     idExpediente: 'E001452',
    //     numero: '20156-2025-0-0401-JR-LA-01',
    //     demandante: 'juan peres',
    //     demandado: 'empresita fulanitas',
    //     especialidad: 'laboral',
    //     tieneContrato: 'si',
    //     codigoTarea: '45',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: 'pendiente lore ipsum',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '69',
    //     nombreCheckpoint: '3.69.- Audiencia de casacion',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '04',
    //     minutosAtencion: '10',
    //     montoPactado: 'tres mil soles',
    //     abonoTotal: 'dos mil',
    //     montoUltimoAbono: 'quinientos soles',
    //     fechaUltimoAbono: 'primero de julio',
    //     fechaCreacion: '147852369',
    //   },
    //   {
    //     idTarea: '123456790',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'sin',
    //     idExpediente: '-',
    //     numero: '-',
    //     demandante: 'juan peres',
    //     demandado: 'empresita fulanitas',
    //     especialidad: '-',
    //     tieneContrato: 'no',
    //     codigoTarea: '27',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: '-',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '01',
    //     nombreCheckpoint: '-',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '01',
    //     minutosAtencion: '30',
    //     montoPactado: '-',
    //     abonoTotal: '-',
    //     montoUltimoAbono: '-',
    //     fechaUltimoAbono: '-',
    //     fechaCreacion: '147852369',
    //   },
    //   {
    //     idTarea: '123456791',
    //     idTareo: '2025-10-15',
    //     idUsuario: 'jhufo',
    //     nombreUsuario: 'Jorge Hufo',
    //     idNaturaleza: 'nc',
    //     idExpediente: '-',
    //     numero: '-',
    //     demandante: '-',
    //     demandado: '-',
    //     especialidad: '-',
    //     tieneContrato: 'no',
    //     codigoTarea: '105',
    //     detalleTarea: 'lorem ipsum lorem ipsum lorem ipsum',
    //     pendienteTarea: '-',
    //     fechaTarea: '2025-10-15',
    //     idCheckpoint: '01',
    //     nombreCheckpoint: '-',
    //     tipoAtencion: 'presencial',
    //     delegadoPor: 'Dra. Lizbet Silva',
    //     horasAtencion: '05',
    //     minutosAtencion: '40',
    //     montoPactado: '-',
    //     abonoTotal: '-',
    //     montoUltimoAbono: '-',
    //     fechaUltimoAbono: '-',
    //     fechaCreacion: '147852369',
    //   },
    // ]
  }

  // UPDATE - ok ok
  empezarEdicionTarea(tarea: Tarea, modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-xl',
      modalDialogClass: 'modal-fullscreen',
    });

    this.frmEditarTarea.reset();
    this.frmEditarTarea.patchValue({
      idTarea: tarea.idTarea,
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      idNaturaleza: tarea.idNaturaleza,
      idExpediente: tarea.idExpediente,
      numero: tarea.numero,
      demandante: tarea.demandante,
      demandado: tarea.demandado,
      especialidad: tarea.especialidad,
      tieneContrato: tarea.tieneContrato,
      codigoTarea: tarea.codigoTarea,
      detalleTarea: tarea.detalleTarea,
      pendienteTarea: tarea.pendienteTarea,
      // fechaTarea: new FormControl(null, Validators.required),
      idCheckpoint: tarea.idCheckpoint,
      nombreCheckpoint: tarea.nombreCheckpoint,
      tipoAtencion: tarea.tipoAtencion,
      delegadoPor: tarea.delegadoPor,
      horasAtencion: tarea.horasAtencion,
      minutosAtencion: tarea.minutosAtencion,
      montoPactado: tarea.montoPactado,
      abonoTotal: tarea.abonoTotal,
      montoUltimoAbono: tarea.montoUltimoAbono,
      fechaUltimoAbono: tarea.fechaUltimoAbono,
      // fechaCreacion: new FormControl(null),
    })
  }
  // ok ok
  concretarEdicionTarea() {
    this.actualizando = true;

    let idTarea = this.frmEditarTarea.value['idTarea'];
    let payload = {
      // idTarea: this.frmEditarTarea.value['idTarea'],
      // idTareo: new FormControl(null, Validators.required),
      // idUsuario: new FormControl(null, Validators.required),
      // nombreUsuario: new FormControl(null, Validators.required),
      // idNaturaleza: tarea.idNaturaleza,
      // idExpediente: new FormControl(null, Validators.required),
      // numero: tarea.numero,
      demandante: this.frmEditarTarea.value['demandante'].trim(),
      demandado: this.frmEditarTarea.value['demandado'].trim(),
      especialidad: this.frmEditarTarea.value['especialidad'],
      // tieneContrato: tarea.tieneContrato,
      codigoTarea: this.frmEditarTarea.value['codigoTarea'],
      detalleTarea: this.frmEditarTarea.value['detalleTarea'].trim(),
      pendienteTarea: this.frmEditarTarea.value['pendienteTarea'].trim(),
      // fechaTarea: new FormControl(null, Validators.required),
      // idCheckpoint: tarea.idCheckpoint,
      // nombreCheckpoint: tarea.nombreCheckpoint,
      tipoAtencion: this.frmEditarTarea.value['tipoAtencion'],
      delegadoPor: this.frmEditarTarea.value['delegadoPor'],
      horasAtencion: this.frmEditarTarea.value['horasAtencion'],
      minutosAtencion: this.frmEditarTarea.value['minutosAtencion'],
      montoPactado: this.frmEditarTarea.value['montoPactado'].trim(),
      abonoTotal: this.frmEditarTarea.value['abonoTotal'].trim(),
      montoUltimoAbono: this.frmEditarTarea.value['montoUltimoAbono'].trim(),
      fechaUltimoAbono: this.frmEditarTarea.value['fechaUltimoAbono'].trim(),
      // fechaCreacion: new FormControl(null),
    }

    this.db.collection(`${URL_TAREAS}`).doc(idTarea).update(payload).then(() => {
      // correcto
      this.modalService.dismissAll();
      this.recuperarTareas();
    }).catch(err => {
      console.log(err);
      window.alert('ocurrio un error');
    }).finally(() => {
      this.actualizando = false;
    })
  }

  // DELETE - ok ok
  empezarEliminacionTarea(tarea: Tarea) {
    let confirmacion = window.confirm('¿Esta seguro de borrar?');

    if (confirmacion) {
      this.db.collection(`${URL_TAREAS}`).doc(tarea.idTarea)
        .delete()
        .then(() => {
          // correcto
          this.recuperarTareas();
        })
        .catch(err => {
          window.alert('ocurrio un error')
        });
    }
  }

  // Codigo para generar letra random - ok ok
  generarLetraAleatoria() {
    const codigoASCII_A = 65;
    const codigoASCII_Z = 90;

    const codigoAleatorio = Math.floor(Math.random() * (codigoASCII_Z - codigoASCII_A + 1)) + codigoASCII_A;

    // Convierte el código ASCII a su carácter correspondiente
    const letraAleatoria = String.fromCharCode(codigoAleatorio);

    return letraAleatoria;
  }
}
