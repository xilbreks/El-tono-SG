import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-expediente-item',
  templateUrl: './expediente-item.component.html',
  styleUrls: ['./expediente-item.component.scss']
})
export class ExpedienteItemComponent {
  sexpediente: string = '';
  constructor(
    private titleService: Title,
    route: ActivatedRoute
  ) {
    this.sexpediente = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(this.sexpediente);
  }
}
