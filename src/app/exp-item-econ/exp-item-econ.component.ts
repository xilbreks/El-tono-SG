import { Component, Input } from '@angular/core';

import { Expediente } from '../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-econ',
  templateUrl: './exp-item-econ.component.html',
  styleUrl: './exp-item-econ.component.scss'
})
export class ExpItemEconComponent {
  @Input('expediente') expediente: Expediente | null = null;
}
