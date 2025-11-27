import { Router } from "express";
import { UserController } from "../controller/register.controller";


import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const route = Router();

const userController = new UserController();

route.get("/", userController.getUsers);

route.get("/:userId", userController.getUserId);

route.get("/count", userController.count);

route.post("/update", upload.single("avatar") , userController.update)

export default route;