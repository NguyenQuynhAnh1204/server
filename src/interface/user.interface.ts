

export interface IUser {
    id: number;
    name: string;
    birthday: Date;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    hireDate: Date;
    isActive: boolean;
}

export interface IUserPayload {
    name: string;
    birthday: Date;
    phone: string;
    email: string;
    address: string;
}

