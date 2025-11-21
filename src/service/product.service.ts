import { ProductResponse } from "../dto/product.dto";
import { ProductList } from "../repository/product.repo";



const productRepo = new ProductList();

export class ProductListService {
    async getAllProduct(): Promise<ProductResponse[]> {
        const products = await productRepo.findAll();
        return products.map(p => new ProductResponse(p));
    }
}