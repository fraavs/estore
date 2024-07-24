import { StoreItem } from "src/app/shared/storeItem";
import { Cart, CartItem } from "../../types/cart.type";
import { Product } from "../../types/products.type";
import { Observable } from "rxjs";

export class CartStoreItem extends StoreItem<Cart> {
    constructor() {
        super({
            products: [],
            totalAmount: 0,
            totalProducts: 0,
        });
    }

    get cart$(): Observable<Cart> {
        return this.value$;
    }

    get cart(): Cart {
        return this.value;
    }

    addProduct(product: Product): void {
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (cartProduct) => cartProduct.product.id === product.id
        );

        if (!cartProduct) {
            this.cart.products = [
                ...this.cart.products,
                {
                    product: product,
                    amount: Number(product.price),
                    quantity: 1,
                }
            ];
        } else {
            cartProduct.quantity++;
            cartProduct.amount += Number(product.price);
        }
        this.cart.totalAmount += Number(product.price);
        ++this.cart.totalProducts;

    }

    removeProduct(cartItem: CartItem): void {
        this.cart.products = this.cart.products.filter(
            (item) => item.product.id !== cartItem.product.id
        );
        this.cart.totalProducts -= cartItem.quantity;
        this.cart.totalAmount -= cartItem.amount;
    }

    decreaseProductQuantity(cartItem: CartItem): void {
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (cartProduct) => cartProduct.product.id === cartItem.product.id
        );

        if (cartProduct) {
            if (cartProduct.quantity === 1) {
                this.removeProduct(cartItem);
            } else {
                cartProduct.quantity--;
                this.cart.totalAmount -= Number(cartItem.product.price);
                --this.cart.totalProducts;
            }
        }
    }


}