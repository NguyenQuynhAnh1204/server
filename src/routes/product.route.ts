import { Router } from "express";
import { ProductController } from "../controller/product.controller";


const route = Router();

const productController = new ProductController();

route.get("/", (req, res) => productController.getProducts(req, res))


export default route;



