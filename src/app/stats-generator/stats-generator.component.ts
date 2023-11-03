import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class ObjTarea {
  idrdt: string = '';
  stipocliente: 'nc' | 'nuevo' | 'antiguo' | 'varios' = 'nc';
  stipoatencion: 'nc' | 'por-expediente' | 'presencial' | 'via-celular' | 'via-internet' = 'presencial';
  sespecialidad: 'nc' | 'laboral' | 'penal' | 'civil' | 'familia' | 'constitucional' | 'tramite-adm' | 'tramite-not' | 'varios' = 'nc';
  ncodeje: string = '';
  nmontorec: number = 0;
  sexpediente: string = '';
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

  frmStats: FormGroup;
  lGenerating: boolean = false;

  constructor(
    private db: AngularFirestore,
  ) {
    /***********************
     * INIT FORM EDIT TASK *
     ***********************/
    this.frmStats = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      lstusers: new FormControl(null, Validators.required),
    });

    this.getUsers();
  }

  getUsers() {
    let obs = this.db
      .collection('colaboradores', (ref) => {
        return ref.where('lactive', '==', true);
      })
      .valueChanges()
      .subscribe((users: Array<any>) => {
        this.lstUsuarios = users;
        this.frmStats.controls['lstusers'].setValue('ok')
        obs.unsubscribe();
      });
  }

  generar() {
    this.lGenerating = true;
    let sDescripcion = `
      Estadísticas  
      desde ${this.frmStats.value['sinicio']}
      hasta ${this.frmStats.value['sfinal']}
      -
      (actualizado al ${(new Date()).toLocaleString()})
    `;
    let obs = this.db
      .collection('tareas', (ref) => {
        return ref.where('sfecha', '>=', this.frmStats.value['sinicio'])
          .where('sfecha', '<=', this.frmStats.value['sfinal']);
      })
      .valueChanges()
      .subscribe((tasks: Array<any>) => {
        let lstTareas = tasks.filter((t: any) => {
          let nCodEje = Number(t.ncodeje);
          if (nCodEje < 100) {
            return true;
          }
          else return false;
        })
        this.lstTareas = lstTareas;

        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////

        let lstStats: Array<any> = [];
        lstStats.push({
          user: '001',
          texto: sDescripcion
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
            ],
            nmontorec: 0
          }
          let lstExpedientes: Array<any> = [];
          this.lstTareas.forEach((tarea: ObjTarea) => {
            if (tarea.idrdt.slice(11) == suser) {
              obj.nmontorec += tarea.nmontorec;
              let ii = Number(tarea.ncodeje);
              obj.tt[ii - 1] += 1;
              obj.ta[tarea.stipoatencion] += 1;

              // Excluir expedientes duplicados
              if (!lstExpedientes.includes(tarea.sexpediente)) {
                obj.tc[tarea.stipocliente] += 1;
                // obj.ta[tarea.stipoatencion] += 1;
                obj.tp[tarea.sespecialidad] += 1;
                lstExpedientes.push(tarea.sexpediente)
              }

            }
          })
          lstStats.push(obj);
        });

        lstStats.forEach(item => {
          this.db.collection('estadisticas')
            .doc(item.user)
            .set(item)
            .then(res => {
              this.lGenerating = false;
              this.frmStats.controls['sinicio'].reset()
              this.frmStats.controls['sfinal'].reset()
            })
            .catch(err => {
              console.log(err)
            });
        });

        obs.unsubscribe();
      });
  }


}
