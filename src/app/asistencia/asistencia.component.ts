import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent {
  lstMaterias: Array<any> = [];

  constructor(
    private db: AngularFirestore,
  ) {
    this.getMaterias()
  }

  getMaterias() {
    let obs = this.db.collection('materias')
      .valueChanges()
      .subscribe((res)=>{
        this.lstMaterias = res;
        obs.unsubscribe();
      });    
  }
}
