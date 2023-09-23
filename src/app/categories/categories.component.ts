import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {

  categoryList!: Observable<Array<any>>
  formCategory!: string; // form data binding

/* 04:38 */

  categoryId!: string;

  formStatus: string = 'ADD'; // Dynamic button text
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
    this.formCategory = '';
    this.formStatus = 'ADD';
  }


  // Add document on submit.
  onSubmit(values: any) {
    this.categoryService.addCategory(values)
      .then(()=> {
        this.showAlert('Data Saved Successfully');
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
    })
  }


  loadCategories() {
    this.categoryList = this.categoryService.loadCategories();
  }


  onEdit(category: string) {
    // Assign data variable to global variables.
    this.formCategory = category;
    this.formStatus = 'EDIT'; // dynamic button text
  }


  onDelete(categoryId: string) {
    this.categoryService.deleteCategories(this.categoryId)
    .then(()=> {
      this.showAlert('Data Deleted Successfully');
    })
    .catch(err => {
      console.log(err);
    })
  }

}
