import { AppThunk } from "../../app/store";
import { IUser } from "./types/index";
import firebase from "../../firebase/firebase";

export const createNewUser = (user: IUser) : AppThunk => async dispatch =>{
    const auth = firebase.auth();
    const db = firebase.firestore();
    auth.createUserWithEmailAndPassword(user.email, user.password)
		.then(
		(_) => {
			console.log(_.user)
		},	
		(err) => {
			console.log('error', err.t, err.message);
		}
	);
}

export const signInUser = (user: IUser) : AppThunk => async dispatch =>{
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