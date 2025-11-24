

export interface IOrder {
    orderCode: string;
    employId: number;
    totalAmount: number;
    method: string
}

export interface IOrderDetail {
    orderId: number;
    variantId: number;
    quantity: number;
    price: number;
    total: number;
}
