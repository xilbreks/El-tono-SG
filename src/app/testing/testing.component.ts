import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  DocumentData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TestingComponent implements OnInit {
  private firestore = inject(Firestore);

  items: DocumentData[] = [];
  loading: boolean = true;

  async ngOnInit() {
    await this.obtenerDatos();
  }

  async obtenerDatos() {
    try {
      // Referencia a la colección y construcción del Query
      const colRef = collection(this.firestore, 'colaboradores');
      const q = query(colRef, where('lactive', '==', true));

      // Obtención del snapshot (promesa, no observable)
      const querySnapshot = await getDocs(q);

      // Mapeo de datos a nuestro array local
      this.items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error obteniendo documentos: ", error);
    } finally {
      this.loading = false;
    }
  }

}
