interface IAddress {
    country: string;
    city: string;
    subCity: string;
}

export interface IUser {
    companyName: string;
    companyUrl: string;
    email: string;
    phone: string;
    service: string;
    address?: IAddress;
    password?: string;
    business?: string;
    tinNumber?: string;
    role?: string;
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    NOT_VERIFIED = 'NOT_VERIFIED'
}

export enum UserRole {
    ADMIN = 'ADMIN',
    TECH_SUPPORT = 'TECH_SUPPORT',
    USER = 'USER'
}

export interface IInitState {
    isLoading: boolean;
    isFaliure: boolean;
}