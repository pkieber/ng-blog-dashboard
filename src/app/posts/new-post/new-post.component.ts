import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, QueryDocumentSnapshot } from 'rxfire/firestore/interfaces';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-img.jpg';
  selectedImg: any;
  categories: Category[] = [];
  postForm: FormGroup;
  shouldDisable: boolean = true;
  post!: string;

  formStatus: string = 'Add New';

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.pipe(
      switchMap((queryParams: any) => {
        return from(this.postService.loadSelectedDoc(queryParams.id)).pipe(
        );
      })
    ).subscribe((documentSnapshot: QueryDocumentSnapshot<DocumentData> | null) => {
      if (documentSnapshot) {
        const post: Post = documentSnapshot.data() as Post;
        console.log("Selected Post: ", post);
        this.initForm(post);
      } else {
        console.log("Document does not exist.");
      }
    });

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

  // Update permalink in real-time
  onTitleChanged(event: any) {
    const title = event.target.value;
    this.permalink = title.toLowerCase().replace(/\s+/g, '-');

    const permalinkControl = this.postForm.get('permalink');
    if (permalinkControl) {
      permalinkControl.setValue(this.permalink);
    }
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

  onSubmit() {
    // Split the string into an array with two elements (categoryId and category).
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
      id: ''
    }

    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-img.jpg';
  }


  // Initialize the form with post data
  initForm(post: Post) {
    this.postForm.patchValue({
      title: post.title,
      permalink: post.permalink,
      category: post.category.categoryId + '-' + post.category.category,
      excerpt: post.excerpt,
      content: post.content,
    });

    this.imgSrc = post.postImgPath;
    this.formStatus = 'Edit';
  }
}
