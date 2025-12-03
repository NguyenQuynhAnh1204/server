
import { Router } from "express";
import { OrderController } from "../controller/order.controller";


const route = Router();

const order = new OrderController();

route.post("/", order.createOrder);


export default route;