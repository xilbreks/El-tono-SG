import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { AppService } from '../app.service';

@Component({
  selector: 'app-expedientes-updater',
  templateUrl: './expedientes-updater.component.html',
  styleUrls: ['./expedientes-updater.component.scss'],
})
export class ExpedientesUpdaterComponent implements OnInit {
  appService = inject(AppService);
  storage = inject(Storage);
  numeroExpediente: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AppService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numeroExpediente = params['expediente'];

      this.actualizarLista();
    })
  }

  async actualizarLista() {
    const expedientes = await this.appService.expedientesTodos();

    // Convertirlo en un archivo JSON
    let objJson = JSON.stringify(expedientes);
    const blob = new Blob([objJson], { type: 'application/json' });

    const storageRef = ref(this.storage, 'expedientes/expedientes.json');
    uploadBytes(storageRef, blob)
      .then(() => {
        // Navigation and service refresh
        return this.router.navigate(['/expediente/', this.numeroExpediente]);
      })
      .then(() => {
        this.service.getExpedientes();
      })
      .catch(err => {
        console.error(err);
        window.alert('Ocurrió un error al guardar el archivo.');
      });
  }
}
