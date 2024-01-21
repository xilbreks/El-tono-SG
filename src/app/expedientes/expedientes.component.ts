import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';

interface ObjExpediente {
  sexpediente: string;
  sespecialidad: string;
  smateria: string;
  sdemandante: string;
  sdemandado: string;
  sfechainicio: string;
  niter?: number | null;
  lcontrato?: boolean | null;
  nmontocontrato?: number | null;
}

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
})
export class ExpedientesComponent {
  /**
   * Listas de expedientes
   */
  lstLaRepo: Array<ObjExpediente> = [
    {
      "sexpediente": "14716-2021-0-1801-JR-LA-84",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "ANCHAHUA HUAMANI EDUARDO ALFREDO",
      "sdemandado": "MINERA CHINALCO PERÚ S.A.",
      "sfechainicio": "25/10/2021",
      "niter": null
    },
    {
      "sexpediente": "04414-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "APAZA QUISPE RAUL GREGORIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "12/06/2019",
      "niter": 14
    },
    {
      "sexpediente": "04269-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "AQUIZE ALCOCER PERCY RENAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "07/06/2019",
      "niter": 10
    },
    {
      "sexpediente": "01398-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "ARCE POMALIA JOSE MANUEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": null
    },
    {
      "sexpediente": "04081-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "ASTETE TURPO JOSE",
      "sdemandado": "SOUTHERN PERU COPPER CORPORATION, SUCURSAL DEL PERÚ",
      "sfechainicio": "12/09/2022",
      "niter": 11
    },
    {
      "sexpediente": "01412-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "CUSIQUISPE TTITO ODILON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": null
    },
    {
      "sexpediente": "00914-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "DIAZ GUEVARA HERBERT MILTON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/01/2019",
      "niter": null
    },
    {
      "sexpediente": "08549-2018-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "FLORES ARI ALEX",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "18/10/2018",
      "niter": null
    },
    {
      "sexpediente": "25153-2018-0-1801-JR-LA-04",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "FLORES COLOMA ALBERT HUGO",
      "sdemandado": "SOUTHERN COOPER",
      "sfechainicio": "09/11/2018",
      "niter": null
    },
    {
      "sexpediente": "06147-2023-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "HUANQQUE SURCO, ERNESTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/11/2023",
      "niter": null
    },
    {
      "sexpediente": "08065-2018-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "LUNA CALA RICARDO WILBER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "02/10/2018",
      "niter": null
    },
    {
      "sexpediente": "02450-2022-0-1801-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "LUPACA AROCUTIPA JUAN HUBER",
      "sdemandado": "SUPERINTENDENCIA NACIONAL DE ADUANAS Y DE ADMINISTRACION TRIBUTARIA - SUNAT",
      "sfechainicio": "18/02/2022",
      "niter": 11
    },
    {
      "sexpediente": "10249-2018-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "MEJIA JUYO JOHN ERICK",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "14/12/2018",
      "niter": null
    },
    {
      "sexpediente": "05052-2021-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "MENDOZA QUISPE VICTOR MANUEL",
      "sdemandado": "PERURAIL S.A.",
      "sfechainicio": "28/12/2021",
      "niter": null
    },
    {
      "sexpediente": "02573-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "OCAMPO LOPEZ CARLOS LEONARDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/12/2020",
      "niter": 12
    },
    {
      "sexpediente": "02573-2020-89-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "OCAMPO LOPEZ CARLOS LEONARDO",
      "sdemandado": "-- no inidica --",
      "sfechainicio": "19/01/2023",
      "niter": null
    },
    {
      "sexpediente": "02573-2020-90-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "OCAMPO LOPEZ CARLOS LEONARDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "30/03/2021",
      "niter": 11
    },
    {
      "sexpediente": "00789-2022-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "PEREZ PACHECO NILZON ALONSO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/02/2022",
      "niter": 13
    },
    {
      "sexpediente": "02817-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "QUEQUEZANA PINTO CARLOS ALBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/12/2020",
      "niter": null
    },
    {
      "sexpediente": "01540-2022-0-1801-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "ROJAS AYCA IVAN AUGUSTO",
      "sdemandado": "HUDBAY PERU S.A.C.",
      "sfechainicio": "02/02/2022",
      "niter": 11
    },
    {
      "sexpediente": "02670-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "SALAS LUNA LUIS ALBERTO TOMAS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "22/05/2023 ",
      "niter": 8
    },
    {
      "sexpediente": "01422-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "SALINAS SARMIENTO CINDY MARITA",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "11/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "02377-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "VILLEGAS ROJAS JUAN CESAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "02/04/2019",
      "niter": 12
    },
    {
      "sexpediente": "06072-2023-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "REPOSICION",
      "sdemandante": "ZANTALLA SONCCO, ANDRES WILLIAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/11/2023",
      "niter": null
    }
  ];
  lstLaIndem: Array<ObjExpediente> = [
    {
      "sexpediente": "04737-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "AQUIZE ALCOCER PERCY RENAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "15/09/2023",
      "niter": 2
    },
    {
      "sexpediente": "02532-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "ARANA VALDERRAMA ELMER AMILCAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "28/07/2021",
      "niter": 14
    },
    {
      "sexpediente": "02532-2021-66-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "ARANA VALDERRAMA ELMER AMILCAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "19/06/2023",
      "niter": null
    },
    {
      "sexpediente": "03805-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "CARRASCO TAPIA GABY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "18/10/2021",
      "niter": 14
    },
    {
      "sexpediente": "01954-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "CHANCOLLA QUISPE VALERIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "04/05/2022",
      "niter": 14
    },
    {
      "sexpediente": "01127-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "CONDORI HAÑARI RENE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "17/03/2022",
      "niter": 14
    },
    {
      "sexpediente": "00003-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "FERREYRA BENDEZU CHRISTIAN ROGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "02/01/2021",
      "niter": 14
    },
    {
      "sexpediente": "00003-2021-78-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "FERREYRA BENDEZU CHRISTIAN ROGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "19/06/2023",
      "niter": null
    },
    {
      "sexpediente": "04577-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "HITO PACTA PABLO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "01/12/2021",
      "niter": 9
    },
    {
      "sexpediente": "15074-2021-0-1801-JR-LA-03",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "KUWATA ALMANZA YUDY ANTONIETA",
      "sdemandado": "ABENGOA PERU S.A.",
      "sfechainicio": "02/11/2021",
      "niter": 9
    },
    {
      "sexpediente": "06284-2023-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "LIMA HUAMANI, EDDY RAUL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/12/2023",
      "niter": null
    },
    {
      "sexpediente": "01295-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "LUNA MAMANI JOSE NILTON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "28/03/2022",
      "niter": 10
    },
    {
      "sexpediente": "03142-2021-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "MILON CARPIO ERICK DANIEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/09/2021",
      "niter": 14
    },
    {
      "sexpediente": "02177-2021-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "MOLINA AVILA ALONSO REYNALDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "21/06/2021",
      "niter": 14
    },
    {
      "sexpediente": "03796-2021-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "MORALES QUISPE JOHN ROGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "18/10/2021",
      "niter": 14
    },
    {
      "sexpediente": "05017-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "ORDOÑO ORTEGA PEDRO FELICIANO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/12/2021",
      "niter": 14
    },
    {
      "sexpediente": "05017-2021-45-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "ORDOÑO ORTEGA PEDRO FELICIANO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "12/06/2023",
      "niter": null
    },
    {
      "sexpediente": "02773-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "PACCORI MAMANI JAVIER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/05/2023 ",
      "niter": 9
    },
    {
      "sexpediente": "01877-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "PERALTA ARANZAMENDI LUIS ALBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "25/05/2021",
      "niter": 14
    },
    {
      "sexpediente": "05012-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "PERALTA CHAHUA MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/09/2023",
      "niter": 5
    },
    {
      "sexpediente": "04910-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "QUISPE HUANCAPAZA JUAN MIGUEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "17/12/2021",
      "niter": 14
    },
    {
      "sexpediente": "05204-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "TITO TORRES ZAYDA SHARYN",
      "sdemandado": "EMBOTELLADORA SAN MIGUEL DEL SUR S.A.C.",
      "sfechainicio": "10/11/2022",
      "niter": 8
    },
    {
      "sexpediente": "03830-2021-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "TORRES BEJAR VICTORIA CORINA",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "19/10/2021",
      "niter": 14
    },
    {
      "sexpediente": "01118-2021-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "TORRES SALAZAR JOSE EDUARDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "25/03/2021",
      "niter": 14
    },
    {
      "sexpediente": "05079-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "VALDIVIA NAJAR ANTHONY ERNESTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/12/2021",
      "niter": 14
    },
    {
      "sexpediente": "00112-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "VIZA HUANCACHOQUE JUAN LENIÑO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "10/01/2022",
      "niter": 10
    },
    {
      "sexpediente": "00112-2022-97-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO",
      "sdemandante": "VIZA HUANCACHOQUE JUAN LENIÑO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "14/09/2023",
      "niter": null
    }
  ];
  lstLaPBSE: Array<ObjExpediente> = [
    {
      "sexpediente": "01120-2021-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "ALVAREZ FLORES JULIAN",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "25/03/2021",
      "niter": 12
    },
    {
      "sexpediente": "02668-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "APAZA QUISPE RAUL GREGORIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "15/06/2022",
      "niter": 11
    },
    {
      "sexpediente": "03193-2021-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "AQUISE AQUISE DAVID ULDARICO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "09/09/2021",
      "niter": 13
    },
    {
      "sexpediente": "02390-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "AVENDAÑO DIAZ GLIVER WEINBERGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "30/05/2022",
      "niter": 8
    },
    {
      "sexpediente": "03173-2021-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "AYAMAMANI AYUQUI GREGORIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "08/09/2021",
      "niter": 12
    },
    {
      "sexpediente": "03011-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "CALDERON FLORES MIGUEL LUIS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/07/2022",
      "niter": null
    },
    {
      "sexpediente": "03024-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "CARRASCO TAPIA GABY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "31/08/2021",
      "niter": 14
    },
    {
      "sexpediente": "02947-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "CHAVEZ NOLASCO MAURELIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "26/08/2021",
      "niter": 12
    },
    {
      "sexpediente": "01928-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "CHIRITO BARTUREN VICTOR ALEJANDRO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/05/2022",
      "niter": 7
    },
    {
      "sexpediente": "02802-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "CORNEJO APAZA GREGORY STEVE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "22/06/2022",
      "niter": null
    },
    {
      "sexpediente": "02470-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "DELGADO BRICEÑO MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "02/06/2022",
      "niter": null
    },
    {
      "sexpediente": "00325-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "DIAZ GUEVARA HERBERT MILTON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "21/01/2022",
      "niter": null
    },
    {
      "sexpediente": "02906-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "GAMIO MALAGA DIEGO EDGARDO",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "31/12/2020",
      "niter": 12
    },
    {
      "sexpediente": "04538-2023-0-3002-JP-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "GUILLEN ARIAS LUIS MARTIN",
      "sdemandado": "BYDZYNE GLOBAL SOCIEDAD ANONIMA CERRADA - BYDZYNE GLOBAL S.A.C.",
      "sfechainicio": "08/09/2023 ",
      "niter": 7
    },
    {
      "sexpediente": "06560-2023-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "HUALLPA POCCOHUANCA BRAULIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "26/12/2023",
      "niter": null
    },
    {
      "sexpediente": "01894-2023-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "HUAMANI PUMA AQUILES",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "31/03/2023",
      "niter": 3
    },
    {
      "sexpediente": "06063-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LIMA HUAMANI EDDY RAUL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/11/2023",
      "niter": null
    },
    {
      "sexpediente": "06511-2023-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LIMA HUAMANI, EDDY RAUL",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE S.A.A",
      "sfechainicio": "21/12/2023",
      "niter": null
    },
    {
      "sexpediente": "03941-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LIMA MENDOZA JACK CHRISTOPHER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/09/2022",
      "niter": 11
    },
    {
      "sexpediente": "04445-2021-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LIMA MENDOZA JACK CHRISTOPHER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/11/2021",
      "niter": null
    },
    {
      "sexpediente": "01865-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LLICAHUA LUCANA HENRY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/04/2022",
      "niter": 7
    },
    {
      "sexpediente": "02548-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "LOAYZA VILDOSO PAUL HUDSON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/06/2022",
      "niter": null
    },
    {
      "sexpediente": "06074-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "MAMANI MENDOZA MIGUEL ELOY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/12/2022",
      "niter": 7
    },
    {
      "sexpediente": "02670-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "MAMANI TINTA JESUS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "15/06/2022",
      "niter": null
    },
    {
      "sexpediente": "02806-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "MENDOZA RAMOS MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "23/06/2022",
      "niter": 7
    },
    {
      "sexpediente": "03021-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "NUÑEZ RAMIREZ MOISES HILARION",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "31/08/2021",
      "niter": null
    },
    {
      "sexpediente": "01268-2021-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "OLIVARES SUICO PABLO SANTIAGO",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "08/04/2021",
      "niter": 12
    },
    {
      "sexpediente": "01101-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "PACCO GAMARRA RICARDO REYNALDO",
      "sdemandado": "COTRANS EIRLTDA",
      "sfechainicio": "24/03/2021",
      "niter": 13
    },
    {
      "sexpediente": "01101-2021-26-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "PACCO GAMARRA RICARDO REYNALDO",
      "sdemandado": "COTRANS EIRLTDA",
      "sfechainicio": "18/10/2023",
      "niter": null
    },
    {
      "sexpediente": "05866-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "PERALTA FLORES ROGERS GUSTAVO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "15/11/2023",
      "niter": null
    },
    {
      "sexpediente": "02189-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "PUENTE QUIQUIA JUAN JOSE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "17/05/2022",
      "niter": 8
    },
    {
      "sexpediente": "02321-2023-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "QUENALLATA CALAPUJA WILBER JORGE",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "28/04/2023 ",
      "niter": 2
    },
    {
      "sexpediente": "04482-2021-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "QUISPE HUANCAPAZA JUAN MIGUEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "26/11/2021",
      "niter": null
    },
    {
      "sexpediente": "01892-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "QUISPE JUSTO WENCESLAO",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "31/03/2023",
      "niter": 5
    },
    {
      "sexpediente": "03005-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "QUISPE QUISPE JAVIER JAIME",
      "sdemandado": "MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS y  PODER JUDICIAL y PROCURADOR DEL MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS y PROCURADOR DEL PODER JUDICIAL",
      "sfechainicio": " 13/06/2023",
      "niter": 6
    },
    {
      "sexpediente": "04373-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "RODRIGUEZ GUZMAN REYNALDO CESAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "28/09/2022",
      "niter": null
    },
    {
      "sexpediente": "00032-2021-0-0404-JM-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "SALAS TORRES JORGE MARCELINO",
      "sdemandado": "MUNICIPALIDAD DISTRITAL DE URACA",
      "sfechainicio": "26/07/2021",
      "niter": null
    },
    {
      "sexpediente": "18742-2021-0-1801-JR-LA-15",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "SARAYASI BAUTISTA RANDY ALFREDO",
      "sdemandado": "PETROLEOS DEL PERU PETROPERU SA",
      "sfechainicio": "31/12/2021",
      "niter": 8
    },
    {
      "sexpediente": "02209-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "TARICUARIMA LOPEZ SEGUNDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "18/05/2022",
      "niter": 9
    },
    {
      "sexpediente": "03025-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "TORRES BEJAR VICTORIA CORINA",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "31/08/2021",
      "niter": null
    },
    {
      "sexpediente": "02263-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "TTUPA FLORES MARIO",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA  y SUCESORES DE TTUPA FLORES MARIO",
      "sfechainicio": "05/11/2020",
      "niter": 8
    },
    {
      "sexpediente": "04466-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "TUPACYUPANQUI JAEN VICTOR RAUL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/10/2022",
      "niter": 9
    },
    {
      "sexpediente": "03015-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "URBANO MAYHUA VICENTE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "31/08/2021",
      "niter": 12
    },
    {
      "sexpediente": "05576-2023-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "VARGAS GUERRERO JUAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "30/10/2023",
      "niter": null
    },
    {
      "sexpediente": "03023-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "VILLAFUERTE QUISPE LUIS HERNAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "31/08/2021",
      "niter": 12
    },
    {
      "sexpediente": "03562-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "VILLEGAS ROJAS JUAN CESAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "09/08/2022",
      "niter": 10
    },
    {
      "sexpediente": "04431-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
      "sdemandante": "ZAPANA HUAMANI BLADIMIR LENIN",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "31/08/2023",
      "niter": 3
    }
  ];
  lstLaOtros: Array<ObjExpediente> = [
    {
      "sexpediente": "01247-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": " LUQUE SUCAPUCA MIGUEL SIMON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": " 03/03/2023 ",
      "niter": null
    },
    {
      "sexpediente": "04967-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ALEJANDRIA OBANDO WILLIAM GONZALO",
      "sdemandado": "SOCIEDAD MINERA CERRA VERDE SAA",
      "sfechainicio": "04/07/2019",
      "niter": null
    },
    {
      "sexpediente": "05124-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": "ALEMAN CACERES VICTOR ALFONSO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "11/07/2019",
      "niter": 14
    },
    {
      "sexpediente": "00503-2019-0-2801-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "NULIDAD DE DESPIDO",
      "sdemandante": "ANCHAPURE CAUSA FABIAN LORENZO",
      "sdemandado": "SOUTHERN PERU COPPER CORPORATION",
      "sfechainicio": "09/05/2019",
      "niter": null
    },
    {
      "sexpediente": "01400-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ANCO SUCARI WILSON ALFREDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": null
    },
    {
      "sexpediente": "05679-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "APAZA QUISPE RAUL GREGORIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "06/11/2023",
      "niter": null
    },
    {
      "sexpediente": "05878-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "APAZA VILLENA EDWIN RAUL",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA y YURA S.A.",
      "sfechainicio": "13/12/2022",
      "niter": 12
    },
    {
      "sexpediente": "05878-2022-18-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "APAZA VILLENA EDWIN RAUL",
      "sdemandado": "YURA S.A. y  RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "12/10/2023",
      "niter": null
    },
    {
      "sexpediente": "01349-2021-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "APAZA ZAMATA ISMAEL",
      "sdemandado": "INSPECTORATE SERVICES PERU S.A.C. y MINERA LAS BAMBAS S.A.",
      "sfechainicio": "15/04/2021",
      "niter": 12
    },
    {
      "sexpediente": "07003-2018-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "AQUISE AQUISE DAVID ULDARICO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "28/08/2018",
      "niter": null
    },
    {
      "sexpediente": "07473-2018-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ARANA VALDERRAMA ELMER AMILCAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "13/09/2018",
      "niter": null
    },
    {
      "sexpediente": "05101-2021-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ARENAS VERA RICHARD RAFAEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "30/12/2021",
      "niter": 11
    },
    {
      "sexpediente": "06907-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "AVENDAÑO DIAZ GLIVER WEINBERGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "25/09/2019",
      "niter": 12
    },
    {
      "sexpediente": "05183-2018-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "AYAMAMANI AYUQUI GREGORIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "26/06/2018",
      "niter": null
    },
    {
      "sexpediente": "01640-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "BARRANTES AGUILAR JUAN EDUARDO MAYKOLTH",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "24/09/2020",
      "niter": 9
    },
    {
      "sexpediente": "08607-2017-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "BEGAZO SEGURA CARLOS ALBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "12/10/2017",
      "niter": 14
    },
    {
      "sexpediente": "01394-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CAHUANA RIVEROS JUAN CARLOS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": 11
    },
    {
      "sexpediente": "01385-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CALDERON FLORES MIGUEL LUIS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2020",
      "niter": null
    },
    {
      "sexpediente": "05649-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CALDERON MENDOZA JUAN CARLOS DARIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2019",
      "niter": null
    },
    {
      "sexpediente": "00616-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CARAZAS MEJIA JOSE MARTIN ALONSO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "11/02/2021",
      "niter": null
    },
    {
      "sexpediente": "07128-2014-0-0401-JR-LA-03",
      "sespecialidad": "LABORAL",
      "smateria": "ACCION CONTENCIOSA ADMINISTRATIVA",
      "sdemandante": "CARDENAS ARAGON ROCIO ELIZABETH",
      "sdemandado": "UGEL AREQUIPA SUR",
      "sfechainicio": "10/12/2014",
      "niter": null
    },
    {
      "sexpediente": "03936-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR",
      "sdemandante": "CARDENAS ASCUÑA ALEXANDER SERGIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/09/2022",
      "niter": 12
    },
    {
      "sexpediente": "03936-2022-16-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR",
      "sdemandante": "CARDENAS ASCUÑA ALEXANDER SERGIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "16/05/2023",
      "niter": null
    },
    {
      "sexpediente": "01388-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CARI CALCINA SAENZ ROSSEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "02964-2017-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CARNERO MONJE PETER WILIAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/04/2017",
      "niter": 14
    },
    {
      "sexpediente": "03590-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE LAS SANCIONES DISCIPLINARIAS IMPUESTAS POR EL EMPLEADOR",
      "sdemandante": "CARNERO MONJE PETER WILIAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/10/2021",
      "niter": null
    },
    {
      "sexpediente": "05515-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE NORMAS LABORAL",
      "sdemandante": "CARNERO MONJE PETER WILIAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/11/2022",
      "niter": 10
    },
    {
      "sexpediente": "08346-2017-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CARRASCO TAPIA GABY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "03/10/2017",
      "niter": null
    },
    {
      "sexpediente": "01391-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CATASI HUAMANI RAYMUNDO EDILBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "06656-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CCACYA AGUILAR JULIO CESAR",
      "sdemandado": "SOCIEDAD M INERA CERRO VERDE SAA",
      "sfechainicio": "16/09/2019",
      "niter": 6
    },
    {
      "sexpediente": "02444-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "CCAHUANIANCCO ANCO JESUS",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "05/05/2023 ",
      "niter": 11
    },
    {
      "sexpediente": "04155-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHAMBI CASTRO RENE ALONSO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/06/2019",
      "niter": 12
    },
    {
      "sexpediente": "02043-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHANCATUMA MIRANDA JACK MAICO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "21/10/2020",
      "niter": null
    },
    {
      "sexpediente": "07273-2019-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHANCOLLA QUISPE VALERIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "10/10/2019",
      "niter": 14
    },
    {
      "sexpediente": "04466-2023-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": "CHAVEZ ESPINOZA JUAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "04/09/2023",
      "niter": 7
    },
    {
      "sexpediente": "07132-2019-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHAVEZ ESPINOZA JUAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/10/2019",
      "niter": null
    },
    {
      "sexpediente": "05706-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHAVEZ GARCIA JESUS FIDEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2019",
      "niter": 14
    },
    {
      "sexpediente": "05412-2018-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "CHAVEZ NOLASCO MAURELIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/07/2018",
      "niter": null
    },
    {
      "sexpediente": "02246-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHIRITO BARTUREN VICTOR ALEJANDRO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/11/2020",
      "niter": null
    },
    {
      "sexpediente": "01397-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CHOQUEMAQUE MENDOZA JOHN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": null
    },
    {
      "sexpediente": "00036-2024-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "COLANA GUTIERREZ CRISTOBAL VALERIANO",
      "sdemandado": "PERURAIL S.A.",
      "sfechainicio": "03/01/2024",
      "niter": null
    },
    {
      "sexpediente": "00037-2024-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "COLANA GUTIERREZ CRISTOBAL VALERIANO",
      "sdemandado": "PERURAIL S.A.",
      "sfechainicio": "03/01/2024",
      "niter": null
    },
    {
      "sexpediente": "07131-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CONDORI HAÑARI RENE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/10/2019",
      "niter": null
    },
    {
      "sexpediente": "00798-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "CONTRERAS HUAMANI EDUARDO RICHARD",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/02/2022",
      "niter": 7
    },
    {
      "sexpediente": "01395-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CONTRERAS HUAMANI EDUARDO RICHARD",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": null
    },
    {
      "sexpediente": "02756-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CORNEJO APAZA GREGORY STEVE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "17/12/2020",
      "niter": null
    },
    {
      "sexpediente": "06949-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "CUTIPA GONZALES JUAN JOSE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "26/09/2019",
      "niter": null
    },
    {
      "sexpediente": "00511-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "DELGADO BRICEÑO MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "15/01/2019",
      "niter": 14
    },
    {
      "sexpediente": "06973-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "DELGADO DURAND LEDGAR ADRIAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/09/2019",
      "niter": null
    },
    {
      "sexpediente": "01413-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ESCALANTE OSORIO SEBASTIAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "02725-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEMNIZACION POR DESPIDO ARBITRARIO Y OTROS",
      "sdemandante": "ESPINOZA BASTIDAS ALEX ALFONSO",
      "sdemandado": "COMPARTAMOS FINANCIERA S.A.",
      "sfechainicio": "17/06/2022",
      "niter": 14
    },
    {
      "sexpediente": "01408-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "FLORES PINTO WILLIAM JHONY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "06657-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "FORRA QUISPE JESUS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "16/09/2019",
      "niter": 12
    },
    {
      "sexpediente": "03234-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE NORMAS LABORAL",
      "sdemandante": "GARCIA SORROZA JUAN CARLOS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "03/05/2019",
      "niter": null
    },
    {
      "sexpediente": "01428-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HACHA FERNANDEZ EDGAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "13/08/2020",
      "niter": null
    },
    {
      "sexpediente": "01932-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "ANULACION DE LAUDOS ARBITRALES",
      "sdemandante": "HUAHUACONDORI ALMERON GUILLERMO ROLANDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "12/03/2019",
      "niter": 14
    },
    {
      "sexpediente": "00183-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HUALLPA POCCOHUANCA BRAULIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "13/01/2020",
      "niter": 12
    },
    {
      "sexpediente": "04782-2021-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HUAMANI CUBA JOHAN RONY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "10/12/2021",
      "niter": 12
    },
    {
      "sexpediente": "04782-2021-9-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HUAMANI CUBA JOHAN RONY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/06/2022",
      "niter": 12
    },
    {
      "sexpediente": "03846-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HUAMANÑAHUI VALENZUELA MARIO ANTONIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "27/08/2022",
      "niter": null
    },
    {
      "sexpediente": "08587-2017-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "HUANCA HERNANI EDWING RICHARD",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "12/10/2017",
      "niter": 12
    },
    {
      "sexpediente": "01386-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ILLA AGUILAR JULIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2020",
      "niter": 11
    },
    {
      "sexpediente": "06705-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "IQUIAPAZA CALDERON SANTOS FILIBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "17/09/2019",
      "niter": null
    },
    {
      "sexpediente": "01405-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "IQUIAPAZA LIPE POLICARPIO PABLO",
      "sdemandado": "CALQUIPA S.A.C.",
      "sfechainicio": "07/08/2020",
      "niter": 13
    },
    {
      "sexpediente": "05413-2018-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LIMA MENDOZA JACK CHRISTOPHER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/07/2018",
      "niter": null
    },
    {
      "sexpediente": "04313-2019-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "ANULACION DE LAUDOS ARBITRALES",
      "sdemandante": "LLICAHUA LUCANA HENRY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "10/06/2019",
      "niter": 12
    },
    {
      "sexpediente": "05031-2022-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOAYZA CHINO JUAN PERCY",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA y YURA S.A.",
      "sfechainicio": "03/11/2022",
      "niter": 10
    },
    {
      "sexpediente": "07558-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOAYZA VILDOSO PAUL HUDSON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/10/2019",
      "niter": 12
    },
    {
      "sexpediente": "00875-2023-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOPEZ ARENAS MARCO ANTONIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/02/2023",
      "niter": 12
    },
    {
      "sexpediente": "01512-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOPEZ CONDORI RAUL CARLOS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "02/09/2020",
      "niter": 12
    },
    {
      "sexpediente": "04907-2022-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOPEZ DURAND JUAN",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA  y  YURA S.A.",
      "sfechainicio": "24/10/2022",
      "niter": 10
    },
    {
      "sexpediente": "04907-2022-24-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "LOPEZ DURAND JUAN",
      "sdemandado": "-",
      "sfechainicio": "12/01/2024",
      "niter": null
    },
    {
      "sexpediente": "01590-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "CREDITOS LABORALES",
      "sdemandante": "LUNA MAMANI JOSE NILTON",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "21/02/2019",
      "niter": 14
    },
    {
      "sexpediente": "04951-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAICA QUISPE ELVIS RICARDO",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA  y YURA S.A.",
      "sfechainicio": "26/10/2022",
      "niter": 12
    },
    {
      "sexpediente": "04951-2022-14-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAICA QUISPE ELVIS RICARDO",
      "sdemandado": "YURA S.A. y  RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "17/05/2023",
      "niter": null
    },
    {
      "sexpediente": "04951-2022-33-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAICA QUISPE ELVIS RICARDO",
      "sdemandado": "YURA S.A. y RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "20/09/2023",
      "niter": null
    },
    {
      "sexpediente": "00548-2021-0-2801-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "NULIDAD DE DESPIDO",
      "sdemandante": "MALDONADO VILCA JORGE LUIS",
      "sdemandado": "SOUTHERN PERU COPPER CORPORATION, SUCURSAL DEL PERÚ",
      "sfechainicio": "05/11/2021",
      "niter": null
    },
    {
      "sexpediente": "06508-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI MENDOZA MIGUEL ELOY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "11/09/2019",
      "niter": 12
    },
    {
      "sexpediente": "06508-2019-27-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI MENDOZA MIGUEL ELOY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SA",
      "sfechainicio": "09/06/2021",
      "niter": null
    },
    {
      "sexpediente": "06508-2019-40-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI MENDOZA MIGUEL ELOY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SA",
      "sfechainicio": "30/09/2020",
      "niter": null
    },
    {
      "sexpediente": "09558-2018-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "ANULACION DE LAUDOS ARBITRALES",
      "sdemandante": "MAMANI QUISPE ANTONIETA",
      "sdemandado": "CARPIO DELGADO JOSE LUIS y MUNICIPALIDAD DISTRITAL DE TIABAYA",
      "sfechainicio": "11/07/2019",
      "niter": 12
    },
    {
      "sexpediente": "09558-2018-25-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI QUISPE ANTONIETA",
      "sdemandado": "MUNICIPALIDAD DISTRITAL DE TIABAYA",
      "sfechainicio": "19/11/2018",
      "niter": null
    },
    {
      "sexpediente": "08279-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI TINTA JESUS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "03/12/2019",
      "niter": null
    },
    {
      "sexpediente": "11281-2021-0-1801-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MAMANI VILCA RENZO ENRIQUE",
      "sdemandado": "FERREYROS SOCIEDAD ANÓNIMA",
      "sfechainicio": "18/08/2021",
      "niter": 12
    },
    {
      "sexpediente": "02672-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MANGO CONDORI JOSE ISMAEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "11/12/2020",
      "niter": null
    },
    {
      "sexpediente": "02862-2021-39-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MARRON MAMANI FRANCISCO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "29/12/2021",
      "niter": null
    },
    {
      "sexpediente": "02887-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MARRON MAMANI FRANCISCO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "24/08/2021",
      "niter": null
    },
    {
      "sexpediente": "02837-2021-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MARTINEZ PONCE RAFAEL ALEJANDRO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "21/08/2021",
      "niter": 12
    },
    {
      "sexpediente": "01410-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MENDOZA RAMOS MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "01257-2023-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": "MIGUEL SIMON LUQUE SUCAPUCA",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.",
      "sfechainicio": "-----------",
      "niter": null
    },
    {
      "sexpediente": "07274-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MILON CARPIO ERICK DANIEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "10/10/2019",
      "niter": null
    },
    {
      "sexpediente": "05707-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MOLINA AVILA ALONSO REYNALDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2019",
      "niter": null
    },
    {
      "sexpediente": "01422-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MONTOYA QUISPE GIOVANNA JUANA",
      "sdemandado": "INCALPACA TPX SA",
      "sfechainicio": "04/04/2022",
      "niter": null
    },
    {
      "sexpediente": "07464-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "MORALES QUISPE JOHN ROGER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "18/10/2019",
      "niter": 11
    },
    {
      "sexpediente": "05294-2018-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "NUÑEZ RAMIREZ MOISES HILARION",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "28/06/2018",
      "niter": null
    },
    {
      "sexpediente": "04262-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PACCORI MAMANI JAVIER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "07/06/2019",
      "niter": null
    },
    {
      "sexpediente": "01392-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PACHAMANGO HUATAY NICOLAS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "04123-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PAJUELO MACEDO JORGE ENRIQUE",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE SAA",
      "sfechainicio": "03/06/2019",
      "niter": 12
    },
    {
      "sexpediente": "04106-2022-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PAREDES ESPINOZA HAROLD ARTURO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "13/09/2022",
      "niter": 9
    },
    {
      "sexpediente": "05171-2018-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PERALTA ARANZAMENDI LUIS ALBERTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "25/06/2018",
      "niter": null
    },
    {
      "sexpediente": "06439-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PERALTA CHAHUA MIGUEL ANGEL",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE SA",
      "sfechainicio": "09/09/2019",
      "niter": 14
    },
    {
      "sexpediente": "01387-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PERALTA FLORES ROGERS GUSTAVO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2020",
      "niter": 14
    },
    {
      "sexpediente": "01390-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PERALTA GUTIERREZ ANWAR VICTOR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "07023-2018-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PEREA RAMOS MARIANITO MOISES",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "28/08/2018",
      "niter": null
    },
    {
      "sexpediente": "05577-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PEREZ MAMANI ERIK HELINHO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "01/08/2019",
      "niter": 13
    },
    {
      "sexpediente": "16261-2021-0-1801-JR-LA-13",
      "sespecialidad": "LABORAL",
      "smateria": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR",
      "sdemandante": "PEREZ OLARTE RENE GARI",
      "sdemandado": "COMPAÑIA MINERA ANTAPACCAY S.A.",
      "sfechainicio": "22/11/2021",
      "niter": 13
    },
    {
      "sexpediente": "01462-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PINEDO SIFUENTES ENOL ALONSO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "25/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "01603-2019-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "PUENTE QUIQUIA JUAN JOSE",
      "sdemandado": "SOCIEDAD MINIERA CERRO VERDE SAA",
      "sfechainicio": "22/02/2019",
      "niter": 11
    },
    {
      "sexpediente": "01423-2020-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "QUISPE CACERES WASHINGTON IVAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "11/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "16895-2022-0-1801-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE NORMAS LABORAL",
      "sdemandante": "QUISPE CONDORI ELIZABETH INES",
      "sdemandado": "CUMBRA PERÚ S.A.",
      "sfechainicio": "30/09/2022",
      "niter": 5
    },
    {
      "sexpediente": "02443-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "QUISPE JUSTO WENCESLAO",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "05/05/2023",
      "niter": 9
    },
    {
      "sexpediente": "05615-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "QUISPE MAMANI ELIAS",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA  y  YURA S.A.",
      "sfechainicio": "29/11/2022",
      "niter": 13
    },
    {
      "sexpediente": "04013-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE REMUNERACIONES",
      "sdemandante": "QUISPE QUISPE JAVIER JAIME",
      "sdemandado": "CORTE SUPERIOR DE JUSTICIA DE AREQUIPA y MINISTERIO DE JUSTICIA Y DERECHOS HUMANOS",
      "sfechainicio": "11/08/2023 ",
      "niter": 3
    },
    {
      "sexpediente": "00845-2023-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "TERCERIA",
      "sdemandante": "QUISPE SALAZAR JULIO CESAR",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA y YURA S.A.",
      "sfechainicio": "03/02/2023",
      "niter": 7
    },
    {
      "sexpediente": "04926-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "QUISPE SALAZAR JULIO CESAR",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA  y YURA S.A.",
      "sfechainicio": "25/10/2022",
      "niter": null
    },
    {
      "sexpediente": "02911-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "RIVERA CUADROS RONALD ZENON",
      "sdemandado": "EMPRESA TURISTICA J.C.A. E.I.R.L.",
      "sfechainicio": "06/06/2023",
      "niter": 8
    },
    {
      "sexpediente": "03352-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "INDEMNIZACION POR DESPIDO ARBITRARIO Y OTROS",
      "sdemandante": "RIVERA ZAPATA MARTIN JESUS",
      "sdemandado": "PAKIM METALES SAC",
      "sfechainicio": "25/07/2022",
      "niter": 11
    },
    {
      "sexpediente": "15605-2021-0-1801-JR-LA-15",
      "sespecialidad": "LABORAL",
      "smateria": "TERCERIA",
      "sdemandante": "RODRIGUEZ FERNANDEZ HECTOR ENRIQUE",
      "sdemandado": "INSPECTORATE SERVICES PERU S.A.C.  y  MINERA LAS BAMBAS S.A.",
      "sfechainicio": "10/11/2021",
      "niter": null
    },
    {
      "sexpediente": "08344-2017-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "RODRIGUEZ GUZMAN REYNALDO CESAR",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "03/10/2017",
      "niter": null
    },
    {
      "sexpediente": "04264-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ROMERO TURPO DIASMANI GUSTAVO",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE SAA",
      "sfechainicio": "07/06/2019",
      "niter": null
    },
    {
      "sexpediente": "05034-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ROQUE PUMA ADRIAN BRAULIO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "09/07/2019",
      "niter": null
    },
    {
      "sexpediente": "01411-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SALAS RIOS ISRAEL JOSUE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": null
    },
    {
      "sexpediente": "06704-2019-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SALAZAR LOZADA FREDDY MANUEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "17/09/2019",
      "niter": 12
    },
    {
      "sexpediente": "01898-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SALAZAR TACO JORGE RAUL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "12/10/2020",
      "niter": 12
    },
    {
      "sexpediente": "02077-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SALINAS FLORES LUCIO MOISES",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "21/10/2020",
      "niter": 12
    },
    {
      "sexpediente": "01911-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SANCHEZ MONTESINOS DANIEL ELIAS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "13/10/2020",
      "niter": 11
    },
    {
      "sexpediente": "01911-2020-67-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SANCHEZ MONTESINOS DANIEL ELIAS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE",
      "sfechainicio": "11/12/2023",
      "niter": null
    },
    {
      "sexpediente": "01407-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SILLCAHUI CHACO FELIPE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": null
    },
    {
      "sexpediente": "01763-2020-0-0401-JP-LA-04",
      "sespecialidad": "LABORAL",
      "smateria": "CONSIGNACIONES LABORALES POR PAGO DE CUOTA SINDICAL",
      "sdemandante": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sdemandado": "SINDICATO CERRO VERDE",
      "sfechainicio": "15/12/2020",
      "niter": 14
    },
    {
      "sexpediente": "02075-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "SOTO CHAÑI URBANO",
      "sdemandado": "TRANSALTISA S.A.",
      "sfechainicio": "21/10/2020",
      "niter": null
    },
    {
      "sexpediente": "02465-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "SURCO ARENAS EDER",
      "sdemandado": "MC TRANSPORTES S.R.L.",
      "sfechainicio": "08/05/2023",
      "niter": 10
    },
    {
      "sexpediente": "03431-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "INDEMNIZACION POR DESPIDO ARBITRARIO Y OTROS",
      "sdemandante": "TAPIA NEYRA YANINA GLADYS",
      "sdemandado": "BACKUS SERVICIO DE VENTAS S.A.C. EN LIQUIDACION y UNIÓN DE CERVECERÍAS PERUANAS BACKUS Y JOHNSTON SOCIEDAD ANÓNIMA ABIERTA",
      "sfechainicio": "10/07/2023",
      "niter": 5
    },
    {
      "sexpediente": "10585-2017-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "NULIDAD DE DESPIDO",
      "sdemandante": "TAPIA NEYRA YANINA GLADYS",
      "sdemandado": "BACKUS SERVICIO DE VENTAS SAC",
      "sfechainicio": "21/12/2017",
      "niter": 10
    },
    {
      "sexpediente": "10585-2017-52-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "NULIDAD DE DESPIDO",
      "sdemandante": "TAPIA NEYRA YANINA GLADYS",
      "sdemandado": "BACKUS SERVICIOS DE VENTAS SAC Y UNION DE CERVECERIAS PERUANAS BACKUS",
      "sfechainicio": "21/09/2021",
      "niter": 12
    },
    {
      "sexpediente": "01896-2020-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "TARAZONA VERAMENDI MIGNET",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "12/10/2020",
      "niter": null
    },
    {
      "sexpediente": "03926-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "TARICUARIMA LOPEZ SEGUNDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "28/05/2019",
      "niter": 12
    },
    {
      "sexpediente": "06703-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "TOHALINO CASTILLO OLIVER HERMENEGILDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "17/09/2019",
      "niter": 14
    },
    {
      "sexpediente": "01389-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "ANULACION DE LAUDOS ARBITRALES",
      "sdemandante": "TONE ARRATEA ANGEL EDWIN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "05/08/2020",
      "niter": 11
    },
    {
      "sexpediente": "07433-2018-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "TORRES SALAZAR JOSE EDUARDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "12/09/2018",
      "niter": null
    },
    {
      "sexpediente": "05738-2019-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "TORRES VILLAR VICTOR HUGO",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE SA",
      "sfechainicio": "08/08/2019",
      "niter": 12
    },
    {
      "sexpediente": "03561-2022-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "UCHUYA SEGURA LUIS ERNESTO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "09/08/2022",
      "niter": 12
    },
    {
      "sexpediente": "05145-2018-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": "URBANO MAYHUA VICENTE",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "22/06/2018",
      "niter": 12
    },
    {
      "sexpediente": "03647-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "IMPUGNACION DE DESPIDO",
      "sdemandante": "VALDIVIA PINTO ANDRES RAFAEL",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "16/08/2022",
      "niter": 12
    },
    {
      "sexpediente": "02693-2023-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "VARGAS HANCCO ROBER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "23/05/2023",
      "niter": 7
    },
    {
      "sexpediente": "04966-2019-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VARGAS HANCCO ROBER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/07/2019",
      "niter": 12
    },
    {
      "sexpediente": "04966-2019-92-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VARGAS HANCCO ROBER",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SA",
      "sfechainicio": "22/01/2020",
      "niter": null
    },
    {
      "sexpediente": "08202-2019-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "POR DEFINIR",
      "sdemandante": "VASQUEZ JAMEZ MILORD FERNANDO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "02/12/2019",
      "niter": null
    },
    {
      "sexpediente": "00691-2022-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
      "sdemandante": "VILCA RAMOS WILLIAM",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "16/02/2022",
      "niter": null
    },
    {
      "sexpediente": "01409-2020-0-0401-JR-LA-08",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VILCA RAMOS WILLIAM",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "07/08/2020",
      "niter": null
    },
    {
      "sexpediente": "08560-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VILCAPOMA ARANDA PAUL MCCARTNEY",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "12/12/2019",
      "niter": 12
    },
    {
      "sexpediente": "06071-2018-0-0401-JR-LA-09",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VILLAFUERTE QUISPE LUIS HERNAN",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "30/07/2018",
      "niter": 14
    },
    {
      "sexpediente": "07141-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "VIZA HUANCACHOQUE JUAN LENIÑO",
      "sdemandado": "SOCIEDAD MINERA DE CERRO VERDE SAA",
      "sfechainicio": "04/10/2019",
      "niter": null
    },
    {
      "sexpediente": "01377-2020-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "YQUIAPAZA YQUIAPAZA DIDIER PAOLO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "03/08/2020",
      "niter": 12
    },
    {
      "sexpediente": "04156-2019-0-0401-JR-LA-02",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "YUCRA PANIHUARA ROGER ALVARO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE SAA",
      "sfechainicio": "04/06/2019",
      "niter": 14
    },
    {
      "sexpediente": "00749-2021-0-2111-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "ACCION CONTENCIOSA ADMINISTRATIVA",
      "sdemandante": "YUPANQUI AYARQUISPE LUCY LETICIA",
      "sdemandado": "PROCURADOR PUBLICO DEL GOBIERNO REGIONAL DE PUNO y UNIDAD DE GESTION EDUCATIVA LOCAL DE HUANCANE",
      "sfechainicio": "06/08/2021",
      "niter": null
    },
    {
      "sexpediente": "01396-2020-0-0401-JR-LA-01",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ZEGARRA DELGADO PAUL GIANFRANCO",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "06/08/2020",
      "niter": null
    },
    {
      "sexpediente": "04856-2022-0-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ZUÑIGA LUCIONI PEDRO PABLO",
      "sdemandado": "RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "20/10/2022",
      "niter": 11
    },
    {
      "sexpediente": "04856-2022-6-0401-JR-LA-07",
      "sespecialidad": "LABORAL",
      "smateria": "DESNATURALIZACIÓN DE CONTRATO",
      "sdemandante": "ZUÑIGA LUCIONI PEDRO PABLO",
      "sdemandado": "YURA S.A. y RACIONALIZACION EMPRESARIAL SA",
      "sfechainicio": "07/11/2023",
      "niter": null
    }
  ];

