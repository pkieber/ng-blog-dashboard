import { Component } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {

  category!: string;

  constructor(private firestore: Firestore) {}


  // Add document on submit.
  onSubmit(category: any) {
    const dbInstance = collection(this.firestore, 'categories');
    return addDoc(dbInstance, category);
  }


}
