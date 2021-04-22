import { AppThunk } from '../../app/store';
import firebase from '../../firebase/firebase'
import { UserRole } from '../auth/types';
import { convertTimestamp } from "convert-firebase-timestamp";
import Cookies from 'js-cookie';
import { setClientsChat, resetClientsList, setClientMessageView, setMessageView } from '.';
import { Conversation } from './types';


export const getSupportUser = (uid: string): AppThunk => async dispatch => {
	dispatch(resetClientsList([]))
    const realtime_db = firebase.database();
    realtime_db.ref("conversations").on('value', (onSnapshot) => {
        const user: any[] = [];
        console.log(onSnapshot.val())
        console.log(onSnapshot.exists())
        if (onSnapshot.exists()) {
            onSnapshot.forEach(message => {
                if (message.val().user_uid_2 === uid) {
                    user.push(message.val().user_uid_1)
                }
            })
            const rmv_duplicate = user.filter((item, index) => {
                return user.indexOf(item) === index
            })
            console.log(rmv_duplicate)
            dispatch(getUserFromCloud(rmv_duplicate, uid));
        }
    })
}

export const getUserFromCloud = (allUser: any[], current_uid: string): AppThunk => async dispatch => {
    const db = firebase.firestore();
    const users_list: any = [];
    allUser.forEach((uid: any, index: number) => {
        db.collection("clients").doc(uid).get().then((user: any) => {
            if (user.exists) {
                const client = {
                    uid: user.data().uid,
                    role: user.data().role,
                    email: user.data().email,
                    isOnline: user.data().isOnline,
                    user_name: user.data().companyName,
                    isTyping: {
                        isTyping: false,
                        isTypingTo: ""
                    },
                    view: 0
                }
                users_list.push({ ...client, view: 0 });
            }
        }).then(_ => {
            if (index === allUser.length - 1) {
                users_list.sort(function (a: any, b: any) {
                    const keyA = new Date(Date.parse(`${convertTimestamp(a.last_send)}`));
                    const keyB = new Date(Date.parse(`${convertTimestamp(b.last_send)}`));
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                })
                dispatch(resetClientsList([]))
                dispatch(setClientsChat(users_list))
                dispatch(getRealTimeMessageView(current_uid));
            }
        })
    })
}

export const getRealTimeMessageView = (uid: string): AppThunk => async (dispatch, getState: any) => {
    const users = getState().chat.clientsChat;
    const u = [...users];
    const db = firebase.database();
    db.ref("conversations").orderByChild('createdAt').on('value', (snapshot) => {
        let views = 0;
        if (snapshot.exists()) {
            u.map(user => {
                snapshot.forEach((message) => {
                    if (message.val().user_uid_1 === user.uid && message.val().user_uid_2 === uid && message.val().isView === false) {
                        views++;
                    }
                })
                dispatch(setClientMessageView({ uid: user.uid, view: views }))
                views = 0;
            })
        }
    })
}

export const sendRealTimeMessage = (conversation: Conversation, userRole: string, collectionName: string): AppThunk => async dispatch => {
    const db = firebase.database();
    const cloud = firebase.firestore();
    db.ref('conversations').push()
        .set({
            createdAt: Date(),
            message: conversation.message,
            user_uid_1: conversation.user_uid_1,
            user_uid_2: conversation.user_uid_2,
            isView: conversation.isView,
            from: userRole,
			to: UserRole.USER
        })
        .then(_ => {
            return cloud.collection(`${collectionName}`).doc(conversation.user_uid_1).update({
                last_send: new Date()
            })
        })
        .catch(err => console.log(err.message))
}

export const updateViewStatus = (users: any[], uid: string): AppThunk => async dispatch => {
    const db = firebase.database();
    const current = users.filter((item) => {
        return item.user_uid_2 === uid
    })
    current.forEach((user) => {
        db.ref("conversations").child(`${user.key}`).update({
            isView: true
        })
    })
}

export const setIsTyping = (uid: string, is: boolean): AppThunk => async dispatch => {
	if (Cookies.get('reciver')) {
		const db = firebase.firestore();
		db.collection("users").doc(uid).get()
			.then((user: any) => {
				if (user.data().typing.isTyping === false && is) {
					db.collection("users").doc(uid).update({
						typing: {
							isTyping: is,
							isTypingTo: Cookies.get('reciver')
						}
					});
				}
				else if (user.data().typing.isTyping === true && is === false) {
					db.collection("users").doc(uid).update({
						typing: {
							isTyping: is,
							isTypingTo: Cookies.get('reciver')
						}
					});
				}
			})
	}
}

export const getRealTimeUserSupportProviders = (uid: string): AppThunk => async dispatch => {
	const db = firebase.firestore();
	const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
		const user: any = [];
		querySnapshot.forEach((doc) => {
			if (doc.data().uid !== uid && (doc.data().role === UserRole.SALES_PERSON) && doc.data().isOnline === true) {
				user.push({ ...doc.data(), view: 0 })
			}
		})
		console.log(user)
		dispatch(resetClientsList([]))
		dispatch(setClientsChat(user))
		dispatch(getRealTimeMessageView_USERS(uid));
	})
	return unsubscribe;
}

export const getRealTimeMessageView_USERS = (uid: string): AppThunk => async (dispatch, getState) => {
	const users = getState().chat.clientsChat;
	const u = [...users];
	const db = firebase.database();
	db.ref("conversations").orderByChild('createdAt').on('value', (snapshot) => {
		let views = 0;
		if (snapshot.exists()) {
			u.map(user => {
				snapshot.forEach((message) => {
					if (message.val().user_uid_1 === user.uid && message.val().user_uid_2 === uid && message.val().isView === false) {
						views++;
					}
				})
				dispatch(setMessageView(views))
				views = 0;
			})
		}
	})
}

