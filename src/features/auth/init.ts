import { IInitState } from "./types";
export const initialState: IInitState = {
    isLoading: false,   
    isFaliure: false,
    currentUser:{
        email: "",
        role: "",
        uid: "",
        userName: ""
    },
    authenticated: false
}