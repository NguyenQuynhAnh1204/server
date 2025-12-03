import { Request, Response } from "express";
import { OrderService } from "../application/service/order.service";


const orderService = new OrderService();

export class OrderController {
    async createOrder(req: Request, res: Response) {
        const orderList = req.body.order;


        await orderService.createOrder(orderList);


        return res.status(200).json({
            success: true,
            mess: "create success"
        });
    }
}