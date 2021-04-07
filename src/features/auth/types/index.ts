interface IAddress {
    city: string;
    country: string;
    address: string;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    address: IAddress
}