import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  storage = getStorage();

  constructor(private firestore: Firestore, private toastr: ToastrService) {}


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
      const dbInstance = collection(this.firestore, 'posts');
      this.toastr.success('Data Added Successfully');
      return addDoc(dbInstance, postData);
  }
}
