import { PayloadAction } from "@reduxjs/toolkit";
import { IInitState, IUser  } from "./types";


export default {
    setLoadingProgress: (state: IInitState, action: PayloadAction<boolean>)=>{
        state.isLoading = action.payload
    },
    setClients : (state: IInitState  , action: PayloadAction<IUser[]>) => {
		state.clients = action.payload
	},
}