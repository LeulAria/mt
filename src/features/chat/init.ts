import { IUsers } from "./types";

export const initialState: IUsers = {
	clients: [],
	clientsChat: [],
	conversations: [],
	users_admin: [],
	conversations_admin: [],
	// test: [],
	isActive: false,
	openChatBox: false,
	messageView: 0,
	isTyping: false
};

export interface Iuser {
	uid: string;
	view: number;
}