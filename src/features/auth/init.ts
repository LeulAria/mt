import { IInitState, UserRole } from "./types";
export const initialState: IInitState = {
    isLoading: false,   
    isFaliure: false,
    user_name: "",
    email: "",
    role: UserRole.DEFAULT,
    uid: "",
    profile: "",
    client:{
        companyName: '',
        companyUrl:'',
        phone: '',
        email: '',
        tinNumber: '',
        service:'',
        address : {country: "", city: "", subCity: ""},
        business: '',
        password:'',
        role: ''
        },
    clients : [],
}

