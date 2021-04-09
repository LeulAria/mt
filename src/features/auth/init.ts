import { IInitState, UserRole } from "./types";
export const initialState: IInitState = {
    isLoading: false,   
    isFaliure: false,
    user_name: "",
    email: "",
    role: UserRole.DEFAULT,
    uid: "",
    profile: ""
}