interface IAddress {
    country: string;
    city: string;
    subCity: string;
}

export interface IUser {
    clientName: string;
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

export interface IEmployee {
    password?: string;
    userName: string;
    email: string;
    role: string;
    uid: string
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    NOT_VERIFIED = 'NOT_VERIFIED'
}

export enum UserRole {
    ADMIN = 'ADMIN',
    TECH_SUPPORT = 'TECH SUPPORT',
    USER = 'SALES SUPPORT'
}

export interface IInitState {
    isLoading: boolean;
    isFaliure: boolean;
    authenticated: boolean;
    currentUser: IEmployee;
}