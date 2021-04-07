interface IAddress {
    city: string;
    country: string;
    subCity: string;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    address: IAddress;
    password: string;
    service: string;
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    NOT_VERIFIED = 'NOT_VERIFIED'
}