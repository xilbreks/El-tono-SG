import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-expediente-item-edit-match',
  templateUrl: './expediente-item-edit-match.component.html',
  styleUrls: ['./expediente-item-edit-match.component.scss']
})
export class ExpedienteItemEditMatchComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  
  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
