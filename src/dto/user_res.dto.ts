import { coverImg } from "../helper/fileImg";


export class UserResponse {
    id: number;
    name: string;
    age: number;
    phone: string;
    address: string;
    avatar: string;
    hireDate: Date;
    isActive: boolean;

    constructor (user: any) {
        this.id = user.userId;
        this.name = user.userName;
        this.age = user.age;
        this.phone = user.phone;
        this.address = user.address;
        this.avatar = coverImg(user.avatarUrl);
        this.hireDate = user.hireDate;
        this.isActive = user.isActive;
    }
}

