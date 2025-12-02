import { Router } from "express";
import { CateController, ProductController } from "../controller/product.controller";

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const route = Router();

const productController = new ProductController();
const cateController = new CateController();

route.get("/count", productController.getCount);
route.get("/:productId", productController.getProductId);
route.get("/stock/:productId", productController.getStock);
route.post("/updateInf/:productId", upload.single("path"), productController.updateInfo);
route.post("/updateStock/:productId", productController.updateStock);
route.post("/add", upload.single("path"), productController.addNew);
route.get("/cate", cateController.getCate);
route.get("/", productController.getProducts);
export default route;
