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
	setLoadingProgress,
	setCurrentUser,
	setIsAuthenticated,
	setLogOutUser
} = userSlice.actions;

export const {
    createNewUser,
	signInUser
} = thunks;

export default userSlice.reducer;
