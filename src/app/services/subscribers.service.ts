import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

}
