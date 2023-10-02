import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(
    private firestore: Firestore,
    private toastr: ToastrService,
  ) { }


  loadSubscribers() {
    const dbInstance = collection(this.firestore, 'subscribers');
    return collectionData(dbInstance, { idField: 'id' });
  }


  deleteSubscribers(subscriberId: string) {
    const docInstance = doc(this.firestore, 'subscribers', subscriberId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }

}
