import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {

  allCategories!: Observable<Array<any>>

  categoryId!: string;
  categoryName!: string;

  formState: string = 'Add New';
  isSuccess: boolean = false;
  successMessage!: string;



  constructor(private categoryService: CategoriesService) {
    this.loadCategories();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.categoryName = '';
    this.formState = 'Add new';
  }


  // Add document on submit.
  onSubmit(values: any) {
    if (this.formState == "Add New") {
      this.categoryService.addCategory(values)
      .then(()=> {
        this.showAlert('Data Saved Successfully');
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    }

    else if (this.formState == "Edit") {
      this.categoryService.updateCategorie(this.categoryId, values)
        .then(()=> {
          this.showAlert('Data Edited Successfully');
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
        })
      }
    }


  loadCategories() {
    this.allCategories = this.categoryService.loadCategories();
    console.log(this.allCategories);
  }


  editCategory(categoryId: string, categoryName: string) {
    // Assign data variable to global variables.
    this.categoryId = categoryId;
    this.categoryName = categoryName;


    this.formState = 'Edit';
  }


  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategories(this.categoryId)
    .then(()=> {
      this.showAlert('Data Deleted Successfully');
    })
    .catch(err => {
      console.log(err);
    })
  }



}
