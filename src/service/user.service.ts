import { UserResponse } from "../dto/user_res.dto";
import { deleteCloudinary } from "../helper/destroyClound";
import { getPublicId } from "../helper/fileImg";
import { uploadCloudinary } from "../helper/uploadCloud";
import { IUserPayload } from "../interface/user.interface";
import { UserList } from "../repository/user_list.repo";



const userRepo = new UserList();

export class UserService {
    async getAllUser() : Promise<UserResponse[] | undefined> {
        
        const users = await userRepo.findAll();
        if (users) {
            return users.map(u => new UserResponse(u));
        }
        return undefined;
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

                let oldAvatar = await userRepo.getAvatar(userId);
                if (oldAvatar) {
                    oldAvatar = getPublicId(oldAvatar);
                    await deleteCloudinary(oldAvatar);
                }
            }
            await userRepo.update(userId, userInf, avatarUrl);
        }
        catch (e) {
            throw e;
        }
    }

    async add(userInf: IUserPayload, file: Express.Multer.File): Promise<void> {
        try {
            const avatar = await uploadCloudinary(file.buffer, "Avatar");
            await userRepo.add(userInf, avatar);
        }
        catch (e) {
            throw e;
        }
    }

    async delete(userId: number) : Promise<void> {
        try {

            let avatar = await userRepo.getAvatar(userId);
            if (avatar) {
                avatar = getPublicId(avatar);
                await deleteCloudinary(avatar);
            }
            await userRepo.deleteUser(userId);
        }
        catch (e) {
            throw e;
        }
    }
}

