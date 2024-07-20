import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/categories.storeItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public categoryStore: CategoriesStoreItem) {
  }
}
