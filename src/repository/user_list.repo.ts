import connection from "../config/database.config";
import { IUser, IUserPayload } from "../interface/user.interface";



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

    async count(): Promise<number> {
        const [result] = await connection.execute<any[]>("select count(*) as total from Employee");
        return result[0].total;
    }

    async update(id: number, userInf: IUserPayload, avatarUrl?: string): Promise<void> {

        // coalesce (v1, v2, ...). lấy giá trị không null đầu tiên trong danh sách 
        const sql = `
            update Employee
            set userName = ?, age = ?, address = ?, phone = ?, avatarUrl = COALESCE(?, avatarUrl)           
            where userId = ?
        `
        await connection.execute(sql, [userInf.name, userInf.age, userInf.address, userInf.phone, avatarUrl, id]);
    }
}

