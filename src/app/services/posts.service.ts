import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  storage = getStorage();

  constructor() {}

  async uploadImage(selectedImage: File) {
    try {
      // Generate a unique file path based on the current timestamp
      const filePath = `postIMG/${Date.now()}_${selectedImage.name}`;
      console.log(filePath);

      // Create a reference to the storage location
      const storageRef = ref(this.storage, filePath);

      // Upload the selected image file to the storage location
      await uploadBytes(storageRef, selectedImage);

      // Once the upload is complete, you can return the file path or perform other actions
      return filePath;
    } catch (error) {
      // Handle any errors that may occur during the upload
      console.error('Error uploading image:', error);
      throw error; // You can choose to handle or propagate the error as needed
    }
  }
}
