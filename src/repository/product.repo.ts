import connection from "../config/database.config";
import { IProduct } from "../interface/product.interface";




export class ProductList {
    async findAll(): Promise<IProduct[]> {
        const [products] = await connection.execute(`
            select ProductVariant.variantId, Product.productName, Product.unit, Product.isActive, 
                ProductVariant.sell_price, ProductVariant.variant, ProductVariant.expiry_date, ProductImg.path
            from Product
            inner join ProductVariant 
                on Product.productId = ProductVariant.productId
            inner join ProductImg
                on ProductVariant.variantId = ProductImg.variantId
            ORDER BY ProductVariant.variantId DESC;    
        `)
        return products as IProduct[];
    }
}