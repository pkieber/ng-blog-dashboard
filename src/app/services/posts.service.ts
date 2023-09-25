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
      console.log(filePath);

      // Create a reference to the storage location
      const storageRef = ref(this.storage, filePath);

      // Upload the selected image file to the storage location
      await uploadBytes(storageRef, selectedImage);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Assign the download URL to postData.postImgPath
      postData.postImgPath = downloadURL;

      const dbInstance = collection(this.firestore, 'posts');
      this.toastr.success('Data Added Successfully');
      return addDoc(dbInstance, postData);
    }
}
