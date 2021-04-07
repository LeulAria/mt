import { AppThunk } from "../../app/store";
import { IUser } from "./types/index";
import firebase from "../../firebase/firebase";
import {UserStatus} from './types'

// create new user
export const createNewUser = (user: IUser): AppThunk => async dispatch => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.createUserWithEmailAndPassword(user.email, user.password)
		.then(
			(_) => {
				db.collection("clients").doc(_.user.uid).set({
					name: user.name,
					email: user.email,
					phoneNumber: user.phone,
					address: {
						country: user.address.country,
						city: user.address.city,
						sub_city: user.address.subCity
					},
					verification_status: UserStatus.NOT_VERIFIED,
					uid: _.user.uid,
					service: user.service,
					business: user.business
				}).then((user)=> console.log(user))
			},
			(err) => {
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