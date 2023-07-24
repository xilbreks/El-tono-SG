import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

class ObjExpediente {
  sfechainicio: string = '';
  sexpediente: string = '';
  sdemandado: string = '';
  sdemandante: string = '';
  sespecialidad: string = '';
  sdistritojuris: string = '';
  sorganojuris: string = '';
  sespecialista: string = '';
  sjuez: string = '';
  smateria: string = '';
  ssumilla: string = '';
  sfechamodificacion: string = '';
  constructor() {}
}

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
})
export class ExpedientesComponent {
  lstExpedientes: Array<ObjExpediente> = [];
  lSearching: boolean = false;
  lNotFound: boolean = false;

  constructor(private db: AngularFirestore, private router: Router) {
    this.getExpedientes();
  }

  getExpedientes(): void {
    this.db.collection('expedientes', ref => {
      return ref.where('sespecialidad','!=','LABORAL')
      // return ref.orderBy('sfechamodificacion','desc').limit(10);
    })
    .valueChanges()
    .subscribe((val: Array<any>) => {
      this.lstExpedientes = val;
      console.log(val);
    });
  }

  buscarExpediente(sinput: any): void {
    if(!sinput) return;

    let sexpediente = sinput.trim();
    this.lSearching = true;
    
    let observando = this.db.collection('expedientes')
      .doc(sexpediente)
      .valueChanges()
      .subscribe((obj: any) => {
        this.lSearching = false;
        if (!!obj) {
          this.router.navigate(['/expediente/',sexpediente]);
        } else {
          this.lNotFound = true;
          setTimeout(()=>{
            this.lNotFound = false;
          }, 5000);
        }
        observando.unsubscribe();
      });
  }

}
