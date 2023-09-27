import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, doc, addDoc, collectionData, getDoc, updateDoc, deleteDoc, DocumentSnapshot,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  storage = getStorage(); // Create a storage reference from our storage service

  constructor(
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router,
  ) {}


  // In order to upload the image to Firebase Storage, we need to create a reference to the storage location with a unique file path.
  async uploadImage(selectedImage: File, postData: any, formStatus: string, postId: string) {
      const filePath = `postIMG/${Date.now()}`;

      // Create a reference to the storage location + upload the file
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, selectedImage);

      // Get the download URL of the uploaded image + assign it to the postImgPath property
      const downloadURL = await getDownloadURL(storageRef);
      postData.postImgPath = downloadURL;

      if(formStatus === 'Edit') {
        this.updatePost(postId, postData);
      } else {
        this.saveData(postData);
      }
  }


  // Called after data and image are uploaded or edited.
  saveData(data: object) {
    const dbInstance = collection(this.firestore, 'posts');
    this.toastr.success('Data Added Successfully');
    this.router.navigate(['/posts']);
    return addDoc(dbInstance, data);
  }


  loadPosts() {
    const dbInstance = collection(this.firestore, 'posts');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updatePost(postId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'posts', postId);
    this.toastr.success('Data Updated Successfully');
    return updateDoc(docInstance, data);
  }


  deletePost(postId: string) {
    const docInstance = doc(this.firestore, 'posts', postId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }


  // The data is not being edited in the same component where it is being displayed...
  // So we need to load the data in the edit component.
  loadSelectedDoc(postId: string) {
    const docInstance = doc(this.firestore, 'posts', postId);
    return getDoc(docInstance).then((documentSnapshot: DocumentSnapshot) => {
      if (documentSnapshot.exists()) {
        return documentSnapshot;
      } else {
        console.log("Document does not exist.");
        return null;
      }
    });
  }

}
