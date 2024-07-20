import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private ProductsStoreItem: ProductsStoreItem) {
    this.categoriesStoreItem.loadCategories();
    this.ProductsStoreItem.loadProducts();
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.ProductsStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
