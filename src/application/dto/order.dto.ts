

export class OrderDTO {
    orderCode: string;
    employId: number;
    totalAmount: number;
    method: string

    constructor(order: OrderDTO) {
        this.orderCode = order.orderCode;
        this.employId = order.employId;
        this.totalAmount = order.totalAmount;
        this.method = order.method;
    }
}


export class OrderDetailDTO {
    orderId?: number;
    variantId: number;
    quantity: number;
    price: number;
    total: number;

    constructor(order: OrderDetailDTO) {
        this.orderId = order.orderId;
        this.variantId = order.variantId;
        this.quantity = order.quantity;
        this.price = order.price;
        this.total = order.total;
    }
}