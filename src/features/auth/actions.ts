import { AppThunk } from "../../app/store";
import { IUser } from "./types/index";
import firebase from "../../firebase/firebase";

export const createNewUser = (user: IUser) : AppThunk => async dispatch =>{
    const auth = firebase.auth();
    const db = firebase.firestore();
    const userPassword = `${user.name}@123`
    auth.createUserWithEmailAndPassword(user.email, userPassword).then(
		(_) => {
			console.log(_.user)
		},
		(err) => {
			console.log('error', err.t, err.message);
		}
	);

}