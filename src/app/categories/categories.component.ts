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

  categoryName!: string;
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


onSubmit(values: object) {

  if (this.formStatus == "ADD") {
    this.categoryService.addCategory(values)
      .then(()=> {
        this.showAlert('Data Saved Successfully.');
      })
      .catch(err => {
        console.log(err);
      })
    }

    else if (this.formStatus == "EDIT") {
      this.categoryService.updateCategories(this.categoryId, values )
      .then(()=> {
        this.showAlert('Data Edited Successfully.');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }


  loadCategories() {
    this.categoryList = this.categoryService.loadCategories();
}


onEdit(categoryName: string, categoryId: string) {
  this.categoryName = categoryName;
  this.categoryId = categoryId;
  this.formStatus = 'EDIT';
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
