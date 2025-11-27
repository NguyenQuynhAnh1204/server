

export interface IUser {
    id: number;
    name: string;
    age: number;
    phone: string;
    address: string;
    avatar: string;
    hireDate: Date;
    isActive: boolean;
}

export interface IUserPayload {
    name: string;
    age: string;
    phone: string;
    address: string;
    avatar: string;
}