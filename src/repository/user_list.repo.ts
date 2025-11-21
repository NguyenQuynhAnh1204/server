import connection from "../config/database.config";
import { IUser } from "../interface/user.interface";



export class UserList {
    async findAll(): Promise<IUser[]> {
        const [users] = await connection.execute("select userId, userName, age, phone, address, avatarUrl, hireDate, isActive from Employee");
        return users as IUser[];
    }
}

