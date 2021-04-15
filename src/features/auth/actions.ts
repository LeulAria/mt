import { AppThunk } from "../../app/store";
import { IUser, UserRole, IEmployee } from "./types/index";
import firebase from "../../firebase/firebase";
import {UserStatus} from './types'
import {setLoadingProgress, setCurrentUser, setIsAuthenticated} from '.'

// create new user
export const createNewUser = (user: IUser): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	const password = `${user.companyName}@2F123`
	dispatch(setLoadingProgress(true))
	auth.createUserWithEmailAndPassword(user.email, password)
		.then(
			(_: any) => {
				db.collection("clients").doc(_.user.uid).set({
					clientName: user.clientName,
					companyName: user.companyName,
					companyUrl: user.companyUrl,
					email: user.email,
					phoneNumber: user.phone,
					verification_status: UserStatus.NOT_VERIFIED,
					uid: _.user.uid,
					service: user.service,
					role: UserRole.USER
				}).then((user)=> dispatch(setLoadingProgress(false)))
			},
			(err) => {
				dispatch(setLoadingProgress(false))
				console.log('error', err.t, err.message);
			}
		);
}

// create new employee
export const createNewEmployee = (user: any): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	dispatch(setLoadingProgress(true))
	auth.createUserWithEmailAndPassword(user.email, user.password)
		.then(
			(_: any) => {
				const new_user: IEmployee = {
					userName: user.userName,
					email: user.email,
					uid: _.user.uid,
					role: user.role
				}
				db.collection("users").doc(_.user.uid).set(new_user).then((user)=> {
					dispatch(setCurrentUser(new_user))
					dispatch(setLoadingProgress(false))
				})
			},
			(err) => {
				dispatch(setLoadingProgress(false))
				console.log('error', err.t, err.message);
			}
		);
}

// signin user
export const signInUser = (user: any): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	setLoadingProgress(true)
	auth.signInWithEmailAndPassword(user.email, user.password).then(
		(_: any) => {
			db.collection('users').doc(_.user.uid).get()
			.then((user: any)=>{
				dispatch(setCurrentUser(user.data()))
				dispatch(setIsAuthenticated(true))
				setLoadingProgress(false)
			})
		},
		(err) => {
			setLoadingProgress(false)
		}
	);
}