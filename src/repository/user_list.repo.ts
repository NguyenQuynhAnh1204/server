import connection from "../config/database.config";
import { IUser } from "../interface/user.interface";



export class UserList {
    async findAll(): Promise<IUser[]> {
        const [users] = await connection.execute("select userId, userName, age, phone, address, avatarUrl, hireDate, isActive from Employee");
        return users as IUser[];
    }


    async findId(id: number): Promise<IUser | null> {
        const [rows] = await connection.execute("select userId, userName, age, phone, address, avatarUrl, hireDate, isActive from Employee where userId = ?", [id]);
        
        const user = rows as IUser[];

        return user[0] ?? null;
    }
}

