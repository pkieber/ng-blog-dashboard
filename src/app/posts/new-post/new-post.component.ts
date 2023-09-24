import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  permalink: string = ''; // for two-way-binding you need a global variable.
  imgSrc: any = './assets/placeholder-img.jpg';
  selectedImg: any;


  // Show Permalink once user starts typing
  onTitleChanged(event: any)  {
    const title = event.target.value;
    this.permalink = title.toLowerCase().replace(/\s+/g, '-');
  }


  // Show Image Preview
  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL(event.target.files[0]);

    // Assign image-selection to a global variable
    this.selectedImg = event.target.files[0];
  }

}
