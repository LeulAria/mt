import { AppThunk } from "../../app/store";
import { IUser, UserRole, IPayemntInfo } from "./types/index";
import firebase from "../../firebase/firebase";
import { UserStatus } from "./types";
import {
  setLoadingProgress,
  setCurrentUser,
  setIsAuthenticated,
  setClients,
} from ".";

// create new user
export const createNewUser = (user: IUser): AppThunk => async (dispatch) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const password = `${user.companyName}@2F123`;
  dispatch(setLoadingProgress(true));
  auth.createUserWithEmailAndPassword(user.email, password).then(
    (_: any) => {
      db.collection("clients")
        .doc(_.user.uid)
        .set({
          clientName: user.clientName,
          companyName: user.companyName,
          companyUrl: user.companyUrl,
          email: user.email,
          phoneNumber: user.phone,
          verification_status: UserStatus.NOT_VERIFIED,
          uid: _.user.uid,
          service: user.service,
          role: UserRole.USER,
        })
        .then((user) => dispatch(setLoadingProgress(false)));
    },
    (err) => {
      dispatch(setLoadingProgress(false));
      console.log("error", err.t, err.message);
    }
  );
};

// create new employee
export const createNewEmployee = (user: any): AppThunk => async (dispatch) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  dispatch(setLoadingProgress(true));
  auth.createUserWithEmailAndPassword(user.email, user.password).then(
    (_: any) => {
      const new_user: any = {
        userName: user.userName,
        email: user.email,
        uid: _.user.uid,
        role: user.role,
      };
      db.collection("users")
        .doc(_.user.uid)
        .set(new_user)
        .then(() => {
          dispatch(setCurrentUser(new_user));
          dispatch(setLoadingProgress(false));
        });
    },
    (err) => {
      dispatch(setLoadingProgress(false));
      console.log("error", err.t, err.message);
    }
  );
};

// signin user
export const signInUser = (user: any): AppThunk => async (dispatch) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  setLoadingProgress(true);
  auth.signInWithEmailAndPassword(user.email, user.password).then(
    (_: any) => {
      db.collection("users")
        .doc(_.user.uid)
        .get()
        .then((user: any) => {
          dispatch(setCurrentUser(user.data()));
          dispatch(setIsAuthenticated(true));
          setLoadingProgress(false);
        });
    },
    (err) => {
      setLoadingProgress(false);
    }
  );
};

export const getUser = (): AppThunk => async (dispatch) => {
  const db = firebase.firestore();
  try {
    firebase
      .firestore()
      .collection("clients")
      .get()
      .then(async (querySnapshot) => {
        let allData: IUser[] = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          allData.push(({
            ...doc.data(),
            id: doc.id,
          } as unknown) as IUser);
        });
        firebase
          .firestore()
          .collection("paymentStatus")
          .get()
          .then((snapshots) => {
            // interface IPaymentIndex {
            //   [index: string]: {};
            // }
            const allPayment: any[] = [];

            snapshots.forEach((doc: any) => {
              allPayment[doc.id] = ({
                id: doc.id,
                ...doc.data(),
              } as unknown) as IPayemntInfo;
            });

            allData = allData.map((user: any) => ({
              ...user,
              payments: allPayment[user.id]
                ? ((allPayment[user.id] as unknown) as IPayemntInfo)
                : undefined,
            }));

            dispatch(setClients(allData));
          });

        console.log(allData);

        dispatch(setClients(allData));
      });
  } catch (err) {
    throw err;
  }
};

export const getPayedUserInfo = (): AppThunk => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("paymentStatus")
      .get()
      .then((querySnapshot) => {
        const allData: IUser[] = [];
        querySnapshot.forEach((doc) => {
          allData.push(({ ...doc.data(), id: doc.id } as unknown) as IUser);
          console.log(doc.data());
        });
        dispatch(setClients(allData));
      });
  } catch (err) {
    throw err;
  }
};

export const paymentOfUser = (data: any): AppThunk => async (dispatch) => {
  const db = firebase.firestore();
  try {
    const { id, ...withoutId } = data;
    console.log(id, withoutId);
    db.collection("paymentStatus")
      .doc(id)
      .set(withoutId)
      .then(
        () => {
          console.log("Update");
        },
        (err) => console.log(err)
      );
  } catch (err) {
    throw err;
  }
};

export const sendVerification = (user: IUser): AppThunk => async (dispatch) => {
  const actionCodeSettings = {
    url: "https://user-management-ee9c6.web.app/",
    handleCodeInApp: true,
  };
  firebase
    .firestore()
    .collection("clients")
    .get()
    .then((querySnapshot) => {
      const allData: IUser[] = [];
      querySnapshot.forEach((doc) => {
        allData.push(({ ...doc.data(), id: doc.id } as unknown) as IUser);
      });
      const selectedUser = allData.filter((u) => {
        return u.email == user.email;
      });
      console.log(selectedUser[0].email, "user selected", firebase.auth);

      firebase
        .auth()
        .sendSignInLinkToEmail(selectedUser[0].email, actionCodeSettings)
        .then(() => {
          console.log("");
        });
    });
};

export const sendNotification = (users: IUser): AppThunk => async (dispatch, getState) => {
  const db = firebase.firestore();
  db.collection('notifications').doc(users.id).get()
    .then((user) => { 
      if(user.exists)
      db.collection('notifications').doc(users.id).update({
          notification: firebase.firestore.FieldValue.arrayUnion({
            message: users.notificationMessage,
            createdAt: new Date(),
            uid: users.id,
            from: getState().auth.currentUser.role
          })
      })
      else
      db.collection('notifications').doc(users.id).set({
        notification: [
          { 
            message: users.notificationMessage,
            createdAt: new Date(),
            uid: users.id,
            from: getState().auth.currentUser.role
          }
        ]
      })
    })
    .catch((err) => console.log(err.message))
};
export const getNotification = (user: IUser): AppThunk => async (dispatch) => {
  const actionCodeSettings = {
    url: "https://user-management-ee9c6.web.app/",
    handleCodeInApp: true,
  };
  firebase
    .firestore()
    .collection("clients")
    .get()
    .then((querySnapshot) => {
      const allData: IUser[] = [];
      querySnapshot.forEach((doc) => {
        allData.push(({ ...doc.data(), id: doc.id } as unknown) as IUser);
      });
      const selectedUser = allData.filter((u) => {
        return u.email == user.email;
      });
      console.log(selectedUser[0].email, "user selected", firebase.auth);

      firebase
        .auth()
        .sendSignInLinkToEmail(selectedUser[0].email, actionCodeSettings)
        .then(() => {
          console.log("");
        });
    });
};

