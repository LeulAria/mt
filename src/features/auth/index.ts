import { createSlice } from '@reduxjs/toolkit';
import * as thunks from './actions';
import { initialState } from "./init";
import reducers from "./reducers";

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers
});

export const {
} = userSlice.actions;

export const {
    createNewUser
} = thunks;

export default userSlice.reducer;
