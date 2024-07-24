import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription();


  constructor(
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product[0];
      })
    );
  }

  addToCart() {
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
