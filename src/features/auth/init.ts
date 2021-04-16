import { IInitState, UserRole } from "./types";
export const initialState: IInitState = {
  isLoading: false,
  isFaliure: false,
  currentUser: {
    email: "",
    role: "",
    uid: "",
    userName: ""
  },
  authenticated: false,
  client: {
    companyName: "",
    companyUrl: "",
    phone: "",
    email: "",
    tinNumber: "",
    id: "",
    service: "",
    address: { country: "", city: "", subCity: "" },
    business: "",
    password: "",
    role: "",
  },
  clients: [],
};
