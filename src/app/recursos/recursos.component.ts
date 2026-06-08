import { Component } from '@angular/core';
import { RecursosItersComponent } from '../recursos-iters/recursos-iters.component';
import { RecursosTareasComponent } from '../recursos-tareas/recursos-tareas.component';

@Component({
    selector: 'app-recursos',
    templateUrl: './recursos.component.html',
    styleUrls: ['./recursos.component.scss'],
    imports: [
        RecursosItersComponent,
        RecursosTareasComponent,
    ]
})
export class RecursosComponent {

}
