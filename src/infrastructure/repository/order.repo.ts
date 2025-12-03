import connection from "../config/database.config";
import { IOrder, IOrderDetail } from "../../domain/interface/order.interface";
import { ResultSetHeader } from "mysql2";

export class OrderRepo {
    async createOrder(order: IOrder): Promise<number> {
        const sql = `
            insert into Orders (orderCode, employId, totalAmount, method)
            values (?, ?, ?, ?)
        `;

        const data = [order.orderCode, order.employId, order.totalAmount, order.method]

        const [result] = await connection.execute<ResultSetHeader>(sql, data);  // resultsetheader: giúp phân biệt được là đang dùng insert và có insertId

        return result.insertId;
    }


    async createDetail(detail: IOrderDetail): Promise<void> {
        const sql = `
            insert into OrderDetail (orderId, variantId, quantity, price, total)
            values (?, ?, ?, ?, ?)
        `;

        const data = [detail.orderId, detail.variantId, detail.quantity, detail.price, detail.total];

        await connection.execute(sql, data);
        return;
    }
}