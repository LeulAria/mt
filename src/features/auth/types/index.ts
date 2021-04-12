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
    SALES_PERSON = 'SALES_PERSON',
    TECH_SUPPORT = 'TECH_SUPPORT',
    USER = 'USER',
    DEFAULT = 'DEFAULT'
}

export interface IInitState {
    isLoading: boolean;
    isFaliure: boolean;
    user_name: string;
    email: string;
    uid: string;
    role: UserRole;
    profile?: string;
    client: IUser;
	clients: IUser[];
}