import { Request, Response } from "express";
import { ProductListService } from "../service/product.service";

const productService = new ProductListService();


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
}