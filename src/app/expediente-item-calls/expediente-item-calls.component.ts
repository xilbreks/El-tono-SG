import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-expediente-item-calls',
  templateUrl: './expediente-item-calls.component.html',
  styleUrls: ['./expediente-item-calls.component.scss']
})
export class ExpedienteItemCallsComponent implements OnInit{
  @Input('sexpediente') sexpediente: string = '';
  lstCalls: Array<any> = [];
  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.getCalls();
  }

  getCalls() {
    let observando =  this.db
      .collection('llamadas', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((calls: Array<any>) => {
        calls.reverse().forEach((call)=>{
          this.lstCalls.push({
            ...call,
            sduracion: Math.floor(call.nduracion/60) + 'm ' + (call.nduracion - Math.floor(call.nduracion/60)*60) + 's'
          });
        });

        console.log(calls);
        
        observando.unsubscribe();
      });
  }
}
