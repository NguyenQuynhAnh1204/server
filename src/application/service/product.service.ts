import { CategoryRes, ProductDetail, ProductImport, ProductResponse, ProductStock } from "../dto/product.dto";
import { deleteCloudinary } from "../../helper/destroyClound";
import { getPublicId } from "../../helper/fileImg";
import { uploadCloudinary } from "../../helper/uploadCloud";
import { IProductDetail, IProductPayload } from "../../domain/interface/product.interface";
import { ProductList, CategoryRepo  } from "../../infrastructure/repository/product.repo";



const productRepo = new ProductList();
const cateRepo = new CategoryRepo();

export class ProductListService {
    async getAllProduct(): Promise<ProductResponse[]> {
        const products = await productRepo.findAll();
        return products.map(p => new ProductResponse(p));
    }

    async getQuantity(): Promise<number> {
        const products = await productRepo.count();
        return products;
    }

    async getProductById(id: number): Promise<ProductDetail> {
        const product = await productRepo.findId(id);
        return new ProductDetail(product);
    }

    async getProductImport(id: number): Promise<ProductImport> {
        const product = await productRepo.getImport(id);

        return new ProductImport(product);
    }

    async getStock(id: number): Promise<ProductStock> {
        const stock = await productRepo.getStock(id);
        return new ProductStock(stock);
    }

    async updateStock(id: number, stock: number): Promise<void> {
        await productRepo.updateStock(id, stock);
    }

    async updateProduct(id: number, product: IProductDetail, path?: Express.Multer.File): Promise<void> {
        let pathUrl: string | undefined;
        try {
            if(path) {
                pathUrl = await uploadCloudinary(path.buffer, `Product/${product.cateName}`);
                
                let oldPath = await productRepo.getProductPath(id);
                if(oldPath) {
                    oldPath = getPublicId(oldPath);
                    await deleteCloudinary(oldPath);
                }
            }
            await productRepo.updateProduct(id, product, pathUrl);
        }
        catch(e) {
            throw e
        }
    }

    async addProduct(productInf: IProductPayload, path?: Express.Multer.File): Promise<void> {
        let pathUrl: string | undefined;
        try {

            //tìm kiếm cate
            const cateId = await cateRepo.findCate(productInf.cateName);
            // check brand -> nếu chưa có -> tạo 
            let brandId = await cateRepo.findBrand(productInf.brandName);
            if(!brandId) {
                brandId = await cateRepo.createBrand(productInf.brandName);
            }

            const product = {
                ...productInf,
                cateId: cateId,
                brandId: brandId,
            }

            // tạo mới sản phẩm
            const newProductId = await productRepo.addProduct(product.name, product.unit, brandId, cateId);

            // tạo mới variant
            if (path) {
                pathUrl = await uploadCloudinary(path.buffer, `Product/${productInf.cateName}`);
            }
            await productRepo.addProductVariant(newProductId, product, pathUrl);

        }
        catch(e) {
            throw e;
        }
    }

}




export class CategorySerVice {
    async getCategories(): Promise<CategoryRes[]> {
        try {
            const cate = await cateRepo.getAllCate();
            return cate.map(c => new CategoryRes(c));
        }
        catch(e) {
            throw e
        }
    }
}