import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tareo-mensual',
  templateUrl: './tareo-mensual.component.html',
  styleUrl: './tareo-mensual.component.scss'
})
export class TareoMensualComponent {
  usuarios: any[] = [];
  meses = [
    {
      nombre: 'Mayo',
      inicio: '2025-05-01',
      final: '2025-05-31'
    },
    {
      nombre: 'Junio',
      inicio: '2025-06-01',
      final: '2025-06-30'
    },
    {
      nombre: 'Julio',
      inicio: '2025-07-01',
      final: '2025-07-31'
    },
  ];

  fcUsuario: FormControl = new FormControl(null, Validators.required);
  fcMes: FormControl = new FormControl(null, Validators.required);

  cargando: boolean = false;
  rdts: any[] = [];
  tareasRdt: any[] = [];

  constructor(
    private db: AngularFirestore,
  ) {
    this.recuperarUsuarios();
  }

  // Recuperar usuarios 
  recuperarUsuarios() {
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    }).get();
    firstValueFrom(obs).then((snapshot) => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      this.usuarios = items;
    })
  }

  // Recuperar rdts
  async recuperarRdts() {
    this.cargando = true;

    let usuario: string = this.fcUsuario.value;
    let mes: string = this.fcMes.value;
    const inicioMes = mes.split(':')[0];
    const finalMes = mes.split(':')[1];

    console.log(`query: ${inicioMes} hasta ${finalMes} del usuario ${usuario}`);

    let query = this.db.collection('tareo', ref => {
      return ref.where('fecha', '>=', inicioMes)
        .where('fecha', '<=', finalMes)
        .where('idUsuario', '==', usuario)
    }).get();

    let rdts: any[] = await firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        let document: any = doc.data();
        items.push(document)
      });

      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

      items = items.map(i => {
        const [anio, mes, dia] = i.fecha.split('-').map(Number);
        const fechaUTC = new Date(Date.UTC(anio, mes - 1, dia));
        const numeroDia = fechaUTC.getUTCDay();
        const nombreDia = diasSemana[numeroDia];

        return {
          ...i,
          diaSemana: nombreDia
        };
      })

      return items;
    }).catch(err => {
      throw err;
    })

    for (let index = 0; index < rdts.length; index++) {
      const rdt = rdts[index];

      let query = this.db.collection('tareas', ref => {
        return ref.where('idrdt', '==', rdt.idTareo)
      }).get();
  
      let tareitas = await firstValueFrom(query).then(snap => {
        let list: any[] = [];
        snap.forEach(d => {
          list.push(d.data())
        })
  
        return list;
      })

      rdt.tareas = tareitas;
    }

    this.rdts = rdts;

    this.cargando = false;
  }


}
