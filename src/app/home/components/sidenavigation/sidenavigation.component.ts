import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../types/category.type';
import { OnDestroy } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent implements OnDestroy {
  @Output()
  subCategoryClicked: EventEmitter<number> = new EventEmitter<number>();
  categories: Category[] = [];
  subscriptiions: Subscription = new Subscription();


  constructor(categoryStore: CategoriesStoreItem) {
    this.subscriptiions.add(categoryStore.categories$.subscribe((categories) => {
      this.categories = categories;
    })
    );
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(
      (category) => parentCategoryId ? category.parent_category_id === parentCategoryId :
        category.parent_category_id === null
    );
  }

  onSubCategoryClick(subCategory: Category): void {
    this.subCategoryClicked.emit(subCategory.id);
  }
  ngOnDestroy(): void {
    this.subscriptiions.unsubscribe();
  }
}
