import { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser, IInitState, INotification, IUser } from "./types";
import { initialState } from "./init";

export default {
  setLoadingProgress: (state: IInitState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setIsAuthenticated: (state: IInitState, action: PayloadAction<boolean>) => {
    state.authenticated = action.payload;
  },
  setCurrentUser: (state: IInitState, action: PayloadAction<ICurrentUser>) => {
    state.currentUser = action.payload;
  },
  setLogOutUser: (state: IInitState) => {
    state.currentUser = initialState.currentUser;
    state.authenticated = false;
  },
  setClients: (state: IInitState, action: PayloadAction<IUser[]>) => {
    state.clients = action.payload;
  },
  getClient: (state: IInitState, action: PayloadAction<string>) => {
    state.client.email = action.payload;
  },
  setUser: (state: IInitState, action: PayloadAction<IUser[]>) => {
    state.selectedUserData = action.payload;
  },
  setCurrentUserProfile:(state: IInitState, action: PayloadAction<IUser>) => {
    state.user = action.payload;
  },
  setNotifications:(state: IInitState, action: PayloadAction<INotification[]>) => {
    state.notifications = action.payload;
  },
};
