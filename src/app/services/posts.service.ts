import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
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


  // Upload the image to Firebase Storage and then call the saveData() method to save the data to Firestore.
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


  // The data is not being edited in the same component where it is being displayed...
  // So we need to load the data in the edit component.
  async loadSelectedDoc(postId: string) {
    const docInstance = doc(this.firestore, 'posts', postId);

    try {
      const documentSnapshot = await getDoc(docInstance);

      if (documentSnapshot.exists()) {
        return documentSnapshot;
      } else {
        console.log("Document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error loading document:", error);
      throw error; // Rethrow the error so it can be handled in the calling code.
    }
  }


  // Delete the image from Firebase Storage and the data from Firestore.
  async deleteImage(filePath: string, postId: string) {
    try {
      // Create a reference to the storage location you want to delete
      const storageRef = ref(this.storage, filePath);

      // Delete the object
      await deleteObject(storageRef);
      await this.deleteData(postId);

      console.log(`File ${filePath} successfully deleted.`);
    } catch (error) {
      console.error(`Error deleting file: ${error}`);
    }
  }


  deleteData(postId: string) {
    const docInstance = doc(this.firestore, 'posts', postId);
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }


  markFeatured(postId: string, featuredData: boolean) {
    const docInstance = doc(this.firestore, 'posts', postId);
    this.toastr.info('Feature Status Updated');
    return updateDoc(docInstance, { isFeatured: featuredData });
  }

}
