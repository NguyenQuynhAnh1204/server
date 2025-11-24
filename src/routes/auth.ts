import { Router } from "express";
import { UserController } from "../controller/register.controller";




const route = Router();

const userController = new UserController();

route.get("/", userController.getUsers);

route.get("/:userId", userController.getUserId);


export default route;