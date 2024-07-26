import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order, OrderItem } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user-service.service';


@Injectable()
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userservice: UserService,
  ) { }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string) : Observable<any> {
    const url: string = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach(product => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      street: deliveryAddress.street,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      zipCode: deliveryAddress.zipCode,
      country: deliveryAddress.country,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
      orderDate: new Date(),
    };
    return this.httpClient.post(url, order, {
      headers: { authorization: this.userservice.token },
    });
  }

}
