import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    };

    this.subscriptions.add(
      userService.loggedInUser$.subscribe(loggedUser => {
        if (loggedUser.firstName) {
          this.user = loggedUser;
        }
      })
    );
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
    })
  }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
