import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartItem, DeliveryAddress } from '../../types/cart.type';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
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
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        street: this.orderForm.get('street')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        zipCode: this.orderForm.get('zipCode')?.value,
        country: this.orderForm.get('country')?.value
      };
      this.subscriptions.add(
        this.orderService
          .saveOrder(deliveryAddress, this.user.email)
          .subscribe({
            next: result => {
              this.cartStore.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order registered successfully!';
              this.disableCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              if (error.error.message === 'Authentication failed') {
                this.alertMessage = 'Please log in to register your order.';
              } else {
                this.alertMessage = error.error.message;
              }
            }
          })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
