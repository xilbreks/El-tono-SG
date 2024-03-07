import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-expediente-item-edit-data',
  templateUrl: './expediente-item-edit-data.component.html',
  styleUrls: ['./expediente-item-edit-data.component.scss']
})
export class ExpedienteItemEditDataComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
