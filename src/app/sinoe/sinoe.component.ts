import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sinoe',
  templateUrl: './sinoe.component.html',
  styleUrls: ['./sinoe.component.scss']
})
export class SinoeComponent {

  constructor(
    private db: AngularFirestore,
  ) {

  }

}
