import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tareo } from '../_interfaces/tareo';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tareo-supervisor',
  templateUrl: './tareo-supervisor.component.html',
  styleUrl: './tareo-supervisor.component.scss'
})
export class TareoSupervisorComponent {
  tareos: Tareo[] = [];
  usuarios: any[] = [];

  fcFecha: FormControl = new FormControl(null);
  fcUsuario: FormControl = new FormControl(null);

  cargando = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.colocarFechaHoy();
    this.saberQuienSoy();
  }

  // Funciones internas

  colocarFechaHoy() {
    let d = new Date();
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    let s = [year, month, day].join('-');

    this.fcFecha.setValue(s);
  }

  saberQuienSoy() {
    let usuario = localStorage.getItem('idusuario');
    console.log('soy: ', usuario);
    // usuario = 'Maria-Tunquipa';  // Quitar luego
    switch (usuario) {
      case 'Crishtian-Paucar':
        this.usuarios = [
          {
            id: 'Nicole-Cardenas',
            nombre: 'Nicole',
          },
          {
            id: 'Leonardo-Flores',
            nombre: 'Leonardo',
          },
          {
            id: 'wilson-apaza',
            nombre: 'Wilson',
          },
          {
            id: 'Katherine-Gallegos',
            nombre: 'Yuly'
          },
        ];
        break;
      case 'Huander-Montoya':
        this.usuarios = [
          {
            id: 'Paola-Guzman',
            nombre: 'Paola',
          },
          {
            id: 'Yajayra-Portocarrero',
            nombre: 'Yajayra',
          },
          {
            id: 'Alejandra-Chacaltana',
            nombre: 'Gabylu',
          },
          {
            id: 'Shaunny-Fernandez',
            nombre: 'Shaunny',
          },
          {
            id: 'Angelly-Castillo',
            nombre: 'Angelly',
          },
          {
            id: 'Esmeralda-Aslla',
            nombre: 'Esmeralda',
          },
          {
            id: 'Viameli-Ccama',
            nombre: 'Viameli',
          },
          {
            id: 'rccuno',
            nombre: 'Rodrigo',
          },
        ];
        break;
      case 'Maria-Tunquipa':
        this.usuarios = [
          {
            id: 'Maria-Fernanda-Rondon',
            nombre: 'Mafer',
          },
          {
            id: 'Alisson-Guillen',
            nombre: 'Alisson',
          },
          {
            id: 'michael-vilca',
            nombre: 'Michael',
          },
          {
            id: 'azaravia',
            nombre: 'Alejandro',
          }
        ];
        break;
      case 'Miryam-Huamani':
        this.usuarios = [
          {
            id: '	gmoa',
            nombre: 'Gabriella',
          },
          {
            id: 'Jackeline-Huaman',
            nombre: 'Jacky',
          },
          {
            id: 'marco-mamani',
            nombre: 'Marco',
          },
        ];
        break;
    }
  }

  // Acciones de usuario

  async obtenerTareos() {
    this.cargando = true;
    let fecha = this.fcFecha.value;
    let idUsuario = this.fcUsuario.value;
    let tareos = await this.recuperarTareo(fecha, idUsuario);
    this.tareos = tareos;

    this.cargando = false;
  }

  // Operaciones a la base de datos

  recuperarTareo(fecha: string, idUsuario: string): Promise<any[]> {
    const idTareo = `${fecha}-${idUsuario}`;
    const query = this.db.collection('tareo', ref => {
      return ref.where('idTareo', '==', idTareo)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      return items;
    }).catch(err => {
      throw err;
    })
  }
}
