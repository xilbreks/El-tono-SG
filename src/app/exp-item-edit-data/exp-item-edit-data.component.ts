import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-exp-item-edit-data',
  templateUrl: './exp-item-edit-data.component.html',
  styleUrls: ['./exp-item-edit-data.component.scss']
})
export class ExpItemEditDataComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
