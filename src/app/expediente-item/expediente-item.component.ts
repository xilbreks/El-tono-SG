import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-expediente-item',
  templateUrl: './expediente-item.component.html',
  styleUrls: ['./expediente-item.component.scss']
})
export class ExpedienteItemComponent implements OnInit {
  sexpediente: string = '';
  
  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sexpediente = params['id'];
      this.titleService.setTitle(this.sexpediente);
    });
  }
}