  lstFamil: Array<ObjExpediente> = [
    {
      "sexpediente": "00010-2023-0-1401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "ASPAJO TUANAMA NELLY NOHELIA",
      "sdemandado": "ARAUCO REYES RANDY JOEL",
      "sfechainicio": "04/01/2023",
      "niter": 6
    },
    {
      "sexpediente": "00011-2022-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "LOPEZ TASSARA ERICK",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "07/01/2022",
      "niter": 5
    },
    {
      "sexpediente": "00041-2019-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "BELIZARIO RAMOS ZENDY ROCIO",
      "sdemandado": "MALAGA FLORES HOMAR CALEB",
      "sfechainicio": "04/01/2019",
      "niter": null
    },
    {
      "sexpediente": "00077-2023-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "ZEGARRA MELENDEZ ANDREA JIMENA",
      "sdemandado": "PANTA GOMEZ LUIS ANGEL",
      "sfechainicio": "07/01/2023",
      "niter": 4
    },
    {
      "sexpediente": "00142-2023-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "GUTIERREZ ULLOA ROMMEL CARLOS",
      "sdemandado": "VERA FLORES FLOR DE MARIA y  FISCALIA CIVIL Y DE FAMILIA DE AREQUIPA",
      "sfechainicio": "28/03/2023",
      "niter": 2
    },
    {
      "sexpediente": "00152-2019-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "IMPUGNACION DE PATERNIDAD",
      "sdemandante": "CHIRINOS ZEVALLOS JOSHUA ARICK",
      "sdemandado": "JARA DE ZEVALLOS MARCOSA HERMINIA y ZEVALLOS CHILE JULIAN CAPADOCIO",
      "sfechainicio": "04/04/2019",
      "niter": null
    },
    {
      "sexpediente": "00193-2023-0-0410-JR-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "LIRA GARCIA GABRIELA FERNANDA",
      "sdemandado": "DE LA ROSA ARNALDO DAMIÁN",
      "sfechainicio": "12/06/2023",
      "niter": 2
    },
    {
      "sexpediente": "00249-2020-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "GAMONAL AYALA FREDY WILSON",
      "sdemandado": "ANA DE LOS ANGELES CONCHA VEGA y MINISTERIO PUBLICO CIVIL Y FAMILIA DE AREQUIPA",
      "sfechainicio": "04/11/2020",
      "niter": null
    },
    {
      "sexpediente": "00282-2011-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "MERMA CRUZ ASUNTA",
      "sdemandado": "ZEGARRA TORRES JUSTO MELECIO",
      "sfechainicio": "14/09/2011",
      "niter": null
    },
    {
      "sexpediente": "00297-2020-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "PAREDES ALVAREZ, LUIS ANTONIO",
      "sdemandado": "PAREDES MORALES, LUIS ANTONIO",
      "sfechainicio": "22/01/2020",
      "niter": null
    },
    {
      "sexpediente": "00319-2017-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "VELARDE PARDO LUCIA MARIA",
      "sdemandado": "LOPEZ TASSARA ERICK",
      "sfechainicio": "20/01/2017 ",
      "niter": 6
    },
    {
      "sexpediente": "00319-2017-67-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "VELARDE PARDO LUCIA MARIA",
      "sdemandado": "LOPEZ TASSARA ERICK",
      "sfechainicio": "08/05/2017",
      "niter": null
    },
    {
      "sexpediente": "00334-2022-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "AQUINO PEREZ MARIA DEL ROSARIO",
      "sdemandado": "MILLIO HUAMANI JUVENAL DANIEL",
      "sfechainicio": "16/05/2022",
      "niter": null
    },
    {
      "sexpediente": "00347-2010-0-0401-JP-FC-07",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "RODRIGUEZ PRADO JESUS LIBERTAD",
      "sdemandado": "ZAMUDIO CORNEJO VICTOR ADRIAN",
      "sfechainicio": "24/03/2010",
      "niter": 6
    },
    {
      "sexpediente": "00398-2008-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CHOQUE ARENAS DE BAILON CECILIA ASUNCION y BAILON CHOQUE ALLYSON ESTELA",
      "sdemandado": "BAILON TAPIA ROBERTO CARLOS",
      "sfechainicio": "31/10/2008",
      "niter": 6
    },
    {
      "sexpediente": "00400-2022-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REGIMEN DE VISITAS",
      "sdemandante": "LOPEZ NUÑEZ BORJA SEBASTIAN",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "22/08/2022",
      "niter": 4
    },
    {
      "sexpediente": "00400-2022-92-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REGIMEN DE VISITAS",
      "sdemandante": "LOPEZ NUÑEZ BORJA SEBASTIAN",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "16/06/2023",
      "niter": null
    },
    {
      "sexpediente": "00401-2010-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "SOTO TAPIA MARIA FERNANDA y SOTO TAPIA STEPHANO JOSE y SOTO TAPIA MIGUEL ANGEL y TAPIA NEYRA YANINA GLADYS",
      "sdemandado": "SOTO ZEBALLOS OSCAR ANTONIO",
      "sfechainicio": "31/03/2010",
      "niter": 5
    },
    {
      "sexpediente": "00401-2022-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REGIMEN DE VISITAS",
      "sdemandante": "LOPEZ GUTIERREZ LUIS y TASSARA BRICEÑO LUZ ELENA ARMANDINA",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "22/08/2022",
      "niter": 5
    },
    {
      "sexpediente": "00401-2022-84-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REGIMEN DE VISITAS",
      "sdemandante": "TASSARA BRICEÑO LUZ ELENA ARMANDINA y  LOPEZ GUTIERREZ LUIS",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "24/03/2023",
      "niter": 8
    },
    {
      "sexpediente": "00410-2018-0-0801-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EJECUCION DE ACTA DE CONCILIACION",
      "sdemandante": "SOTOMAYOR GALLEGOS MARIBEL DORA",
      "sdemandado": "RODRIGUEZ VARGAS JUAN CARLOS",
      "sfechainicio": "17/07/2018",
      "niter": null
    },
    {
      "sexpediente": "00434-2010-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "PRORRATEO DE ALIMENTOS",
      "sdemandante": "HERRERA MAMANI. ROSA LINDA",
      "sdemandado": "COLCA MAMANI, WALTER ARTURO",
      "sfechainicio": "09/06/2010",
      "niter": null
    },
    {
      "sexpediente": "00435-2006-0-0412-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "PORTUGAL CHALCO, ERICKA DEL ROSARIO",
      "sdemandado": "ZEGARRA BEDREGAL , RICHARD",
      "sfechainicio": "21/08/2006",
      "niter": 7
    },
    {
      "sexpediente": "00468-2019-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "ZEGARRA TORRES JUSTO MELECIO",
      "sdemandado": "GALLEGOS HIDALGO ESTELITA",
      "sfechainicio": "16/10/2019",
      "niter": null
    },
    {
      "sexpediente": "00474-2018-0-3001-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "YUCRA AQUIPUCHO VIDAL VALENTIN",
      "sdemandado": "CONCO TADEO SANDRA EULALIA",
      "sfechainicio": "17/08/2018",
      "niter": 6
    },
    {
      "sexpediente": "00478-2022-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "PRORRATEO DE ALIMENTOS",
      "sdemandante": "ZEGARRA TORRES JUSTO MELECIO",
      "sdemandado": "GALLEGOS HIDALGO DE ZEGARRA ESTELITA y MERMA CRUZ ASUNTA y ZEGARRA GALLEGOS VALERY KENIA y ZEGARRA MERMA ANDREA LUCERO y ZEGARRA PEREZ NATALY ESTEFANY NASHA",
      "sfechainicio": "08/02/2022",
      "niter": 5
    },
    {
      "sexpediente": "00485-2023-0-0401-JR-FT-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DETERMINACIÓN DE APOYOS Y SALVAGUARDAS",
      "sdemandante": "ARANIBAR CACERES, TOMAS SILES",
      "sdemandado": "ARANIBAR TEJADA, YONI JAVIER; ARANIBAR TEJADA, LEONARDO ANTONIO; ARANIBAR TEJADA DE MOSCOSO, SUGEY ALICIA.; ARANIBAR TEJADA, FREDY JOSE; ARANIBAR TEJADA, LUZ MERY; ARANIBAR TEJADA, LAURA YONELA; ARANIBAR TEJADA, LIZBEHT MARIE Y  TEJADA DE ARANIBAR, VICTORIA",
      "sfechainicio": "20/10/2023",
      "niter": null
    },
    {
      "sexpediente": "00598-2021-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "EJECUCION DE ACTA DE CONCILIACION",
      "sdemandante": "ZELA CHOQUE, SANDRA LADY",
      "sdemandado": "QUISPE COTA, DERIAN EDWIN",
      "sfechainicio": "17/02/2021",
      "niter": null
    },
    {
      "sexpediente": "00599-2021-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "SUPO CCAMA MIRIAM EDITH",
      "sdemandado": "ALE SALAZAR JOSE ALFONSO",
      "sfechainicio": "17/02/2021",
      "niter": 5
    },
    {
      "sexpediente": "00662-2018-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "DELGADO SOSA GONY YOSIBELHY",
      "sdemandado": "VARGAS GUERRA RAPHAEL",
      "sfechainicio": "12/10/2018",
      "niter": 6
    },
    {
      "sexpediente": "00683-2021-0-0401-JR-FT-13",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "FLORES VERA HAROLD ANTONIO y VASQUEZ CCAPATINTA KELLY KIOMARA",
      "sdemandado": "VASQUEZ CCAPATINTA KELLY KIOMARA y FLORES VERA HAROLD ANTONIO",
      "sfechainicio": "11/01/2021",
      "niter": null
    },
    {
      "sexpediente": "00687-2015-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EJECUCION DE ACTA DE CONCILIACION",
      "sdemandante": "CCOA AJROTA JUANA JULIA",
      "sdemandado": "ARNICA AMPUERO JOHN ALEX",
      "sfechainicio": "13/03/2015",
      "niter": 6
    },
    {
      "sexpediente": "00697-2017-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "VERA FLORES FLOR DE MARIA",
      "sdemandado": "GUTIERREZ ULLOA ROMMEL CARLOS",
      "sfechainicio": "12/10/2017 ",
      "niter": 4
    },
    {
      "sexpediente": "00705-2023-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "ZEGARRA PORTUGAL FABRIZIO RICHARD",
      "sdemandado": "ZEGARRA BEDREGAL RICHARD ANTONIO",
      "sfechainicio": "23/02/2023",
      "niter": 5
    },
    {
      "sexpediente": "00842-2021-0-0412-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "ZELA CHOQUE SANDRA LADY",
      "sdemandado": "QUISPE COTA DERIAN EDWIN",
      "sfechainicio": "15/03/2021",
      "niter": null
    },
    {
      "sexpediente": "00855-2021-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "CACERES QUICO, SHEILA",
      "sdemandado": "HUAYLLA MEZA, RICHARD MARCOS CON APOD JAVIER QUEA AQUIPUCHO",
      "sfechainicio": "15/03/2021",
      "niter": 5
    },
    {
      "sexpediente": "00950-2012-0-0401-JP-FC-06",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "MERINO VALCARCEL DIANA ALEJANDRA",
      "sdemandado": "ZEBALLOS RIVERA LUIS MIGUEL",
      "sfechainicio": "24/04/2012",
      "niter": null
    },
    {
      "sexpediente": "00983-2019-0-0401-JR-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "INTERDICCION",
      "sdemandante": "ESCOBEDO ZENTENO LEONARDO",
      "sdemandado": "ESCOBEDO ZENTENO MARIA LUISA",
      "sfechainicio": "15/01/2019",
      "niter": 6
    },
    {
      "sexpediente": "01003-2022-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "VALENCIA ZEBALLOS JORGE YOON",
      "sdemandado": "MANCHEGO NEYRA LUZ MARINA y VALENCIA MANCHEGO PAMELA DEL CARMEN",
      "sfechainicio": "29/03/2022",
      "niter": 5
    },
    {
      "sexpediente": "01009-2018-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "PAREDES GALLEGOS CINDY YANIRA",
      "sdemandado": "RODRIGUEZ VALDIVIA DAVID PASTOR",
      "sfechainicio": "23/03/2018",
      "niter": null
    },
    {
      "sexpediente": "01092-2021-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "PINTO HUAMANI LIZ SHIRLEY",
      "sdemandado": "ABRIL GARCIA MICHAEL WINSTON",
      "sfechainicio": "05/04/2021",
      "niter": 7
    },
    {
      "sexpediente": "01142-2023-0-0302-JR-FT-02",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "SEGUNDA FISCALIA PROVINCIAL CIVIL Y DE FAMILIA DE ANDAHUAYLAS",
      "sdemandado": "CASTRO GONZALES, EDITH",
      "sfechainicio": "02/08/2023",
      "niter": null
    },
    {
      "sexpediente": "01214-2018-0-2301-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "ZELA SANCA LUCIO",
      "sdemandado": "ZELA MAMANI FRANCISCO DREMMLER",
      "sfechainicio": "09/11/2018",
      "niter": 6
    },
    {
      "sexpediente": "01240-2022-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "ENCALADA OJEDA MARTHA GLADYS",
      "sdemandado": "PAREDES TORRES PAUL FERNANDO",
      "sfechainicio": "11/04/2022",
      "niter": null
    },
    {
      "sexpediente": "01291-2021-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "SOTO TAPIA MARIA FERNANDA y SOTO TAPIA STEPHANO JOSE y SOTO TAPIA MIGUEL ANGEL y TAPIA NEYRA YANINA GLADYS",
      "sdemandado": "SOTO ZEBALLOS OSCAR ANTONIO",
      "sfechainicio": "16/04/2021",
      "niter": 5
    },
    {
      "sexpediente": "01303-2016-0-0401-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "RETAMOZO BARRIGA JESSICA MATILDE",
      "sdemandado": "LINO CRUZ RAFAEL",
      "sfechainicio": "07/04/2016",
      "niter": null
    },
    {
      "sexpediente": "01319-2023-0-1815-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "MELENDEZ MONTOYA, JENNIFER FIORELLA",
      "sdemandado": "KLEEBERG SALAZAR GERARDO ENRIQUE",
      "sfechainicio": "02/11/2023",
      "niter": null
    },
    {
      "sexpediente": "01392-2023-0-0302-JR-FT-01",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "CASTRO GONZALES, EDITH",
      "sdemandado": "PAREDES ESPINOZA , HAROLD ARTURO",
      "sfechainicio": "18/09/2023",
      "niter": 1
    },
    {
      "sexpediente": "01438-2014-0-0410-JM-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "PARADA ZEGARRA RENZO NICOMEDES",
      "sdemandado": "MIDOLO CARPIO MARCELINA OBDULIA y FISCALIA DE FAMILIA MARIANO MELGAR",
      "sfechainicio": "21/07/2014",
      "niter": null
    },
    {
      "sexpediente": "01452-2023-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "CHUQUIYAURI LAURENTE VICTOR",
      "sdemandado": "CHUQUIYAURI LLIUYACC LUCERO CELESTINA",
      "sfechainicio": "10/04/2023",
      "niter": 5
    },
    {
      "sexpediente": "01462-2023-0-0302-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "PAREDES ESPINOZA HAROLD ARTURO",
      "sdemandado": "CASTRO GONZALES EDITH",
      "sfechainicio": "27/09/2023",
      "niter": 4
    },
    {
      "sexpediente": "01524-2021-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CALDERON MERCADO LAURA ANNELY",
      "sdemandado": "COAGUILA SILVA RICHARD NALDO",
      "sfechainicio": "04/05/2021",
      "niter": null
    },
    {
      "sexpediente": "01729-2021-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "AGUILAR VILLAVICENCIO JOSE ANTONIO",
      "sdemandado": "URIBIA BELLOTA VERONICA LUPE",
      "sfechainicio": "21/05/2021",
      "niter": 6
    },
    {
      "sexpediente": "01764-2023-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "COAGUILA BENVENTE ELIANA ARINDA",
      "sdemandado": "MONTES MONTES JESUS ESTEBAN",
      "sfechainicio": "25/04/2023",
      "niter": 7
    },
    {
      "sexpediente": "01826-2019-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CONCHA MEDINA TANIA LUCIANA",
      "sdemandado": "GOMEZ VILLANES WALTER OVIEDO",
      "sfechainicio": "03/05/2019",
      "niter": 5
    },
    {
      "sexpediente": "02054-2023-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "SALAS MEZA KAREN MELISSA",
      "sdemandado": "RONCEROS ORMEÑO JUAN ALBINO",
      "sfechainicio": "09/05/2023",
      "niter": 5
    },
    {
      "sexpediente": "02143-2016-0-0412-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "VIDAURRE QUISPE MEDALITH YASMIR",
      "sdemandado": "MONTES SANCHEZ LUIS ALBERTO",
      "sfechainicio": "08/06/2016",
      "niter": 6
    },
    {
      "sexpediente": "02154-2016-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "AYAMAMANI AYUQUI FLOR DE MARIA",
      "sdemandado": "AYALA VITULAS GAVINO NICANOR",
      "sfechainicio": "09/06/2016",
      "niter": null
    },
    {
      "sexpediente": "02159-2014-0-0412-JM-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "TUESTA ESQUIVEL PIERINA",
      "sdemandado": "ASALDE MANRIQUE JUAN CARLOS",
      "sfechainicio": "01/10/2014",
      "niter": null
    },
    {
      "sexpediente": "02162-2021-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REDUCCION DE ALIMENTOS",
      "sdemandante": "MACHACA QUISPE ANDRE MARCELO",
      "sdemandado": "MACHACA QUISPE MAYRA y QUISPE ESTRADA MARIBEL",
      "sfechainicio": "28/06/2021",
      "niter": 8
    },
    {
      "sexpediente": "02171-2015-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "PINTO MOLINA JUANA JULEISY",
      "sdemandado": "SERVA SOLANO JESUS ALBERTO y  MINISTERIO PUBLICO MARIANO MELGAR",
      "sfechainicio": "25/05/2015",
      "niter": 6
    },
    {
      "sexpediente": "02174-2017-0-2111-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "ZAVALETA BECERRA JOSEFA MARTINA",
      "sdemandado": "APAZA FUENTES HENRY OSWALDO",
      "sfechainicio": "21/08/2017",
      "niter": 6
    },
    {
      "sexpediente": "02224-2023-0-0401-JP-FC-11",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "PINEDA GARNICA EMETERIA JOSEFA",
      "sdemandado": "CERPA CHAVEZ MAXIMILIANO y CERPA CHAVEZ MAXIMILIANO",
      "sfechainicio": "19/05/2023",
      "niter": 5
    },
    {
      "sexpediente": "02401-2020-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "FILIACION",
      "sdemandante": "PAREDES ROMERO MARLENE LUCIA",
      "sdemandado": "YANA GARCIA EVARISTO",
      "sfechainicio": "26/11/2020",
      "niter": null
    },
    {
      "sexpediente": "02427-2020-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CACHI QUISPE BERTHA MILAGROS",
      "sdemandado": "FLORES BLANCO EDIDSON VICTOR y FLORES BLANCO EDIDSON VICTOR",
      "sfechainicio": "27/11/2020",
      "niter": null
    },
    {
      "sexpediente": "02458-2023-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "VASQUEZ TEJADA JAIME DAVID",
      "sdemandado": "LLERENA TALAVERA CLAUDIA VANESSA",
      "sfechainicio": "02/06/2023",
      "niter": 5
    },
    {
      "sexpediente": "02483-2021-0-0410-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "PEREZ CRUZ JUANA",
      "sdemandado": "URETA SANTAYA EMILIO FELIPE",
      "sfechainicio": "26/07/2021",
      "niter": null
    },
    {
      "sexpediente": "02499-2012-0-0401-JP-FC-07",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "ALIENDE PACA CARLOS ENRIQUE",
      "sdemandado": "ALIENDE LIMA EPIFANIO",
      "sfechainicio": "15/10/2012",
      "niter": null
    },
    {
      "sexpediente": "02783-2023-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "ACUÑA CONTRERAS WALTER RICARDO",
      "sdemandado": "ACUÑA CHAVEZ GIULIANA MERCEDES",
      "sfechainicio": "20/06/2023 ",
      "niter": 5
    },
    {
      "sexpediente": "03075-2014-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "PINTO GONZALES JHON JESUS",
      "sdemandado": "PINTO RIVERA JOHN FABIO y PINTO RIVERA JULEIMI GIULANA",
      "sfechainicio": "31/10/2014",
      "niter": 16
    },
    {
      "sexpediente": "03117-2023-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "REDUCCION DE ALIMENTOS",
      "sdemandante": "URIBIA BELLOTA VERONICA LUPE",
      "sdemandado": "AGUILAR VILLAVICENCIO JOSE ANTONIO",
      "sfechainicio": "12/07/2023",
      "niter": 7
    },
    {
      "sexpediente": "03132-2018-0-0401-JR-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "QUISPE ZAVALA PLENARIA",
      "sdemandado": "HUAMANÑAHUI CORVACHO EDWIN",
      "sfechainicio": "21/03/2018",
      "niter": null
    },
    {
      "sexpediente": "03145-2022-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "APAZA PALMA VALERIA MILAGROS",
      "sdemandado": "URIBIA BELLOTA LUIS FERNANDO",
      "sfechainicio": "19/08/2022",
      "niter": 5
    },
    {
      "sexpediente": "03170-2015-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "PUMA PANCA ELIZABETH REYNA",
      "sdemandado": "LAURA JORDAN CLEVER",
      "sfechainicio": "25/09/2015",
      "niter": 6
    },
    {
      "sexpediente": "03250-2017-0-0401-JP-FC-07",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "ZELA MAMANI NORMA",
      "sdemandado": "MAMANI CHARCA HENRY JAVIER",
      "sfechainicio": "18/09/2017",
      "niter": null
    },
    {
      "sexpediente": "03454-2023-0-0401-JP-FC-08",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "RONCALLA LUQUE CAMILA DEL CARMEN",
      "sdemandado": "MUÑOZ ARANA MANUEL SANTIAGO",
      "sfechainicio": "07/08/2023",
      "niter": 5
    },
    {
      "sexpediente": "03459-2021-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "PRORRATEO DE ALIMENTOS",
      "sdemandante": "HUARCA LOPINTA YENY",
      "sdemandado": "CCAPA CHOQUEPUMA GILBERTH WILLIAN y CHOQUEPUMA MERMA GREGORIA y QUISPE ALCCALAYCO MARIANELA",
      "sfechainicio": "14/10/2021",
      "niter": 7
    },
    {
      "sexpediente": "03459-2021-60-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "PRORRATEO DE ALIMENTOS",
      "sdemandante": "HUARCA LOPINTA YENY",
      "sdemandado": "CCAPA CHOQUEPUMA GILBERTH WILLIAN y CHOQUEPUMA MERMA GREGORIA y QUISPE ALCCALAYCO MARIANELA",
      "sfechainicio": "10/10/2023",
      "niter": null
    },
    {
      "sexpediente": "03460-2021-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REDUCCION DE ALIMENTOS",
      "sdemandante": " VARGAS FLORES WILSON NOE",
      "sdemandado": " VARGAS CHIRE JEAN PIERR WILSON",
      "sfechainicio": " 14/10/2021 ",
      "niter": 5
    },
    {
      "sexpediente": "03483-2022-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "FILIACION",
      "sdemandante": "RODRIGUEZ CHAVEZ MARITZA JUNLIANA",
      "sdemandado": "CHAVEZ MARROQUIN WILBERT ERNESTO",
      "sfechainicio": "15/09/2022",
      "niter": null
    },
    {
      "sexpediente": "03513-2022-0-0401-JP-FC-11",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "GUILLEN ARIAS CARLA CELESTE",
      "sdemandado": "CARDENAS BARRERA CHRISTIAN",
      "sfechainicio": "19/09/2022",
      "niter": null
    },
    {
      "sexpediente": "03702-2021-0-0401-JP-FC-09",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": " CHAVEZ MUÑOZ RODRIGO STEFANO",
      "sdemandado": " CHAVEZ MARROQUIN WILBERT ERNESTO",
      "sfechainicio": "02/11/2021",
      "niter": null
    },
    {
      "sexpediente": "03737-2023-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "CHAVEZ VALDIVIA DE ACUÑA, MERCEDES BRENDA",
      "sdemandado": "ACUÑA CONTRERAS, WALTER RICARDO",
      "sfechainicio": "24/08/2023",
      "niter": null
    },
    {
      "sexpediente": "03783-2017-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "MERINO VALCARCEL DIANA ALEJANDRA",
      "sdemandado": "ZEBALLOS RIVERA LUIS MIGUEL",
      "sfechainicio": "31/10/2017",
      "niter": 7
    },
    {
      "sexpediente": "03931-2015-0-0401-JP-FC-06",
      "sespecialidad": "FAMILIA",
      "smateria": "FILIACION",
      "sdemandante": "LLERENA TALAVERA CLAUDIA VANESSA",
      "sdemandado": "VASQUEZ TEJADA JAIME DAVID",
      "sfechainicio": "10/12/2015",
      "niter": 6
    },
    {
      "sexpediente": "04032-2022-0-0410-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CUEVA ANCCO ESTHER",
      "sdemandado": "GUTIERREZ DIAZ MANUEL ALONSO",
      "sfechainicio": "26/10/2022",
      "niter": null
    },
    {
      "sexpediente": "04254-2021-0-0412-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "CHAIÑA YANA MARLENI",
      "sdemandado": "QUISPE MESTAS GERONIMO",
      "sfechainicio": "14/12/2021",
      "niter": null
    },
    {
      "sexpediente": "04356-2018-0-3204-JP-FC-03",
      "sespecialidad": "FAMILIA",
      "smateria": "AUMENTO DE ALIMENTOS",
      "sdemandante": "CARRASCO GUTIERREZ CHARLOTTE",
      "sdemandado": "CARRASCO FLORES JHON CARLOS",
      "sfechainicio": "27/04/2018",
      "niter": 6
    },
    {
      "sexpediente": "04428-2016-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "REGIMEN DE VISITAS",
      "sdemandante": "CCAPA CHOQUEPUMA GILBERTH WILLIAN",
      "sdemandado": "QUISPE ALCCALSYCO MARIANELA",
      "sfechainicio": "29/03/2016",
      "niter": null
    },
    {
      "sexpediente": "04478-2019-95-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "QUISPE CALDERON GENARO JOSE",
      "sdemandado": "QUISPE LOZADA YESICA MABEL",
      "sfechainicio": "21/02/2020",
      "niter": null
    },
    {
      "sexpediente": "04709-2022-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ALIMENTOS",
      "sdemandante": "CALDERON VALDIVIA ZAMANDA DEL ROSARIO",
      "sdemandado": "BELLIDO NEYRA RONAL JOSEPH",
      "sfechainicio": "27/12/2022",
      "niter": 5
    },
    {
      "sexpediente": "04727-2018-0-0411-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "URIBIA BELLOTA LUIS FERNADO",
      "sdemandado": "URIBIA APAZA MILAGRO FERNANDA",
      "sfechainicio": "31/12/2018",
      "niter": null
    },
    {
      "sexpediente": "05348-2023-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "PRORRATEO DE ALIMENTOS",
      "sdemandante": "FUENTES FALCON, EDITH",
      "sdemandado": "HUAYLLA MEZA, RICHARD MARCOS",
      "sfechainicio": "24/11/2023",
      "niter": null
    },
    {
      "sexpediente": "05459-2022-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "VALENCIA ZEBALLOS JORGE YOON",
      "sdemandado": "MANCHEGO NEYRA LUZ MARIA",
      "sfechainicio": "29/03/2022",
      "niter": null
    },
    {
      "sexpediente": "06131-2016-0-0412-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "DELGADILLO CONDORI MARIA DEL CARMEN",
      "sdemandado": "COLQUE URURO WILBER",
      "sfechainicio": "29/04/2016",
      "niter": 6
    },
    {
      "sexpediente": "07378-2017-0-0401-JP-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
      "sdemandante": "LUNA JARA MARIOT CAROLINA",
      "sdemandado": "ATAUPILCO CALDERON JOE",
      "sfechainicio": "28/11/2017",
      "niter": 6
    },
    {
      "sexpediente": "07497-2021-0-0401-JR-FT-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DETERMINACIÓN DE APOYOS Y SALVAGUARDAS",
      "sdemandante": "RODRIGUEZ TELLO DARIO ALEXANDER",
      "sdemandado": "RODRIGUEZ BARRIOS ALEX ARTURO",
      "sfechainicio": "22/04/2021",
      "niter": null
    },
    {
      "sexpediente": "08107-2020-0-0401-JR-FT-13",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "ANGULO VILLANUEVA YAMILE KAROLIN y MEDINA CCOA GIANCARLO",
      "sdemandado": "ANGULO VILLANUEVA YAMILE KAROLIN y MEDINA CCOA GIANCARLO",
      "sfechainicio": "15/06/2020",
      "niter": null
    },
    {
      "sexpediente": "09261-2023-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "EXONERACION DE ALIMENTOS",
      "sdemandante": "ZEGARRA TORRES JUSTO MELECIO",
      "sdemandado": "ZEGARRA PEREZ NATALY ESTEFANY NASHA",
      "sfechainicio": "24/05/2023",
      "niter": 5
    },
    {
      "sexpediente": "09834-2022-0-0401-JR-FT-06",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "ACKERMANN BUSTAMANTE ELIETT CECILIA y LOPEZ TASSARA RENZO",
      "sdemandado": "VELARDE PARDO LUCIA MARIA",
      "sfechainicio": "02/06/2022",
      "niter": null
    },
    {
      "sexpediente": "10509-2023-0-0401-JP-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "REDUCCION DE ALIMENTOS",
      "sdemandante": "VARGAS GUERRA RAPHAEL",
      "sdemandado": "DELGADO SOSA GONY YOSIBELHY",
      "sfechainicio": "21/06/2023",
      "niter": 3
    },
    {
      "sexpediente": "10628-2022-0-0412-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "FLORES MEDRANO JOHANNA NATHALY",
      "sdemandado": "DEL CARPIO CASTILLO RAUL RENZO",
      "sfechainicio": "15/06/2022",
      "niter": 6
    },
    {
      "sexpediente": "12506-2023-0-0401-JR-FT-10",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "VELARDE PARDO LUCIA MARIA",
      "sdemandado": "LOPEZ GUTIERREZ LUIS y  TASSARA BRICEÑO LUZ ELENA ARMANDINA",
      "sfechainicio": "13/07/2023 ",
      "niter": 7
    },
    {
      "sexpediente": "12841-2021-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "POR DEFINIR",
      "sdemandante": "DE LA ROSA ARNALDO DAMIAN",
      "sdemandado": "LIRA GARCIA GABRIELA FERNANDA",
      "sfechainicio": "19/07/2021",
      "niter": 6
    },
    {
      "sexpediente": "13274-2023-0-0412-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "ACUÑA CONTRERAS WALTER RICARDO",
      "sdemandado": "CHAVEZ VALDIVIA DE ACUÑA MERCEDES BRENDA",
      "sfechainicio": "26/07/2023",
      "niter": 3
    },
    {
      "sexpediente": "13569-2022-0-0412-JR-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "ANCHAHUA BARAZORDA JOSE ALFREDO",
      "sdemandado": "HUAMANI BARRIENTOS CARMEN ADELA",
      "sfechainicio": "04/08/2022",
      "niter": null
    },
    {
      "sexpediente": "13960-2023-0-0401-JR-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "RODRIGUEZ PRADO JESUS LIBERTAD",
      "sdemandado": "ZAMUDIO CORNEJO VICTOR ADRIAN",
      "sfechainicio": "07/08/2023",
      "niter": 2
    },
    {
      "sexpediente": "13993-2023-0-0401-JR-FT-08",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "RONCEROS ORMEÑO JUAN ALBINO",
      "sdemandado": "SALAS MEZA KAREN MELISSA",
      "sfechainicio": "07/08/2023",
      "niter": 7
    },
    {
      "sexpediente": "14274-2021-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "RECONOCIMIENTO DE UNION DE HECHO",
      "sdemandante": "ZAPATA RUIZ NANCY CANDIDA",
      "sdemandado": "ANGEL FABIANO SALAS ZAPATA REPRESENTADO POR CURADOR PROCESAL",
      "sfechainicio": "10/08/2021",
      "niter": 3
    },
    {
      "sexpediente": "16153-2023-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "RONCEROS ORMEÑO JUAN ALBINO",
      "sdemandado": "SALAS MEZA KAREN MELISSA",
      "sfechainicio": "11/09/2023",
      "niter": 2
    },
    {
      "sexpediente": "16678-2019-0-0412-JR-FC-02",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "PAREDES ALAVAREZ LUIS ANOTNIO",
      "sdemandado": "MORALES BILBAO MARTHA ELENA",
      "sfechainicio": "26/08/2019",
      "niter": 2
    },
    {
      "sexpediente": "17245-2023-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "ADOPCION",
      "sdemandante": "PERALTA CHAHUA MIGUEL ANGEL",
      "sdemandado": "AMESQUITA ARAGON DEYBI JESUS y PINTO RIOS KATYA",
      "sfechainicio": "28/09/2023",
      "niter": 1
    },
    {
      "sexpediente": "17755-2023-0-0401-JR-FT-10",
      "sespecialidad": "FAMILIA",
      "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
      "sdemandante": "NUÑEZ CATACORA RENATO ARTURO (VÍCTIMA)",
      "sdemandado": "HUAMANI SOTELO YUDITH ESTEFANY (PERSONA AGRESORA)",
      "sfechainicio": "06/10/2023",
      "niter": 1
    },
    {
      "sexpediente": "18286-2020-0-0411-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "RECONOCIMIENTO DE UNION DE HECHO",
      "sdemandante": "CAHUE ZAPANA TERESA JESUS",
      "sdemandado": "RICARDO RUBEN VASQUEZ MALDONADO y MIRIAM ROSARIO VASQUEZ MALDONADO y MARIO MIGUEL VASQUEZ MALDONADO",
      "sfechainicio": "03/12/2020",
      "niter": 13
    },
    {
      "sexpediente": "19009-2023-0-0401-JR-FC-04",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "CERPA CHAVEZ MAXIMILIANO",
      "sdemandado": "PINEDA GARNICA EMETERIA JOSEFA",
      "sfechainicio": "25/10/2023",
      "niter": 5
    },
    {
      "sexpediente": "19056-2021-0-0411-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "URIBIA BELLOTA LUIS FERNANDO",
      "sdemandado": "APAZA PALMA VALERIA MILAGROS",
      "sfechainicio": "18/10/2021",
      "niter": 4
    },
    {
      "sexpediente": "19880-2023-0-0401-JR-FC-0",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "URIBIA BELLOTA VERONICA LUPE",
      "sdemandado": "AGUILAR VILLAVICENCIO JOSE ANTONIO",
      "sfechainicio": "08/11/2023",
      "niter": null
    },
    {
      "sexpediente": "21715-2021-0-0401-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "DIVORCIO POR CAUSAL",
      "sdemandante": "ABRIL GARCIA MICHAEL WINSTON",
      "sdemandado": "LIZ SHIRLEY PINTO HUAMANI y PINTO HUAMANI LIZ SHIRLEY",
      "sfechainicio": "29/11/2021",
      "niter": 5
    },
    {
      "sexpediente": "21968-2023-0-0412-JR-FC-01",
      "sespecialidad": "FAMILIA",
      "smateria": "TENENCIA",
      "sdemandante": "QUISPE MESTAS, GERONIMO",
      "sdemandado": "CHAIÑA YANA, MARLENI",
      "sfechainicio": "11/12/2023",
      "niter": null
    }
  ];
  lstCivil: Array<ObjExpediente> = [
    {
      "sexpediente": "00011-2024-0-0401-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "REPUESTOS DAVID DIESEL E.I.R.L.",
      "sdemandado": "C.G.G. TRANSPORTES, MINERIA Y CONSTRUCCION S.A.C.",
      "sfechainicio": "08/01/2024",
      "niter": null
    },
    {
      "sexpediente": "00013-2020-0-2114-JP-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "SUCESION INTESTADA",
      "sdemandante": "CASTRO CAPAQUIRA ZONIA",
      "sdemandado": "BENEFICIENCIA PUBLICA DE PUNO REPRESENTADO POR SU GERENTE",
      "sfechainicio": "16/03/2020",
      "niter": 12
    },
    {
      "sexpediente": "00246-2011-0-0402-JR-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "RETRACTO",
      "sdemandante": "LOPEZ GUTIERREZ LUIS y  MEDRANO SANTISTEBAN PERCY Y ORTEGA CORDERO RICARDO JULIO APODERADOS DE LOPEZ GUTIERREZ LUIS",
      "sdemandado": "CHAMPION SALAZAR LUIS ALBERTO y  CHAMPION SALAZAR LUIS ALBERTO HAU MENDOZA DE CHAMPION MELVA LINA MERCEDES y  HAU MENDOZA DE CHAMPION MELVA LINA MERCEDES y LOPEZ GUTIERREZ RUBY ALVA y  LOPEZ GUTTIERREZ IRMA GRETA",
      "sfechainicio": "28/12/2011",
      "niter": null
    },
    {
      "sexpediente": "00507-2021-0-0401-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "ROTHMAN`S E.I.R.LTDA.",
      "sdemandado": "BENAVENTE AYBAR ERNESTO ELIZALDE",
      "sfechainicio": "27/09/2021",
      "niter": null
    },
    {
      "sexpediente": "00582-2018-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "FERNANDEZ YAÑEZ BETTY MARCELA",
      "sdemandado": "CHAVEZ MARROQUIN IBET PATRICIA y  CHAVEZ MARROQUIN MARIA EUGENIA y  CHAVEZ MARROQUIN NATALIA y CHAVEZ MARROQUIN JORGE LUIS y MARROQUIN ROJAS DE CHAVEZ RUTH ELENA y SUCESION DE CHAVEZ RIQUELME JORGE ERNESTO",
      "sfechainicio": "02/02/2018",
      "niter": 17
    },
    {
      "sexpediente": "00582-2018-85-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "FERNANDEZ YAÑEZ BETTY MARCELA",
      "sdemandado": "MARROQUIN ROJAS DE CHAVEZ RUTH ELENA y  CHAVEZ MARROQUIN JORGE LUIS y CHAVEZ MARROQUIN NATALIA y CHAVEZ MARROQUIN MARIA EUGENIA y CHAVEZ MARROQUIN IBET PATRICIA",
      "sfechainicio": "01/06/2018",
      "niter": null
    },
    {
      "sexpediente": "00684-2012-0-0412-JM-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "EJECUCION DE GARANTIAS",
      "sdemandante": "VILCA CEJAS ROBERTO ALBERTO",
      "sdemandado": "VALENCIA TEJADA VICTOR ZENOBIO",
      "sfechainicio": "17/05/2012",
      "niter": null
    },
    {
      "sexpediente": "00782-2011-0-0401-JR-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "FERNANDEZ ORTIZ LARRY SALOMON",
      "sdemandado": "CUTIPA CRUZ ROBERTO y  DIAZ DAVILA JOSE LELY y  ROSA NALIA VELASQUEZ CASTILLO Y SANTOS VIDAL ACUÑA DIAZ",
      "sfechainicio": "01/03/2011",
      "niter": null
    },
    {
      "sexpediente": "00792-1998-0-0401-JR-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "DIVISION Y PARTICIPACION DE BIENES",
      "sdemandante": "HUGO VICTOR OBANDO PERALTA SUCESOR PROCESAL DE ROSA MERCEDES PERALTA PORTUGAL",
      "sdemandado": "PERALTA PORTUGAL FELICITAS y PERALTA PORTUGAL VICTOR y  PERALTA VDA DE LLANOS JUANA ENCARNACION",
      "sfechainicio": "17/06/1998",
      "niter": 17
    },
    {
      "sexpediente": "00992-2012-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "RAMIREZ RAA ALDO ROLANDO",
      "sdemandado": "BANDA TEJADA FRANCISCO MANUEL",
      "sfechainicio": "02/04/2012",
      "niter": 14
    },
    {
      "sexpediente": "01142-2022-0-0401-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "ANCOCALLO FLORES CYNTHIA GUALU",
      "sdemandado": "CHACON PINTO MIRIAM NILDA",
      "sfechainicio": "30/03/2022",
      "niter": 8
    },
    {
      "sexpediente": "01142-2022-89-0401-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "ANCOCALLO FLORES CYNTHIA GUALU",
      "sdemandado": "CHACON PINTO MIRIAM NILDA",
      "sfechainicio": "06/09/2022",
      "niter": 17
    },
    {
      "sexpediente": "01588-2023-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "PAGO DE FRUTOS",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "VERA RIVERA EUSEBIA CARMELA",
      "sfechainicio": "29/03/2023",
      "niter": null
    },
    {
      "sexpediente": "01609-2018-0-0401-JR-CI-04",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "CCORIMANYA CONDORI CESAR ALIPIO",
      "sdemandado": "HOLGADO DEL CARPIO ELSA y SILVA GUILLEN LIZBET BRENDA",
      "sfechainicio": "13/04/2018",
      "niter": null
    },
    {
      "sexpediente": "01741-2016-0-0401-JR-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE HACER",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "VERA RIVERA EUSEBIA CARMELA",
      "sfechainicio": "25/04/2016",
      "niter": 17
    },
    {
      "sexpediente": "01778-2016-0-0401-JR-CI-06",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "VERA RIVERA EUSEBIA CARMELA",
      "sdemandado": "PINTO LINARES JUAN GILBERTO",
      "sfechainicio": "27/04/2016",
      "niter": 24
    },
    {
      "sexpediente": "01880-2021-0-0401-JR-CI-05",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE RESOLUCION ADMINISTRATIVA",
      "sdemandante": "ARENAS ZEGARRA BLANCA EUFEMIA",
      "sdemandado": "HAROLD ANTONIO ESPINOZA DELGADO PROCURADOR PUBLICO DE LA SUPERINTENDENCIA NACIONAL DE FISCALIZACION LABORAL",
      "sfechainicio": "27/04/2021",
      "niter": 24
    },
    {
      "sexpediente": "02268-2023-70-0401-JR-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "VELAZCO MOGROVEJO, ANTONIO ANIBAL-VELAZCO MOGROVEJO, MARIA ESPERANZA- VELAZCO MOGROVEJO, MIGUEL ANGEL-VELAZCO MOGROVEJO, GLORIA DEL CARMEN-VELAZCO ZUÑIGA, CARLOS ANTONIO.",
      "sdemandado": "VELAZCO MOGROVEJO, VICTOR HUGO",
      "sfechainicio": "05/02/2023",
      "niter": null
    },
    {
      "sexpediente": "02516-2015-0-0401-JR-CI-06",
      "sespecialidad": "CIVIL",
      "smateria": "PRESCRIPCION ADQUISITIVA",
      "sdemandante": "PAZ CALLATA ROSA ELVIRA",
      "sdemandado": "NINA IMATA LAZARO(LITIS CONSORTE)",
      "sfechainicio": "08/06/2015",
      "niter": null
    },
    {
      "sexpediente": "02587-2015-0-0401-JR-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "MENDOZA PATIÑO SILVERIO JOSE",
      "sdemandado": "CUENTAS VALDIVIA MOISES",
      "sfechainicio": "12/06/2015",
      "niter": 27
    },
    {
      "sexpediente": "02690-2018-0-0401-JR-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "REIVINDICACION",
      "sdemandante": "NINA IMATA LAZARO DEMANDADO EN RECONVENCION",
      "sdemandado": "PAZ CALLATA ROSA ELVIRA",
      "sfechainicio": "07/06/2018",
      "niter": 14
    },
    {
      "sexpediente": "02835-2020-0-3204-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "ESPEJO OLIVERA EDUARDO ERNESTO",
      "sdemandado": "ARIAS ALVA ELIZABETH PILAR y GUILLEN GARCIA LUIS ALBERTO",
      "sfechainicio": "19/11/2020",
      "niter": null
    },
    {
      "sexpediente": "03388-2019-0-0412-JR-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "DIVISION Y PARTICIPACION DE BIENES",
      "sdemandante": "SILVA FARFAN JOSE LUIS",
      "sdemandado": "SILVA FARFAN JUAN EDGAR y SILVA FARFAN DAVID ALFREDO",
      "sfechainicio": "19/07/2019",
      "niter": null
    },
    {
      "sexpediente": "03435-2016-0-0401-JR-CI-09",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "PONCE VERA PABLO CESAR",
      "sfechainicio": "05/08/2016",
      "niter": 10
    },
    {
      "sexpediente": "03496-2023-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "PAGO DE FRUTOS",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "VERA RIVERA EUSEBIA CARMELA",
      "sfechainicio": "06/07/2023",
      "niter": null
    },
    {
      "sexpediente": "03601-2016-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "BANCO DE CREDITO DEL PERU",
      "sfechainicio": "17/08/2016",
      "niter": 17
    },
    {
      "sexpediente": "03818-2023-0-3207-JP-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "SUCESION INTESTADA",
      "sdemandante": "JIHUA SAUME NORMA FELICITA",
      "sdemandado": "-",
      "sfechainicio": "21/07/2023",
      "niter": null
    },
    {
      "sexpediente": "04781-2021-0-0401-JR-CI-06",
      "sespecialidad": "CIVIL",
      "smateria": "EJECUCION DE GARANTIAS",
      "sdemandante": "BANCO GNB PERU S.A.",
      "sdemandado": "BARREROS ESPINOZA ELVIS MANUEL",
      "sfechainicio": "29/09/2021",
      "niter": 18
    },
    {
      "sexpediente": "05234-2019-0-0401-JR-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "EJECUCION DE GARANTIAS",
      "sdemandante": "CUADROS ANDRADE NOHELIA KARLA",
      "sdemandado": "NINA IMATA LAZARO",
      "sfechainicio": "24/10/2019",
      "niter": 4
    },
    {
      "sexpediente": "05813-2023-0-0401-JR-CI-07",
      "sespecialidad": "CIVIL",
      "smateria": "NULIDAD DE ACTO JURIDICO",
      "sdemandante": "VELAZCO MOGROVEJO, GLORIA DEL CARMEN; VELAZCO MOGROVEJO, MARIA ESPERANZA;VELAZCO MOGROVEJO, MIGUEL ANGEL; VELAZCO MOGROVEJO, ANTONIO ANIBAL Y VELAZCO ZUÑIGA, CARLOS ANTONIO",
      "sdemandado": "VELAZCO MOGROVEJO, VICTOR HUGO",
      "sfechainicio": "25/10/2023",
      "niter": 2
    },
    {
      "sexpediente": "06082-2018-77-0401-JR-CI-01",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE HACER",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "-",
      "sfechainicio": "22/01/2019",
      "niter": null
    },
    {
      "sexpediente": "06141-2023-0-0401-JP-CI-03",
      "sespecialidad": "CIVIL",
      "smateria": "OBLIGACION DE DAR SUMA DE DINERO",
      "sdemandante": "REPUESTOS DAVID DIESEL E.I.R.L.",
      "sdemandado": "C.G.G. TRANSPORTES, MINERIA Y CONSTRUCCION S.A.C.",
      "sfechainicio": "27/12/2023",
      "niter": null
    },
    {
      "sexpediente": "06704-2023-0-0401-JR-CI-04",
      "sespecialidad": "CIVIL",
      "smateria": "RETRACTO",
      "sdemandante": "PINTO LINARES JUAN GILBERTO",
      "sdemandado": "CAHUE ZAPANA IGINIO AUGUSTO y VERA RIVERA EUSEBIA CARMELA",
      "sfechainicio": "06/12/2023",
      "niter": null
    },
    {
      "sexpediente": "06740-2023-0-0401-JR-CI-06",
      "sespecialidad": "CIVIL",
      "smateria": "REIVINDICACION",
      "sdemandante": "APAZA ESPINOZA JOSE ALFREDO y APAZA FUENTES HENRY OSWALDO y ESPINOZA DE APAZA GUADALUPE",
      "sdemandado": "ATAMARI VILLASANTE GABRIELA y HUAMANI CHOQUEHUANCA ROSA ROSMERI y MERMA FLORES MARISOL y PUMAYLLE HUAMANCHA LUIS OMAR y QUISPE GONZALES BENITA y VILCA RODRIGUEZ LUIS JUSTO",
      "sfechainicio": "09/12/2023",
      "niter": null
    },
    {
      "sexpediente": "10399-2023-27-0401-JP-CI-02",
      "sespecialidad": "CIVIL",
      "smateria": "DESALOJO",
      "sdemandante": "ESPINOZA DE APAZA GUADALUPE y APAZA FUENTES HENRY OSWALDO",
      "sdemandado": "QUISPE GONZALES BENITA y APAZA ESPINOZA JOSE ALFREDO",
      "sfechainicio": "14/08/2023",
      "niter": null
    }
  ];
  lstPenal: Array<ObjExpediente> = [
    {
      "sexpediente": "00023-2020-63-0401-JR-PE-01",
      "sespecialidad": "PENAL",
      "smateria": "OMISION A LA ASISTENCIA FAMILIAR",
      "sdemandante": "AGRAVIADO : QUISPE GOMEZ, JEAN PIEER y QUISPE GOMEZ, DAYANA NICOL y QUISPE GOMEZ, MIRKO ALEXIS",
      "sdemandado": "IMPUTADO : QUISPE GUTIERREZ, RUFINO MIRKO",
      "sfechainicio": "¿...?",
      "niter": null
    },
    {
      "sexpediente": "00747-2021-0-0402-JR-PE-01",
      "sespecialidad": "PENAL",
      "smateria": "OMISION A LA ASISTENCIA FAMILIAR",
      "sdemandante": "DEMANDANTE: JUANA JULIA CCOA ARJOTA",
      "sdemandado": "DEMANDADO: JOHN ALEX ARNICA AMPUERO",
      "sfechainicio": "10-03-2022",
      "niter": 10
    },
    {
      "sexpediente": "01619-2022-0-2111-JR-PE-04",
      "sespecialidad": "PENAL",
      "smateria": "OMISION A LA ASISTENCIA FAMILIAR",
      "sdemandante": "AGRAVIADO : ZAVALETA BECERRA, JOSEFA MARTINA",
      "sdemandado": "IMPUTADO : APAZA FUENTES, HENRY OSWALDO",
      "sfechainicio": "¿...?",
      "niter": 16
    },
    {
      "sexpediente": "01751-2023-0-0401-JP-PE-01",
      "sespecialidad": "PENAL",
      "smateria": "LESIÓN DOLOSA Y CULPOSA",
      "sdemandante": "AGRAVIADO : APAZA ESPINOZA, EFRAIN FRANCISCO",
      "sdemandado": "IMPUTADO : BARREROS ESPINOZA, ELVIS MANUEL",
      "sfechainicio": "¿...?",
      "niter": 5
    },
    {
      "sexpediente": "03944-2023-0-0401-JR-PE-02",
      "sespecialidad": "PENAL",
      "smateria": "OMISIÓN DE ALIMENTOS",
      "sdemandante": "AGRAVIADO: DELGADILLO CONDORI MARIA DEL CARMEN",
      "sdemandado": "IMPUTADO: COLQUE URURU WILBER",
      "sfechainicio": "19/5/2023",
      "niter": 15
    },
    {
      "sexpediente": "05215-2022-93-0401-JR-PE-07",
      "sespecialidad": "PENAL",
      "smateria": "ACTOS CONTRA EL PUDOR EN MENORES",
      "sdemandante": "AGRAVIADO: LTAP REPRESENTADA POR LIZ SHIRLEY PINTO HUAMANI",
      "sdemandado": "IMPUTADO: ABRIL GARCIA, MICHAEL WINSTON4",
      "sfechainicio": "04/07/2022",
      "niter": 8
    },
    {
      "sexpediente": "06040-2019-74-0401-JR-PE-02",
      "sespecialidad": "PENAL",
      "smateria": "ACTOS CONTRA EL PUDOR",
      "sdemandante": "AGRAVIADO: EECS",
      "sdemandado": "IMPUTADO: ARANA VALDERRAMA ELMER AMILCAR",
      "sfechainicio": "04-03-2020",
      "niter": null
    },
    {
      "sexpediente": "06312-2023-0-0401-JR-PE-04",
      "sespecialidad": "PENAL",
      "smateria": "DIFAMACION",
      "sdemandante": "QUERELLANTE: LOPEZ TASSARA, ERICK",
      "sdemandado": "QUERELLADO: VELARDE PARDO, LUCIA MARIA",
      "sfechainicio": "14/08/2023",
      "niter": 16
    },
    {
      "sexpediente": "07796-2017-53-0401-JP-PE-02",
      "sespecialidad": "PENAL",
      "smateria": "LESIONES LEVES",
      "sdemandante": "AGRAVIADO: COLQUE URURU WILBER",
      "sdemandado": "IMPUTADO: DELGADILLO CONDORI MARIA DEL CARMEN",
      "sfechainicio": "05-09-2019",
      "niter": null
    },
    {
      "sexpediente": "08318-2021-17-0401-JR-PE-02",
      "sespecialidad": "PENAL",
      "smateria": "USURPACIÓN",
      "sdemandante": "AGRAVIADO : PINTO LINARES, JUAN GILBERTO",
      "sdemandado": "IMPUTADO : VERA RIVERA, EUSEBIA CARMELA",
      "sfechainicio": "¿...?",
      "niter": 17
    }
  ];
  lstConst: Array<ObjExpediente> = [
    {
      "sexpediente": "00158-2023-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "ROMERO CASANOVA VALERI CARLOS",
      "sdemandado": "MALCA GUAYLUPO VICTOR RAUL",
      "sfechainicio": "23/02/2023",
      "niter": null
    },
    {
      "sexpediente": "00369-2022-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "SALAS LUNA LUIS ALBERTO TOMAS",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "23/05/2022 ",
      "niter": null
    },
    {
      "sexpediente": "00396-2022-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "HABEAS CORPUS",
      "sdemandante": " MALDONADO RIEGA MITZI SOLANGE y CUSIRIMAY FUSE ITALO ENRIQUE",
      "sdemandado": " SO1 PNP GARATE LOAYZA MIRIAM y PROCURADOR PUBLICO DEL MINISTERIO PUBLICO y  PROCURADOR PUBLICO DEL MINISTERIO DEL INTERIOR y FISCAL PROVINCIAL DE LA 2DA FPPC ECMEIDGF ELIZABETH SEJJE SUAREZ",
      "sfechainicio": "03/06/2022",
      "niter": null
    },
    {
      "sexpediente": "00396-2023-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "VILCAPOMA ARANDA PAUL MCCARTNEY",
      "sdemandado": " PROCURADOR PUBLICO DEL PODER JUDICIAL y  2DA SALA DE DERECHO CONSTITUCIONAL Y SOCIAL TRANSITORIA DE CORTE SUPREMA DE JUSTICIA DE LA REPUBLICA",
      "sfechainicio": "01/06/2023",
      "niter": null
    },
    {
      "sexpediente": "00470-2022-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "PALOMINO MAMANI ELVIDO PEDRO",
      "sdemandado": "MISION PERUANA DEL SUR DE LA IASD y  IGLESIA ADVENTISTA DEL SEPTIMO DIA y  ASOCIACION SERVICIO EDUCACIONAL HOGAR Y SALUD",
      "sfechainicio": "07/07/2022",
      "niter": null
    },
    {
      "sexpediente": "00565-2022-0-0401-JR-DC-01",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "BARRANTES AGUILAR JUAN EDUARDO MAYKOLTH",
      "sdemandado": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sfechainicio": "16/08/2022",
      "niter": null
    },
    {
      "sexpediente": "00752-2022-0-1801-SP-DC-02",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "SOTO OLARTE ZENEIDA",
      "sdemandado": "SAN ROMAN LINARES",
      "sfechainicio": "17/05/2022",
      "niter": null
    },
    {
      "sexpediente": "00918-2022-0-1801-JR-DC-11",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "LEON MENDOZA MARIO ARNULFO",
      "sdemandado": "PRESIDENCIA DEL CONSEJO DE MINISTROS",
      "sfechainicio": "08/02/2022",
      "niter": 1
    },
    {
      "sexpediente": "02175-2022-0-1801-JR-DC-05",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "CHOQUEPATA PORTILLO NINO WILLIAN",
      "sdemandado": "SOUTHERN PERU COPPER CORPORATION, SUCURSAL DEL PERÚ",
      "sfechainicio": "29/03/2022 ",
      "niter": 1
    },
    {
      "sexpediente": "03001-2023-0-1801-SP-DC-03",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sdemandado": "APAZA QUISPE RAUL GREGORIO y  PODER JUDICIAL",
      "sfechainicio": "27/09/2023",
      "niter": 1
    },
    {
      "sexpediente": "03976-2023-0-1801-SP-DC-03",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "SOCIEDAD MINERA CERRO VERDE S.A.A.",
      "sdemandado": "PODER JUDICIAL y  JUAN CESAR VILLEGAS ROJAS",
      "sfechainicio": "16/11/2023",
      "niter": null
    },
    {
      "sexpediente": "05271-2022-0-1801-JR-DC-09",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "RAMOS QUILLA SANDRO DAVID",
      "sdemandado": "PODER JUDICIAL",
      "sfechainicio": "19/07/2022",
      "niter": null
    },
    {
      "sexpediente": "07428-2022-0-1801-JR-DC-03",
      "sespecialidad": "CONSTITUCIONAL",
      "smateria": "ACCION DE AMPARO",
      "sdemandante": "PEREZ OLARTE RENE GARI",
      "sdemandado": "COMPAÑIA MINERA ANTAPACCAY S.A.",
      "sfechainicio": "07/10/2022",
      "niter": null
    }
  ];

  lstExpedientes: Array<ObjExpediente> = [];
  lstExpedientesFiltered: Array<ObjExpediente> = [];
  lModeFiltering = false;

  fcLab1: FormControl = new FormControl([]);
  fcLab2: FormControl = new FormControl([]);
  fcLab3: FormControl = new FormControl([]);
  fcLab4: FormControl = new FormControl([]);
  fcFamilia: FormControl = new FormControl([]);
  fcCivil: FormControl = new FormControl([]);
  fcPenal: FormControl = new FormControl([]);
  fcConstitucional: FormControl = new FormControl([]);

  constructor(
    private db: AngularFirestore,
  ) {
    this.lstExpedientes = this.lstLaRepo.concat(
      this.lstLaIndem
    ).concat(
      this.lstLaPBSE
    ).concat(
      this.lstLaOtros
    ).concat(
      this.lstFamil
    ).concat(
      this.lstCivil
    ).concat(
      this.lstPenal
    ).concat(
      this.lstConst
    );
  }

  getExpedientes() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('lactive', '==', true)
    })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstLaRepo = res.filter(x => x.sespecialidad == 'LABORAL')
          .filter(x => x.idmateria == 'LAB-REPO')
          .sort((a: any, b: any) => {
            if (a.sdemandante < b.sdemandante) {
              return -1
            } else {
              return 1;
            }
          }).map(x => {
            let obj: ObjExpediente = {
              sexpediente: x.sexpediente,
              sespecialidad: x.sespecialidad,
              smateria: x.smateria,
              sdemandante: x.sdemandante,
              sdemandado: x.sdemandado,
              sfechainicio: x.sfechainicio,
              niter: Number(x.niter)
            };
            return obj;
          });
        this.lstLaIndem = res.filter(x => x.sespecialidad == 'LABORAL')
          .filter(x => x.idmateria == 'LAB-INDE-PDYP-PIC')
          .sort((a: any, b: any) => {
            if (a.sdemandante < b.sdemandante) {
              return -1
            } else {
              return 1;
            }
          }).map(x => {
            let obj: ObjExpediente = {
              sexpediente: x.sexpediente,
              sespecialidad: x.sespecialidad,
              smateria: x.smateria,
              sdemandante: x.sdemandante,
              sdemandado: x.sdemandado,
              sfechainicio: x.sfechainicio,
              niter: Number(x.niter)
            };
            return obj;
          });
        this.lstLaPBSE = res.filter(x => x.sespecialidad == 'LABORAL')
          .filter(x => x.idmateria == 'LAB-PAGO-BSI-OBS')
          .sort((a: any, b: any) => {
            if (a.sdemandante < b.sdemandante) {
              return -1
            } else {
              return 1;
            }
          }).map(x => {
            let obj: ObjExpediente = {
              sexpediente: x.sexpediente,
              sespecialidad: x.sespecialidad,
              smateria: x.smateria,
              sdemandante: x.sdemandante,
              sdemandado: x.sdemandado,
              sfechainicio: x.sfechainicio,
              niter: Number(x.niter)
            };
            return obj;
          });
        this.lstLaOtros = res.filter(x => x.sespecialidad == 'LABORAL')
          .filter(x => {
            if (x.idmateria == 'LAB-REPO') {
              return false;
            } else if (x.idmateria == 'LAB-PAGO-BSI-OBS') {
              return false;
            } else if (x.idmateria == 'LAB-INDE-PDYP-PIC') {
              return false;
            } else {
              return true;
            }
          }).sort((a: any, b: any) => {
            if (a.sdemandante < b.sdemandante) {
              return -1
            } else {
              return 1;
            }
          }).map(x => {
            let obj: ObjExpediente = {
              sexpediente: x.sexpediente,
              sespecialidad: x.sespecialidad,
              smateria: x.smateria,
              sdemandante: x.sdemandante,
              sdemandado: x.sdemandado,
              sfechainicio: x.sfechainicio,
              niter: Number(x.niter)
            };
            return obj;
          });
        this.lstFamil = res.filter(x => x.sespecialidad == 'FAMILIA').map(x => {
          let obj: ObjExpediente = {
            sexpediente: x.sexpediente,
            sespecialidad: x.sespecialidad,
            smateria: x.smateria,
            sdemandante: x.sdemandante,
            sdemandado: x.sdemandado,
            sfechainicio: x.sfechainicio,
            niter: Number(x.niter)
          };
          return obj;
        })
        this.lstCivil = res.filter(x => x.sespecialidad == 'CIVIL').map(x => {
          let obj: ObjExpediente = {
            sexpediente: x.sexpediente,
            sespecialidad: x.sespecialidad,
            smateria: x.smateria,
            sdemandante: x.sdemandante,
            sdemandado: x.sdemandado,
            sfechainicio: x.sfechainicio,
            niter: Number(x.niter)
          };
          return obj;
        })
        this.lstPenal = res.filter(x => x.sespecialidad == 'PENAL').map(x => {
          let obj: ObjExpediente = {
            sexpediente: x.sexpediente,
            sespecialidad: x.sespecialidad,
            smateria: x.smateria,
            sdemandante: x.sdemandante,
            sdemandado: x.sdemandado,
            sfechainicio: x.sfechainicio,
            niter: Number(x.niter)
          };
          return obj;
        })
        this.lstConst = res.filter(x => x.sespecialidad == 'CONSTITUCIONAL').map(x => {
          let obj: ObjExpediente = {
            sexpediente: x.sexpediente,
            sespecialidad: x.sespecialidad,
            smateria: x.smateria,
            sdemandante: x.sdemandante,
            sdemandado: x.sdemandado,
            sfechainicio: x.sfechainicio,
            niter: Number(x.niter)
          };
          return obj;
        })

        this.fcLab1.setValue(JSON.stringify(this.lstLaRepo))
        this.fcLab2.setValue(JSON.stringify(this.lstLaIndem))
        this.fcLab3.setValue(JSON.stringify(this.lstLaPBSE))
        this.fcLab4.setValue(JSON.stringify(this.lstLaOtros))

        this.fcFamilia.setValue(JSON.stringify(this.lstFamil))
        this.fcCivil.setValue(JSON.stringify(this.lstCivil))
        this.fcPenal.setValue(JSON.stringify(this.lstPenal))
        this.fcConstitucional.setValue(JSON.stringify(this.lstConst))

        console.log('Se obtuvieron los expedientes correctamente');
        obs.unsubscribe();
      })
  }

  descargarExcel() {
    const workbook = XLSX.utils.book_new();

    const wsLab1 = XLSX.utils.json_to_sheet(this.lstLaRepo);
    XLSX.utils.book_append_sheet(workbook, wsLab1, "Laboral Reposicion");

    const wsLab2 = XLSX.utils.json_to_sheet(this.lstLaIndem);
    XLSX.utils.book_append_sheet(workbook, wsLab2, "Laboral Indemnizacion");

    const wsLab3 = XLSX.utils.json_to_sheet(this.lstLaPBSE);
    XLSX.utils.book_append_sheet(workbook, wsLab3, "Laboral Pago de Beneficios");

    const wsLab4 = XLSX.utils.json_to_sheet(this.lstLaOtros);
    XLSX.utils.book_append_sheet(workbook, wsLab4, "Laboral Otros");


    const wsFamil = XLSX.utils.json_to_sheet(this.lstFamil);
    XLSX.utils.book_append_sheet(workbook, wsFamil, "Familia");

    const wsCivil = XLSX.utils.json_to_sheet(this.lstCivil);
    XLSX.utils.book_append_sheet(workbook, wsCivil, "Civil");

    const wsPenal = XLSX.utils.json_to_sheet(this.lstPenal);
    XLSX.utils.book_append_sheet(workbook, wsPenal, "Penal");

    const wsConst = XLSX.utils.json_to_sheet(this.lstConst);
    XLSX.utils.book_append_sheet(workbook, wsConst, "Constitucional");

    XLSX.writeFile(workbook, 'Expedientes SGABGSAC' + '.xlsx', { compression: true });
  }

  cambio(val: string) {
    console.log(val);
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.lstExpedientesFiltered = this.lstExpedientes;
      this.lModeFiltering = false;
      return;
    }

    this.lstExpedientesFiltered = this.lstExpedientes.filter(exp => {
      let lMatch = false;
      let nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sdemandado.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sdemandante.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sexpediente.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;

      return lMatch;
    });
    this.lModeFiltering = true;
  }
}
