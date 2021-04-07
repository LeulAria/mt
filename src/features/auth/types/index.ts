interface IAddress {
    country: string;
    city: string;
    subCity: string;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    address: IAddress;
    password: string;
    service: string;
    business: string;
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    NOT_VERIFIED = 'NOT_VERIFIED'
}

export interface IInitState {
    isLoading: boolean;
    isFaliure: boolean;
}