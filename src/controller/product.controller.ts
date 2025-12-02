import { Request, Response } from "express";
import { CategorySerVice, ProductListService } from "../service/product.service";
import { IProductDetail } from "../interface/product.interface";

const productService = new ProductListService();
const cateService = new CategorySerVice();

export class ProductController {
    async getProducts(req: Request, res: Response): Promise<void> {
        const q = req.query.q as string | undefined;
        
        try {
            const allProducts = await productService.getAllProduct();

            if (q) {
                const keyword = q.toLowerCase();

                const products = allProducts.filter(pro =>
                    pro.name.toLowerCase().includes(keyword)
                );
                res.status(200).send({
                    success: true,
                    products: products 
                });
                return;
            }
            
            res.status(200).send({
                success: true,
                products: allProducts
            })
            
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    } 

    async getCount(req: Request, res: Response): Promise<void> {
        try{
            const count = await productService.getQuantity();
            res.status(200).send({
                success: true,
                count
            })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async getProductId(req: Request, res: Response): Promise<void> {
        try {
            const productId = Number(req.params.productId);

            const product = await productService.getProductById(productId);

            res.status(200).json({
                success: true,
                product
            })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async getProductImport(req: Request, res: Response): Promise<void> {
        try {

            const productId = Number(req.params.productId);

            const productImport = await productService.getProductImport(productId);

            res.status(200).json({
                success: true,
                productImport
            })
        }
        catch (e) {
             res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }


    async getStock(req: Request, res: Response) : Promise<void> {
        try {

            const productId = Number(req.params.productId);
            const stock = await productService.getStock(productId);
            res.status(200).json({
                success: true,
                stock
            })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async updateStock(req: Request, res:Response): Promise<void> {
        try {
            const productId = Number(req.params.productId);
            const stock = Number(req.body.stockProduct.stock);

            await productService.updateStock(productId, stock);
            res.status(200).json({
                success: true,
            })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async updateInfo(req: Request, res:Response) : Promise<void> {
        try {
            const productId = Number(req.params.productId);
            const productInf = req.body as IProductDetail;
            const path = req.file as Express.Multer.File;
            await productService.updateProduct(productId, productInf, path);
            res.status(200).json({
                success: true,
                message: "Update success",
            })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async addNew(req: Request, res:Response) : Promise<void> {
        try {

            const productInf = req.body;
            const path = req.file as Express.Multer.File;

            await productService.addProduct(productInf, path);
            
            res.status(200).json({
                success: true,
                message: "Update success",
                })
        }
        catch (e) {
            res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }
}



export class CateController {
    async getCate(req: Request, res: Response): Promise<void> {
        try {
            const cateList = await cateService.getCategories();
            res.status(200).json({
                success: true,
                cateList
            })
        }
        catch (e) {
             res.status(500).send({
                success: false,
                message: "Server error",
                e
            })
        }
    }
}