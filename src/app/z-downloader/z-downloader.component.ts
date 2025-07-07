import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-z-downloader',
  templateUrl: './z-downloader.component.html',
  styleUrl: './z-downloader.component.scss'
})
export class ZDownloaderComponent {
  lLoading: boolean = false;
  frmData: FormGroup;

  constructor(
    private db: AngularFirestore,
  ) {
    this.frmData = new FormGroup({
      inicio: new FormControl(null, Validators.required),
      final: new FormControl(null, Validators.required),
    });
  }

  downloadBackUpTareas() {
    this.lLoading = true;
    let inicio = this.frmData.controls['inicio'].value;
    let final = this.frmData.controls['final'].value;
    let obs = this.db.collection('tareas', ref => {
      return ref
        .where('sfecha', '>=', inicio)
        .where('sfecha', '<=', final)
    })
      .valueChanges()
      .subscribe((res: any) => {
        obs.unsubscribe();
        this.lLoading = false;

        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'tareas desde ' + inicio + ' hasta ' + final + '.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);
      });
  }

  backUpExpedientes() {
    let obs = this.db.collection('expedientes')
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'expedientes.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpChats() {
    let obs = this.db.collection('chats', ref => {
      return ref.where('lactive', '==', true);
    })
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'chats.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpColaboradores() {
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    })
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'colaboradores.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpCuotas() {
    let query = this.db.collection('cuotas').get();

    firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });

      // Convert JSON to string
      const data = JSON.stringify(items);

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

    })
  }

  backUpAbonos() {
    let query = this.db.collection('abonos').get();

    firstValueFrom(query).then(snapshot => {
      let items: any[] = [];

      snapshot.forEach(doc => {
        items.push(doc.data())
      });

      // Convert JSON to string
        const data = JSON.stringify(items);

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
    })
  }

  backUpMaterias() {
    let obs = this.db.collection('materias')
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'materias.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpRDTs() {
    let obs = this.db.collection('rdts')
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'rdts.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpTareas() {
    let obs = this.db.collection('tareas', ref => {
      return ref.where('lactive', '==', true);
    })
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'tareas.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpTareasG() {
    let obs = this.db.collection('tareasg', ref => {
      return ref.where('lactive', '==', true);
    })
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'tareasg.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }

  backUpVersionado() {
    let obs = this.db.collection('versionado', ref => {
      return ref.where('lactive', '==', true);
    })
      .valueChanges()
      .subscribe(res => {
        // Convert JSON to string
        const data = JSON.stringify(res);

        // Create a Blob object
        const blob = new Blob([data], { type: 'application/json' });

        // Create an object URL
        const url = URL.createObjectURL(blob);

        // Download file
        let link = document.createElement('a');
        link.download = 'versionado.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);

        obs.unsubscribe();
      });
  }
}
