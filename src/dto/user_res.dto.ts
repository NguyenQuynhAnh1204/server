import { coverImg } from "../helper/fileImg";


export class UserResponse {
    id: number;
    name: string;
    birthday: Date;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    hireDate: Date;
    isActive: boolean;

    constructor (user: any) {
        this.id = user.userId;
        this.name = user.userName;
        this.birthday = user.birthday;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
        this.avatar = coverImg(user.avatarUrl);
        this.hireDate = user.hireDate;
        this.isActive = user.isActive;
    }
}


