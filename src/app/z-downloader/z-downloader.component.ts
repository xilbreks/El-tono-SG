import { Component, inject } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-z-downloader',
  templateUrl: './z-downloader.component.html',
  styleUrl: './z-downloader.component.scss',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
  ]
})
export class ZDownloaderComponent {
  db = inject(Firestore)

  lLoading: boolean = false;
  frmData: FormGroup;

  constructor() {
    this.frmData = new FormGroup({
      inicio: new FormControl(null, Validators.required),
      final: new FormControl(null, Validators.required),
    });
  }

  async downloadBackUpTareas() {
    this.lLoading = true;

    let inicio = this.frmData.controls['inicio'].value;
    let final = this.frmData.controls['final'].value;

    const collectionRef = collection(this.db, 'tareas');
    const q = query(collectionRef,
      where('fechaTarea', '>=', inicio),
      where('fechaTarea', '<=', final),
    );

    const querySnapshot = await getDocs(q);

    const tareas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Convert JSON to string
    const data = JSON.stringify(tareas);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'tareas desde ' + inicio + ' hasta ' + final + '.json';
    link.href = url;
    link.click();

    this.lLoading = false;
  }

  // backUpExpedientes() {
  //   let obs = this.db.collection('expedientes')
  //     .valueChanges()
  //     .subscribe(res => {
  //       // Convert JSON to string
  //       const data = JSON.stringify(res);

  //       // Create a Blob object
  //       const blob = new Blob([data], { type: 'application/json' });

  //       // Create an object URL
  //       const url = URL.createObjectURL(blob);

  //       // Download file
  //       let link = document.createElement('a');
  //       link.download = 'expedientes.json';
  //       link.href = url;
  //       link.click();

  //       // Release the object URL
  //       URL.revokeObjectURL(url);

  //       obs.unsubscribe();
  //     });
  // }


  async backUpUsuarios() {
    const usuariosRef = collection(this.db, 'usuarios');

    const q = query(usuariosRef,
      where('esActivo', '==', true),
    );

    const querySnapshot = await getDocs(q);

    const usuarios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Convert JSON to string
    const data = JSON.stringify(usuarios);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'usuarios.json';
    link.href = url;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);

  }

  async backUpCuotas() {
    const cuotasRef = collection(this.db, 'cuotas');

    const q = query(cuotasRef);

    const querySnapshot = await getDocs(q);

    const cuotas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Convert JSON to string
    const data = JSON.stringify(cuotas);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'cuotas.json';
    link.href = url;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);

  }

  async backUpAbonos() {
    const abonosRef = collection(this.db, 'abonos');

    const q = query(abonosRef);

    const querySnapshot = await getDocs(q);

    const abonos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Convert JSON to string
    const data = JSON.stringify(abonos);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'abonos.json';
    link.href = url;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  }

  // backUpRDTs() {
  //   let obs = this.db.collection('rdts')
  //     .valueChanges()
  //     .subscribe(res => {
  //       // Convert JSON to string
  //       const data = JSON.stringify(res);

  //       // Create a Blob object
  //       const blob = new Blob([data], { type: 'application/json' });

  //       // Create an object URL
  //       const url = URL.createObjectURL(blob);

  //       // Download file
  //       let link = document.createElement('a');
  //       link.download = 'rdts.json';
  //       link.href = url;
  //       link.click();

  //       // Release the object URL
  //       URL.revokeObjectURL(url);

  //       obs.unsubscribe();
  //     });
  // }


  async backupChangelog() {
    const changelogRef = collection(this.db, 'changelog');

    const q = query(changelogRef);

    const querySnapshot = await getDocs(q);

    const lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Convert JSON to string
    const data = JSON.stringify(lista);

    // Create a Blob object
    const blob = new Blob([data], { type: 'application/json' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Download file
    let link = document.createElement('a');
    link.download = 'changelog.json';
    link.href = url;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  }
}
