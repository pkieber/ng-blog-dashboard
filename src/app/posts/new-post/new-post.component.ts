import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit{
  permalink: string = ''; // for two-way-binding you need a global variable.
  imgSrc: any = './assets/placeholder-img.jpg';
  selectedImg: any;

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}


  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories() {
    this.categoriesService.loadCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }


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

    // API to read the data of a selected file as a data URL
    reader.readAsDataURL(event.target.files[0]);

    // Assign image-selection to a global variable
    this.selectedImg = event.target.files[0];
  }

}
