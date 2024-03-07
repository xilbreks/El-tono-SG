import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-exp-item-edit-match',
  templateUrl: './exp-item-edit-match.component.html',
  styleUrls: ['./exp-item-edit-match.component.scss']
})
export class ExpItemEditMatchComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
