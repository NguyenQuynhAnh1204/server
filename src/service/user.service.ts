import { UserResponse } from "../dto/user_res.dto";
import { uploadCloudinary } from "../helper/uploadCloud";
import { IUserPayload } from "../interface/user.interface";
import { UserList } from "../repository/user_list.repo";



const userRepo = new UserList();

export class UserService {
    async getAllUser() : Promise<UserResponse[]> {
        const users = await userRepo.findAll();

        return users.map(u => new UserResponse(u));
    }

    async getUserId(id: number) : Promise<UserResponse> {
        const user = await userRepo.findId(id);

        return new UserResponse(user);
    }

    async count(): Promise<number> {
        const count = await userRepo.count();
        return count;
    }


    async update(userId: number, userInf: IUserPayload, file?: Express.Multer.File): Promise<void> {   
        let avatarUrl: string | undefined;

        try {
            if (file) {
                avatarUrl = await uploadCloudinary(file.buffer, "Avatar");
            }
            await userRepo.update(userId, userInf, avatarUrl);
        }
        catch (e) {
            throw e;
        }
    }
}

