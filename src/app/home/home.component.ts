import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/categories.storeItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private categoriesStoreItem: CategoriesStoreItem) {
    this.categoriesStoreItem.loadCategories();
  }
}
