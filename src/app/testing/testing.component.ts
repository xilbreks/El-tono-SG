import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
        .where('sfecha', '>=', '2024-04-15')
        .where('sfecha', '<=', '2024-04-19')
    })
      .valueChanges()
      .subscribe((res: any) => {
        this.lstTareas = res;

        console.log('ok tareas', res.length)
        obs.unsubscribe();
      });
  }

  descargarJSON() {
    // Convert JSON to string
    const data = JSON.stringify(this.lstTareas);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'tareas.json';
    link.href = url;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  }

}
