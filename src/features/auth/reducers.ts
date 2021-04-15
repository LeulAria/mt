import { PayloadAction } from "@reduxjs/toolkit";
import { IEmployee, IInitState } from "./types";
import { initialState } from "./init";

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
}