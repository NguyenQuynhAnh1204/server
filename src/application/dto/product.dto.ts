import { coverImg } from "../../helper/fileImg";


export class ProductResponse {
    id?: number;
    name: string;
    path?: string;
    unit: string;
    price?: number;
    variant: string;
    expiry_date: Date;
    status?: number;
    constructor(product: any) {
        this.id = product.variantId;
        this.name = product.productName;
        this.path = coverImg(product.path);
        this.unit = product.unit;
        this.price = Number(product.sell_price);
        this.variant = product.variant;
        this.expiry_date = product.expiry_date;
        this.status = product.isActive;
    }
}


export class ProductDetail extends ProductResponse {
    cateName: string;
    brandName: string;
    barcode: string;
    constructor(product: any) {
        super(product);

        this.barcode = product.barcode;
        this.cateName = product.cateName;
        this.brandName = product.brandName;
    }
}

export class ProductImport {
    id: number;
    supName: string;
    supPhone: string;
    totalAmount: number;
    create_date: Date;
    quantity: number;
    cost: number;
    constructor(data: any) {
        this.id = data.id;
        this.supName = data.supName;
        this.supPhone = data.supPhone;
        this.totalAmount = Number(data.totalAmount);
        this.create_date = data.createDate;
        this.quantity = data.quantity;
        this.cost = Number(data.cost_price);
    }
}


export class ProductStock {
    quantity: number;
    cost: number;
    stock: number;
    constructor(stock: any) {
        this.cost = Number(stock.cost_price);
        this.stock = Number(stock.stock);
        this.quantity = stock.quantity;
    }
}



export class CategoryRes {
    id: number;
    name: string;

    constructor(data: any) {
        this.id= data.cateId;
        this.name = data.cateName;
    }
}
