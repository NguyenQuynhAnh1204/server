import connection from "../config/database.config";
import { IUser, IUserPayload } from "../../domain/interface/user.interface";



export class UserList {
    async findAll(): Promise<IUser[] | undefined> {
        try {
            const [users] = await connection.execute("select userId, userName, birthday, phone, email, address, avatarUrl, hireDate, isActive from Employee");
            return users as IUser[];
        }
        catch (error) {
            throw error;
        }
    }


    async findId(id: number): Promise<IUser | null> {
        try {
            const [rows] = await connection.execute("select userId, userName, birthday, phone, email, address, avatarUrl, hireDate, isActive from Employee where userId = ?", [id]);
            
            const user = rows as IUser[];
            return user[0] ?? null;
        }
        catch (error) {
            throw error;
        }

    }

    async count(): Promise<number> {
        const [result] = await connection.execute<any[]>("select count(*) as total from Employee");
        return result[0].total;
    }

    async update(id: number, userInf: IUserPayload, avatarUrl?: string): Promise<void> {
        try {
            const sql = `
                update Employee
                set userName = ?, birthday = ?, address = ?, phone = ?, email = ?, avatarUrl = COALESCE(?, avatarUrl)           
                where userId = ?
            `
            await connection.execute(sql, [userInf.name, userInf.birthday, userInf.address, userInf.phone, userInf.email, avatarUrl ?? null, id]);
        }
        catch (error) {
            
            throw error;
        }
            
    }

    async getAvatar(id: number): Promise<string> {
        try {
            const [avatar] = await connection.execute<any>("select avatarUrl from Employee where userId = ?", [id]);
            return avatar[0].avatarUrl as string;
        }
        catch (error) {
            throw error
        }
    }


    async add(userInf: IUserPayload, avatarUrl: string): Promise<void> {
        
        try {
            const sql = `
                insert into Employee (userName, birthday, phone, email, address, avatarUrl, hireDate)
                values (?, ?, ?, ?, ?, ?, now())
            `
            await connection.execute(sql, [userInf.name, userInf.birthday, userInf.phone, userInf.email, userInf.address, avatarUrl])
        }
        catch (error) {
            
            throw error;
        }
    }

    async deleteUser(userId: number) : Promise<void> {
        try {
            await connection.execute("delete from Employee where userId = ?", [userId]);
        }
        catch (e) {
            throw e;
        }
    }
}

