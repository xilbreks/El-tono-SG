import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjTarea {
  idrdt: string = '';
  stipocliente: 'nc' | 'nuevo' | 'antiguo' | 'varios' = 'nc';
  stipoatencion: 'nc' | 'por-expediente' | 'presencial' | 'via-celular' | 'via-internet' = 'presencial';
  sespecialidad: 'nc' | 'laboral' | 'penal' | 'civil' | 'familia' | 'constitucional' | 'tramite-adm' | 'tramite-not' | 'varios' = 'nc';
  ncodeje: string = '';
  constructor() { }
}

@Component({
  selector: 'app-stats-generator',
  templateUrl: './stats-generator.component.html',
  styleUrls: ['./stats-generator.component.scss']
})
export class StatsGeneratorComponent {
  lstUsuarios: Array<any> = [];
  lstTareas: Array<any> = [];
  sfinicio: any;
  sffinal: any;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  setInicio(f: any) {
    this.sfinicio = f;
  }

  setFinal(f: any) {
    this.sffinal = f;
  }

  getUsers() {
    let obs = this.db
      .collection('colaboradores', (ref) => {
        return ref.where('lactive', '==', true);
      })
      .valueChanges()
      .subscribe((users: Array<any>) => {
        this.lstUsuarios = users;
        console.log('Usuarios recuperados exitosamente', users);
        obs.unsubscribe();
      });
  }

  getTasks() {
    let obs = this.db
      .collection('tareas', (ref) => {
        return ref.where('sfecha', '>=', this.sfinicio).where('sfecha', '<=', this.sffinal);
      })
      .valueChanges()
      .subscribe((tasks: Array<any>) => {
        let lstTareas = tasks.filter((t: any) => {
          let nCodEje = Number(t.ncodeje);
          if(nCodEje < 100) {
            return true;
          }
          else return false;
        })
        this.lstTareas = lstTareas;
        console.log('Tareas recuperadas exitosamente', lstTareas);
        obs.unsubscribe();
      });
  }

  generar(texto: any) {
    let lstStats: Array<any> = [];
    lstStats.push({
      user: '001',
      texto: texto.trim()
    });
    this.lstUsuarios.forEach(usuario => {
      let suser = usuario.id;
      let obj = {
        user: suser,
        name: usuario.snombre,
        color: usuario.scolor,
        tc: {
          'nc': 0,
          'nuevo': 0,
          'antiguo': 0,
          'varios': 0
        },
        ta: {
          'nc': 0,
          'por-expediente': 0,
          'presencial': 0,
          'via-celular': 0,
          'via-internet': 0
        },
        tp: {
          'nc': 0,
          'laboral': 0,
          'penal': 0,
          'civil': 0,
          'familia': 0,
          'constitucional': 0,
          'tramite-adm': 0,
          'tramite-not': 0,
          'varios': 0
        },
        tt: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0
        ]
      }
      this.lstTareas.forEach((tarea: ObjTarea) => {
        if (tarea.idrdt.slice(11) == suser) {
          obj.tc[tarea.stipocliente] += 1;
          obj.ta[tarea.stipoatencion] += 1;
          obj.tp[tarea.sespecialidad] += 1;
          let ii = Number(tarea.ncodeje);
          if (ii <= 54) {
            obj.tt[ii - 1] += 1;
          }
        }
      })
      lstStats.push(obj);
    })

    lstStats.forEach(item => {
      this.db.collection('estadisticas')
        .doc(item.user)
        .set(item)
        .then(res => {
          console.log('exito')
        })
        .catch(err => {
          console.log(err)
        });
    })

  }
}
