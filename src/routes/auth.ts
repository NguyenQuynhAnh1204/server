import { Router } from "express";
import { UserController } from "../controller/register.controller";


import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const route = Router();

const userController = new UserController();

route.get("/count", userController.count);
route.post("/update", upload.single("avatar") , userController.update);     //sử dụng query
route.post("/add", upload.single("avatar"), userController.add);            // sử dụng query
route.get("/:userId", userController.getUserId);                         // sủe dụng params
route.delete("/delete/:userId", userController.delete);                     // prams
route.get("/", userController.getUsers);



export default route;