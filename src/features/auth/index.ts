import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./actions";
import { initialState } from "./init";
import reducers from "./reducers";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers,
});

export const {
  setLoadingProgress,
  setCurrentUser,
  setIsAuthenticated,
  setLogOutUser,
  setClients,
  setUser,
} = userSlice.actions;

export const { createNewUser, signInUser, getUser, sendNotification } = thunks;

export default userSlice.reducer;
