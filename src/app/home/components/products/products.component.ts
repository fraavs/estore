import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
 
  constructor(public productsStore: ProductsStoreItem ) { }
}
