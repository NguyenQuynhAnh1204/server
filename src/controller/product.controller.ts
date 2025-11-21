import { Request, Response } from "express";
import { ProductListService } from "../service/product.service";

const productService = new ProductListService();


export class ProductController {
    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getAllProduct();

            res.status(200).send({
                success: true,
                products
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