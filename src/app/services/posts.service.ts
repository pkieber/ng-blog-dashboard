import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, doc, addDoc, collectionData, getDoc, updateDoc, deleteDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  storage = getStorage();

  constructor(
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router,
  ) {}


  async uploadImage(selectedImage: File, postData: any) {
      // Generate a unique file path based on the current timestamp
      const filePath = `postIMG/${Date.now()}`;

      // Create a reference to the storage location + upload the file
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, selectedImage);

      // Get the download URL of the uploaded image + assign it to the postImgPath property
      const downloadURL = await getDownloadURL(storageRef);
      postData.postImgPath = downloadURL;

      // Call the addPost() method to save the post data to Firestore + show a success message
      this.addPosts(postData);
  }


  addPosts(data: object) {
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
    const docInstance = doc(this.firestore, `posts/${postId}`, postId);
    /*const docInstance = doc(this.firestore, 'posts', postId);*/
    this.toastr.success('Data Updated Successfully');
    return updateDoc(docInstance, data);
  }


  deletePost(postId: string) {
    const docInstance = doc(this.firestore, `posts/${postId}`, postId);
    /*const docInstance = doc(this.firestore, 'posts', postId);*/
    this.toastr.success('Data Deleted Successfully');
    return deleteDoc(docInstance);
  }


  //
  getPostById(postId: string)  {
    const docInstance = doc(this.firestore, `posts/${postId}`, postId);
    console.log("Get Post by ID: ", docInstance)
    return getDoc(docInstance);
  }
}
