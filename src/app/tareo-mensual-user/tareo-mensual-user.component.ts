import { Component, inject, OnInit } from '@angular/core';
import { Tareo } from '../_interfaces/tareo';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tareo-mensual-user',
  templateUrl: './tareo-mensual-user.component.html',
  styleUrl: './tareo-mensual-user.component.scss',
  imports: [
    RouterLink
  ]
})
export class TareoMensualUserComponent implements OnInit {
  appService = inject(AppService);
  nick: string = 'null';
  tareos: Tareo[] = [];

  cargando = false;

  constructor() { }

  ngOnInit(): void {
    let nick: any = localStorage.getItem('nick');
    this.nick = nick;
    // console.log('User nick:', nick)
    this.obtenerTareos();
  }

  // acciones automaticas

  async obtenerTareos() {
    this.cargando = true;

    let idUsuario = this.nick;
    const tareos = await this.appService.tareosPorUsuario(idUsuario, 6);
    this.tareos = tareos;

    this.cargando = false;
  }
}
