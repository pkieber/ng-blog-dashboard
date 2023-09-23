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
  categoryName!: string;
  categoryId!: string;

  // Change button text dynamically
  formStatus: string = 'ADD';


  constructor(private categoryService: CategoriesService) {
    this.loadCategories();
  }


  resetForm() {
    this.categoryName = '';
    this.formStatus = 'ADD';
  }


  onSubmit(values: object) {
    if (this.formStatus == "ADD") {
      this.categoryService.addCategory(values);
      this.categoryName = '';
    } else if (this.formStatus == "EDIT") {
        this.categoryService.updateCategories(this.categoryId, values);
        this.resetForm();
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
    this.categoryService.deleteCategories(categoryId);
    this.resetForm();
  }
}
