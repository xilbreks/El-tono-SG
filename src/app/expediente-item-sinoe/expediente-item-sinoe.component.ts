import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Noti {
  idsinoe: string;
  sexpediente: string;
  sfecha: string;
  ssumilla: string;
}

@Component({
  selector: 'app-expediente-item-sinoe',
  templateUrl: './expediente-item-sinoe.component.html',
  styleUrls: ['./expediente-item-sinoe.component.scss']
})
export class ExpedienteItemSinoeComponent {
  @Input('sexpediente') sexpediente: string = '';
  lstHistorial: Array<Noti> = [];

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(): void {
    let obs = this.db
      .collection('sinoe', ref => {
        return ref.where('sexpediente', '==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((notis: Array<any>) => {
        notis.reverse().forEach((noti) => {
          this.lstHistorial.push(noti);
        });

        obs.unsubscribe();
      });
  }
}
