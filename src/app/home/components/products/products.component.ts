import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './products.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(productService: ProductsService) {
    productService.getAllProducts().subscribe((products) => (this.products = products));
  }
}
