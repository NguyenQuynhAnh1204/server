import { UserService } from "../service/user.service";
import { Response, Request } from "express";


const userService = new UserService();


export class UserController {
    async getUsers(req: Request, res: Response) : Promise<void> {

        try {
            const users = await userService.getAllUser();

            res.status(200).json({
                success: true,
                data: users
            })
        }
        catch (e) {
            res.status(500).json({
                success: false,
                messenger: "Server error",
                e
            })
        }
    }
}

