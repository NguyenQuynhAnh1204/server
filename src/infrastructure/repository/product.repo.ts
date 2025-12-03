import connection from "../config/database.config";
import { ICate, IProduct, IProductDetail, IProductImport, IProductPayload, IProductStock } from "../../domain/interface/product.interface";




export class ProductList {
    async findAll(): Promise<IProduct[]> {
        const [products] = await connection.execute(`
            select ProductVariant.variantId, Product.productName, Product.unit, ProductVariant.isActive, 
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


    async findId(productId: number) : Promise<IProductDetail> {

        const sql = `
            select ProductVariant.variantId, Product.productName, Category.cateName, Brand.brandName, Product.unit,
                    ProductVariant.variant, ProductVariant.barcode, ProductVariant.sell_price, 
                    ProductVariant.expiry_date, ProductImg.path
            from Product
            inner join Category 
                on Product.cateId = Category.cateId
            inner join Brand
                on Brand.brandId = Product.brandId
            inner join ProductVariant 
                on Product.productId = ProductVariant.productId
            inner join ProductImg 
                on ProductImg.variantId = ProductVariant.variantId
            where ProductVariant.variantId = ?;
        `

        const [product] = await  connection.execute<any[]>(sql, [productId]);     
        return product[0] as IProductDetail;
    }

    async count(): Promise<number> {
        const [count] = await connection.execute<any[]>("select count(*) as total from Product");
        return  count[0].total;
    }

    async getImport(variantId: number): Promise<IProductImport> {
        const sql = `
            select ImportOrderDetail.importOrderDetailID, ImportOrder.totalAmount, ImportOrder.created_at,
                Supplier.supName, Supplier.supPhone ,ImportOrderDetail.quantity, ImportOrderDetail.cost_price
            from ImportOrder
            inner join ImportOrderDetail
                on ImportOrder.importOrderId = ImportOrderDetail.importOrderId
            inner join Supplier
                on Supplier.supId = ImportOrder.supId
            where variantId = ?;
        `

        const [importRow] = await connection.execute<any>(sql, [variantId]);

        return importRow[0] as IProductImport;
    }

    async getStock(variantId: number): Promise<IProductStock | null> {
        const [stock] = await connection.execute<any>("select quantity, cost_price, stock from ImportOrderDetail where variantId = ?;", [variantId]);
        return stock[0] as IProductStock | null;
    }

    async updateStock(variantId: number, stock: number) : Promise<void> {
        try {
            await connection.execute("update ImportOrderDetail set stock = ? where variantId = ?", [stock, variantId]);
        }
        catch (e) {
            throw e
        }
    }

    async updateProduct(variantId: number, product: IProductDetail, path?: string) : Promise<void> {
        try {
            await connection.execute(`
                update Product 
                join ProductVariant
                    on Product.productId = ProductVariant.productId
                join ProductImg
                    on ProductVariant.variantId = ProductImg.variantId
                set Product.productName = ?,  ProductVariant.barcode = ?, ProductVariant.sell_price = ?, ProductVariant.expiry_date = ?, ProductImg.path = COALESCE(?, ProductImg.path)
                where ProductVariant.variantId = ?
            `, [product.name, product.barcode, product.price, product.expiry_date, path,variantId])
        }
        catch (e) {
            throw e
        }
    }

    async getProductPath(variantId: number): Promise<string> {
        try {
            const [path] = await connection.execute<any>(`select path from ProductImg where variantId = ?`, [variantId]);
            return path[0].path as string;
        }
        catch (e) {
            throw e
        }
    }

    async addProduct(productName: string, unit: string,  brandId: number,cateId?: number): Promise<number> {
        try {
            const [newPro] = await connection.execute<any>("insert into Product(productName, unit, cateId, brandId) values(?, ?, ?, ?)", [productName, unit, cateId, brandId]);
            return newPro.insertId;
        }
        catch (e) {
            throw e
        }
    }

    async addProductVariant(productId: number, product: IProductPayload, path?: string): Promise<void> {
        try {
            const [newVar] = await connection.execute<any>("insert into ProductVariant(productId, barcode, sell_price, expiry_date, variant, isActive) values (?, ?, ?, ?, ?, 0)", [productId, product.barcode, product.price, product.expiry_date, product.variant]);
            const variantId = newVar.insertId;
            if (path) {
                await connection.execute<any>("insert into ProductImg(variantId, path) values(?, ?)", [variantId, path]);
            } 
        }
        catch (e) {
            throw e
        }
    }
}

export class CategoryRepo {
    async getAllCate(): Promise<ICate[]> {
        try {
            const [cates] = await connection.execute<any>("select cateId, cateName from Category");
            return cates as ICate[];
        }
        catch (e) {
            throw e
        }
    }

    async findCate(cateName: string): Promise<number | undefined> {
        try {
            const [cates] = await connection.execute<any>("select cateId, cateName from Category where cateName = ?", [cateName]);
            if (cates.length === 0) {
                return undefined; 
            }

            return cates[0].cateId;
            }
        catch (e) {
            throw e
        }
    }

    async findBrand(brand: string): Promise<number | undefined> {
        try {
            const [brands] = await connection.execute<any>("select brandId, brandName from Brand where brandName = ?", [brand]);
            if (brands.length === 0) {
                return undefined; 
            }

            return brands[0].brandId;
            }
        catch (e) {
            throw e
        }
    }

    async createBrand(brandName: string): Promise<number> {
        try {
            const [result]: any = await connection.execute<any>("insert into Brand(brandName) values(?)",[brandName])
            return result.insertId;
        }
        catch (e) {
            throw e
        }
    }
}
