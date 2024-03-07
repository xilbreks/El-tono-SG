import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-exp-item-edit-code',
  templateUrl: './exp-item-edit-code.component.html',
  styleUrls: ['./exp-item-edit-code.component.scss']
})
export class ExpItemEditCodeComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
