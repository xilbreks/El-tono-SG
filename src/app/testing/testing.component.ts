import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface Pago {
  sdescripcion: string,
  sfecha: string,
  sexpediente: string,
  lactive: boolean,
  idpago: string,
  nmonto: number,
  smodificador: string
}

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  regexp = /^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}[-][0-9]{4}[-][A-Z]{2}[-][A-Z]{2}[-][0-9]{2}/;
  fcText: FormControl = new FormControl([]);

  lstColaboradores: Array<{
    id: string,
    snombre: string,
  }> = [];

  lstTareas: Array<{
    idcolaborador: string,
    idtarea: string,
    sespecialidad: string, // civil, penal, laboral...
    sexpediente: string,
    shorasatencion: string,
    sminutosatencion: string,
    sdemandado: string,
    sdemandante: string,
    sfecha: string,
  }> = [];

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  getColaboradores() {
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true);
    }).valueChanges()
      .subscribe((res: any) => {
        this.lstColaboradores = res;

        console.log('ok colaboradores', res.length);
        obs.unsubscribe();
      });
  }

  getTareas() {
    let obs = this.db.collection('tareas', ref => {
      return ref
        .where('sfecha', '>=', '2024-03-01')
        .where('sfecha', '<=', '2024-03-22')
    })
      .valueChanges()
      .subscribe((res: any) => {
        this.lstTareas = res;

        console.log('ok tareas', res.length)
        obs.unsubscribe();
      });
  }

  analizar() {
    const workbook = XLSX.utils.book_new();

    this.lstColaboradores.forEach(user => {
      let lstExpManipulados: Array<{
        sexpediente: string,
        sdemandante: string,
        sdemandado: string,
        ntoques: number,
        nminutos: number,
      }> = [];

      this.lstTareas
        .filter(tar => tar.idcolaborador == user.id)
        .forEach(tar => {
          let lexiste = lstExpManipulados.map(e => e.sexpediente).includes(tar.sexpediente.trim());

          if (lexiste) {
            // si existe
            let index = lstExpManipulados.findIndex(e => e.sexpediente == tar.sexpediente);
            lstExpManipulados[index].ntoques += 1;
            lstExpManipulados[index].nminutos += Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion);
          } else {
            // no existe
            lstExpManipulados.push({
              sexpediente: tar.sexpediente,
              sdemandante: tar.sdemandante,
              sdemandado: tar.sdemandado,
              ntoques: 1,
              nminutos: Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion),
            })
          }
        });

      lstExpManipulados.sort((a, b) => {
        if (a.ntoques < b.ntoques) {
          return 1;
        } else {
          return -1;
        }
      })


      const worksheet = XLSX.utils.json_to_sheet(lstExpManipulados);

      XLSX.utils.book_append_sheet(workbook, worksheet, user.snombre);
    });


    XLSX.writeFile(workbook, 'Analisis Febrero 2024.xlsx', { compression: true });
  }

  analizarGrupal() {
    const workbook = XLSX.utils.book_new();

    let lstExpManipulados: Array<{
      sexpediente: string,
      sdemandante: string,
      sdemandado: string,
      ntoques: number,
      nminutos: number,
    }> = [];

    this.lstTareas
      .forEach(tar => {
        let lexiste = lstExpManipulados.map(e => e.sexpediente).includes(tar.sexpediente.trim());

        if (lexiste) {
          // si existe
          let index = lstExpManipulados.findIndex(e => e.sexpediente == tar.sexpediente);
          lstExpManipulados[index].ntoques += 1;
          lstExpManipulados[index].nminutos += Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion);
        } else {
          // no existe
          lstExpManipulados.push({
            sexpediente: tar.sexpediente.trim(),
            sdemandante: tar.sdemandante,
            sdemandado: tar.sdemandado,
            ntoques: 1,
            nminutos: Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion),
          })
        }
      });

    lstExpManipulados.sort((a, b) => {
      if (a.ntoques < b.ntoques) {
        return 1;
      } else {
        return -1;
      }
    })


    const worksheet = XLSX.utils.json_to_sheet(lstExpManipulados);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipo SG');


    XLSX.writeFile(workbook, 'Analisis Febrero 2024.xlsx', { compression: true });
  }
}
