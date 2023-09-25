import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private firestore: Firestore, private toastr: ToastrService) {}


  addCategory (data: object) {
    const dbInstance = collection(this.firestore, 'categories');
    this.toastr.success('Data Added Successfully');
    return addDoc(dbInstance, data);
  }


  loadCategories() {
    const dbInstance = collection(this.firestore, 'categories');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateCategories(categoryId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'categories', categoryId);
    this.toastr.success('Data Updated Successfully');
    return updateDoc(docInstance, data);
  }


  deleteCategories(categoryId: string) {
    const docInstance = doc(this.firestore, 'categories', categoryId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }

}
