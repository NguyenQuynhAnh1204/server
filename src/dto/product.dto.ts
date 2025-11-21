import { coverImg } from "../helper/fileImg";


export class ProductResponse {
    id: number;
    name: string;
    path: string;
    unit: string;
    price: number;
    variant: string;
    expiry_date: Date;
    status: number;
    constructor(product: any) {
        this.id = product.variantId;
        this.name = product.productName;
        this.path = coverImg(product.path);
        this.unit = product.unit;
        this.price = product.sell_price;
        this.variant = product.variant;
        this.expiry_date = product.expiry_date;
        this.status = product.isActive;
    }
}