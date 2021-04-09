import { AppThunk } from "../../app/store";
import { IUser, UserRole } from "./types/index";
import firebase from "../../firebase/firebase";
import {UserStatus} from './types'
import {setLoadingProgress} from '.'

// create new user
export const createNewUser = (user: IUser): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	const password = `${user.companyName}@2F123`
	auth.createUserWithEmailAndPassword(user.email, password)
		.then(
			(_) => {
				db.collection("clients").doc(_.user.uid).set({
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

export const signInUser = (user: IUser): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.signInWithEmailAndPassword(user.email, user.password).then(
		(_) => {
			console.log(_.user)
		},
		(err) => {
			console.log('error', err.t, err.message);
		}
	);
}