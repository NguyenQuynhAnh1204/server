import { IUserPayload } from "../domain/interface/user.interface";
import { UserService } from "../application/service/user.service";
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

    async getUserId (req: Request, res: Response) : Promise<void> {

        const userId = Number(req.params.userId);
        try{
            const user = await userService.getUserId(userId);
            res.status(200).json({
                success: true,
                user
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

    async count(req: Request, res: Response): Promise<void> {
        try {
            const count = await userService.count();

            res.status(200).json({
                success: true,
                count
            })
        }
        catch (e) {
            res.status(500).json({
                success: false,
                message: "Server error",
                e
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const userId = Number(req.query.q);
        const userInf = req.body as IUserPayload; 
        const userAvt = req.file as Express.Multer.File;
        try {

            await userService.update(userId, userInf, userAvt);


            res.status(200).json({
                success: true,
            })
        }
        catch (e) {
            res.status(500).json({
                success: false,
                e
            })
        }
    }


    async add(req: Request, res: Response): Promise<void> {
        const userInf = (req.body) as IUserPayload;
        const userAvt = (req.file) as Express.Multer.File;

        try {
            await userService.add(userInf, userAvt);

            res.status(200).json({
                success: true,
            })
        }   
        catch (e) {
            res.status(500).json({
                success: false,
                e
            })
        }
    }

    async delete(req: Request, res: Response) : Promise<void> {
        const userId = Number(req.params.userId);
        try {
            
            await userService.delete(userId);
            res.status(200).json({
                success: true,
            })
        }   
        catch (e) {
            res.status(500).json({
                success: false,
                e
            })
        }
    }
}