export const sendRealTimeUserMessage = (conversation: any, role: UserRole): AppThunk => async dispatch => {
	const real_time = firebase.database();
	const db = firebase.firestore();
	Cookies.remove(`reciver${role}`)
	db.collection("clients").where("role", "==", role).get()
		.then(users => {
			const onlineUsers: any = [];
			const allUsers_id: string[] = [];
			let counter = 0;
			users.forEach(user => {
				if (user.data().isOnline) {
					onlineUsers.push(user.data().uid)
				}
				allUsers_id.push(user.data().uid)
				counter++;
			})
			let reciver;
			if (Cookies.get(`reciver${role}`)) {
				reciver = Cookies.get(`reciver${role}`)
			}
			else if (onlineUsers.length > 0 && (Cookies.get(`reciver${role}`) === undefined)) {
				const rand = Math.floor((Math.random() * onlineUsers.length) + 0)
				reciver = onlineUsers[rand];
				Cookies.set(`reciver${role}`, reciver);
			} else if ((onlineUsers.length === 0) && (Cookies.get(`reciver${role}`) === undefined) && (allUsers_id.length > 0)) {
				const rand = Math.floor((Math.random() * counter) + 0);
				reciver = allUsers_id[rand];
				Cookies.set(`reciver${role}`, reciver);
			}
			if (allUsers_id.length > 0) {
				const date = new Date()
				db.collection("clients").doc(conversation.user_uid_1).update({
					last_send: date
				}).then(() => {
					real_time.ref('conversations').push().set({
						createdAt: Date(),
						message: conversation.message,
						user_uid_1: conversation.user_uid_1,
						user_uid_2: Cookies.get(`reciver${role}`),
						isView: conversation.isView,
						from: UserRole.USER,
						to: role
					}).then(_ => console.log('', _))
						.catch(err => console.log(err.message))
				})
			}

		})
}

// export const updateViewStatusForAdmin = (users: any[]): AppThunk => async dispatch => {
// 	const db = firebase.database();
// 	users.forEach((user) => {
// 		db.ref("convserations").child(`${user.key}`).update({
// 			isView: true
// 		})
// 	})
// }

// export const savePageVisit = (): AppThunk => async dispatch => {
// 	return firebase.firestore().collection("page").doc('mywebpagevisit').get()
// 		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
// 			if (value) {
// 				firebase.firestore().collection("page").doc('mywebpagevisit').update({
// 					visit: value.data().visit + 1
// 				})
// 			}
// 		})
// }

// export const getVisit = (): AppThunk => async (dispatch) => {
// 	firebase.firestore().collection("page").doc('mywebpagevisit').get()
// 		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
// 			if (value) {
// 				const visits: number = value.data().visit;
// 				dispatch(setGetPageView(visits))
// 			}
// 		})
// }

// export const getAllUser = (): AppThunk => async (dispatch) => {
// 	firebase.firestore().collection("users").get()
// 		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
// 			const users: any[] = [];
// 			if (value) {
// 				value.forEach((user: any) => {
// 					if (user.data().role === UserRole.USER) {
// 						users.push({ ...user.data() })
// 					}
// 				});
// 				dispatch(filterUserChat(users));
// 			}
// 		})
// }

// export const filterUserChat = (users: any[]): AppThunk => async (dispatch) => {
// 	const realtime_db = firebase.database();
// 	realtime_db.ref("convserations").on('value', (onSnapshot) => {
// 		const userFilterd: any[] = [];
// 		if (onSnapshot.exists()) {
// 			onSnapshot.forEach(message => {
// 				users.map((user) => {
// 					if (message.val().user_uid_1 === user.uid) {
// 						userFilterd.push(message.val().user_uid_1)
// 					}
// 				})
// 			})
// 			const rmv_duplicate = userFilterd.filter((item, index) => {
// 				return userFilterd.indexOf(item) === index
// 			})
// 			console.log(rmv_duplicate)
// 			const avialable_users: any[] = []
// 			users.filter((item) => {
// 				rmv_duplicate.forEach((uid) => {
// 					if (item.uid === uid) {
// 						avialable_users.push({ ...item, view: 0 })
// 						return 1
// 					}
// 				});
// 			})
// 			avialable_users.sort(function (a: any, b: any) {
// 				var keyA = new Date(Date.parse(`${convertTimestamp(a.last_send)}`)),
// 					keyB = new Date(Date.parse(`${convertTimestamp(b.last_send)}`));
// 				if (keyA > keyB) return -1;
// 				if (keyA < keyB) return 1;
// 				return 0;
// 			})
// 			dispatch(setRefreshUser_admin())
// 			dispatch(setGetRealTimeUser_admin(avialable_users))
// 			dispatch(getRealTimeMessageViewForAdmin());
// 		}
// 	})
// }

// export const getRealTimeMessageViewForAdmin = (): AppThunk => async (dispatch, getState) => {
// 	const users = getState().user.users_admin;
// 	let u = [...users];
// 	const db = firebase.database();
// 	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
// 		let views = 0;
// 		if (snapshot.exists()) {
// 			u.map(user => {
// 				snapshot.forEach((message) => {
// 					if (message.val().user_uid_1 === user.uid && message.val().isView === false) {
// 						views++;
// 					}
// 				})
// 				dispatch(setGetUser_admin({ uid: user.uid, view: views }))
// 				views = 0;
// 			})
// 		}
// 	})
// }