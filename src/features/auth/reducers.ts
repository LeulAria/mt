import { PayloadAction } from "@reduxjs/toolkit";
import { IEmployee, IInitState, IUser } from "./types";
import { initialState } from "./init";
// import { IInitState,   } from "./types";


export default {
    setLoadingProgress: (state: IInitState, action: PayloadAction<boolean>)=>{
        state.isLoading = action.payload
    },
    setIsAuthenticated: (state: IInitState, action: PayloadAction<boolean>)=>{
        state.authenticated = action.payload
    },
    setCurrentUser:(state: IInitState, action: PayloadAction<IEmployee>)=>{
        state.currentUser = action.payload
    },
    setLogOutUser:(state: IInitState)=>{
        state.currentUser = initialState.currentUser
        state.authenticated = false
    },
    setClients : (state: IInitState  , action: PayloadAction<IUser[]>) => {
		state.clients = action.payload
	},
    getClient : (state: IInitState  , action: PayloadAction<string>) => {
		state.email = action.payload
	},
}