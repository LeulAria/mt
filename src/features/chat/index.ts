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
	// setTempo, 
	setMessageView, 
	// setOpenChatBox, 
	// setTest, 
	// setGetRealTimeUser, 
	// setGetRealTimeMessage, 
	// setRefreshUser, 
	// setClearRealTimeMessage, 
	// setGetRealTimeUser_admin, 
	// setGetRealTimeMessage_admin, 
	// setRefreshUser_admin, 
	// setClearRealTimeMessage_admin, 
	// setGetUser, 
	// setGetUser_admin, 
	setTypingStatus,
    setUsersConveration,
    clearConverations,
    setIsActiveStatus,
    setClients,
    resetClientsList,
    setClientMessageView
} = userSlice.actions;

export const {
	// getRealTimeMessageView, 
	// getRealTimeMessageView_USERS, 
	getSupportUser,
	updateViewStatus,
	getRealTimeUserSupportProviders, 
	getUserFromCloud, 
	// getVisit, 
	// savePageVisit, 
	sendRealTimeMessage,
	sendRealTimeUserMessage, 
	// setGTempo, 
	setIsTyping,
	// getAllUser,
	// updateViewStatusForAdmin
} = thunks;

export default userSlice.reducer;
