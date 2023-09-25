import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  postForm: FormGroup;
  shouldDisable: boolean = true;


  constructor(private categoriesService: CategoriesService, private formBuilder: FormBuilder ) {
    // Form validation
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [{ value: '', disabled: this.shouldDisable }, Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.loadCategories();
  }


  get formControl() {
    return this.postForm.controls;
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
