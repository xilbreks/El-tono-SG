import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}/;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  get listNoMatch() {
    return [
      {
        "sespecialista": "CARPIO MONTES, ALEXANDRA",
        "sdemandado": "IMPUTADO: ABRIL GARCIA, MICHAEL WINSTON4",
        "sorganojuris": "7° JUZGADO DE INV. PREPARATORIA VIOL. C MUJER E IGF MOD. AREQUIPA",
        "sfechainicio": "x",
        "sjuez": "X",
        "smateria": "X",
        "sfechacreacion": "1692292983420",
        "salias": "05215-2022",
        "sespecialidad": "PENAL",
        "sexpediente": "05215-2022-93-0401-JR-PE-07",
        "sfechamodificacion": "1692292983420",
        "sdemandante": "AGRAVIADO: LTAP REPRESENTADA POR LIZ SHIRLEY PINTO HUAMANI"
      }
    ]
  }

}
