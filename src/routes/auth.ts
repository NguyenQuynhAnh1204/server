import { Router } from "express";
import { UserController } from "../controller/register.controller";




const route = Router();

const userController = new UserController();

route.get("/", (req, res) => userController.getUsers(req, res));


export default route;