import { PayloadAction } from "@reduxjs/toolkit";
import { IInitState } from "./types";

export default {
    setLoadingProgress: (state: IInitState, action: PayloadAction<boolean>)=>{
        state.isLoading = action.payload
    }
}