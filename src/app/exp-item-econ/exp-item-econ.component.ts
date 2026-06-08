import { Component, Input } from '@angular/core';

import { Expediente } from '../_interfaces/expediente';
import { ExpItemEconCuotComponent } from '../exp-item-econ-cuot/exp-item-econ-cuot.component';
import { ExpItemEconAranComponent } from '../exp-item-econ-aran/exp-item-econ-aran.component';
import { ExpItemEconAbonComponent } from '../exp-item-econ-abon/exp-item-econ-abon.component';

@Component({
  selector: 'app-exp-item-econ',
  templateUrl: './exp-item-econ.component.html',
  styleUrl: './exp-item-econ.component.scss',
  imports: [
    ExpItemEconCuotComponent,
    ExpItemEconAranComponent,
    ExpItemEconAbonComponent,
  ]
})
export class ExpItemEconComponent {
  @Input('expediente') expediente: Expediente | null = null;
}
