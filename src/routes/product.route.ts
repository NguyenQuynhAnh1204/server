import { Router } from "express";
import { ProductController } from "../controller/product.controller";


const route = Router();

const productController = new ProductController();

route.get("/", productController.getProducts);


route.get("/count", productController.getCount);


export default route;



