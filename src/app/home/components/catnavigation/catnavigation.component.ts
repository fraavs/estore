import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/categories.storeItem';


@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrls: ['./catnavigation.component.css']
})
export class CatnavigationComponent {

  constructor(public categoryStore: CategoriesStoreItem) {
    
  }

}
