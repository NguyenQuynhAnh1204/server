
export interface IProduct {
    id?: number;
    name: string;
    path?: string;
    unit: string;
    price: string;
    variant: string;
    expiry_date: Date;
    status?: number;
}



export interface IProductDetail extends IProduct {
    cateName: string;
    brandName: string;
    barcode: string;
} 

export interface IProductImport {
    id: number;
    variantId: number;
    supName: string;
    supPhone: string;
    totalAmount: number;
    create_date: Date;
    quantity: number;
    cost: string;
}

export interface IProductStock {
    quantity: number;
    cost: string;
    stock: number;
}

export interface IProductPayload {
    name: string;
    barcode: string;
    cateName: string;
    cateId?: number;
    unit: string;
    brandName: string;
    brandId: number;
    variant: string;
    price?: number;
    expiry_date?: Date;
}


// cate
export interface ICate {
    id: number;
    name: string;
}