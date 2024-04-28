import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
        link.download = 'tareas desde ' + inicio + ' hasta ' + final  +'.json';
        link.href = url;
        link.click();

        // Release the object URL
        URL.revokeObjectURL(url);        
      });
  }
}
