import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-expediente-item-edit-code',
  templateUrl: './expediente-item-edit-code.component.html',
  styleUrls: ['./expediente-item-edit-code.component.scss']
})
export class ExpedienteItemEditCodeComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
