import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.scss']
})
export class ExpItemComponent implements OnInit {
  sexpediente: string = '';
  lactive: boolean = true;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sexpediente = params['id'];
      this.titleService.setTitle(this.sexpediente);
    });
  }

  updateLactive(arg: boolean) {
    this.lactive = arg;
  }
}
