interface IAddress {
  country: string;
  city: string;
  subCity: string;
}

export interface IUser {
  clientName?: string;
  companyName: string;
  companyUrl: string;
  email: string;
  service?: string;
  address?: IAddress;
  password?: string;
  business?: string;
  tinNumber?: string;
  role?: string;
  country?: string;
  payments?: IPayemntInfo;
  id?: string;
  phoneNumber?: string;
  last_send?: Date;
  suspended?: boolean;
  notificationMessage?: string;
  dateOfPayment?: any;
  expiryDate?: any;
  reminderExpiryDate?: any;
  city?: string;
  subCity?: string;
  verification_status?: string;
  messageType?: string;
  uid?: string;
}

export interface ICurrentUser {
  userName?: string;
  clientName?: string;
  companyName: string;
  companyUrl: string;
  email: string;
  service?: string;
  address?: IAddress;
  suspended?: boolean;
  password?: string;
  business?: string;
  tinNumber?: string;
  role: string;
  country?: string;
  payments?: IPayemntInfo;
  id?: string;
  uid: string;
  phoneNumber?: string;
  last_send?: Date;
  notificationMessage?: string;
  dateOfPayment?: any;
  expiryDate?: any;
  reminderExpiryDate?: any;
  city?: string;
  subCity?: string;
  verification_status?: string;
}

export interface IPayemntInfo {
  id: string;
  dateOfPayment: string;
  techSupportAccess: boolean;
}

export enum UserStatus {
  VERIFIED = "VERIFIED",
  NOT_VERIFIED = "NOT_VERIFIED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  SALES_PERSON = "SALES_SUPPORT",
  TECH_SUPPORT = "TECH_SUPPORT",
  USER = "USER",
  // DEFAULT = "DEFAULT",
}

export interface IEmployee {
  password?: string;
  userName: string;
  email: string;
  role: string;
  uid: string;
}

export interface INotification {
  from: string;
  message: string;
  messageType: string;
  uid: string;
  createdAt: Date;
}

export interface IInitState {
  isLoading: boolean;
  isFaliure: boolean;
  client: IUser;
  clients: IUser[];
  currentUser: ICurrentUser;
  authenticated: boolean;
  selectedUserData: IUser[];
  user: IUser;
  notifications: INotification[];
}
