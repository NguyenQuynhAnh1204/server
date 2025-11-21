import { UserResponse } from "../dto/user_res.dto";
import { UserList } from "../repository/user_list.repo";



const userRepo = new UserList();

export class UserService {
    async getAllUser() : Promise<UserResponse[]> {
        const users = await userRepo.findAll();

        return users.map(u => new UserResponse(u));
    }
}

