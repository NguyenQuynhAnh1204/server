import { OrderDetailDTO, OrderDTO } from "../dto/order.dto";
import { IOrderDetail } from "../../domain/interface/order.interface";
import { OrderRepo } from "../../infrastructure/repository/order.repo";


const orderRepo = new OrderRepo();

export class OrderService {
    async createOrder(orderList: OrderDetailDTO[]): Promise<void> {

        console.log(orderList);
        // const orderId = await orderRepo.createOrder(order);


        // for (const d of detail) {
        //     d.orderId = orderId;
        //     await orderRepo.createDetail(d as IOrderDetail);
        // }

        return;
    }
}