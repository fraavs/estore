export interface OrderItem {
    productId: number;
    qty: number;
    price: number;
    amount: number;
}

export interface Order {
    userName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    total: number;
    orderDetails: OrderItem[];
    orderDate: Date;
    userEmail: string;
}