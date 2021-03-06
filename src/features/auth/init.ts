import { IInitState, UserRole } from "./types";
export const initialState: IInitState = {
  isLoading: false,
  isFaliure: false,
  currentUser: {
    userName: "",
    companyName: "",
    companyUrl: "",
    phoneNumber: "",
    email: "",
    suspended: false,
    tinNumber: "",
    uid: "",
    service: "",
    address: { country: "", city: "", subCity: "" },
    business: "",
    password: "",
    role: "",
    city: "",
    subCity: "",
    verification_status: "",
  },
  authenticated: false,
  client: {
    companyName: "",
    companyUrl: "",
    phoneNumber: "",
    email: "",
    tinNumber: "",
    suspended: false,
    id: "",
    service: "",
    address: { country: "", city: "", subCity: "" },
    business: "",
    password: "",
    role: "",
    city: "",
    subCity: "",
    verification_status: "",
    uid: "",
  },
  clients: [],
  selectedUserData: [],
  user: {
    companyName: "",
    companyUrl: "",
    phoneNumber: "",
    email: "",
    tinNumber: "",
    suspended: false,
    id: "",
    service: "",
    address: { country: "", city: "", subCity: "" },
    business: "",
    password: "",
    role: "",
    city: "",
    subCity: "",
    verification_status: "",
  },
  notifications: [],
};
