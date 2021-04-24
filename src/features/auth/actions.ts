import { AppThunk } from "../../app/store";
import { IUser, UserRole, IPayemntInfo, ICurrentUser } from "./types/index";
import firebase from "../../firebase/firebase";
import { UserStatus } from "./types";
import {
  setLoadingProgress,
  setCurrentUser,
  setIsAuthenticated,
  setClients,
  setCurrentUserProfile,
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
          phoneNumber: user.phoneNumber,
          verification_status: UserStatus.NOT_VERIFIED,
          uid: _.user.uid,
          service: user.service,
          role: UserRole.USER,
          isOnline: false,
          typing: {
            isTyping: false,
            isTypingTo: "",
          },
          last_send: "",
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
  const password = `2F123456`;
  dispatch(setLoadingProgress(true));
  auth.createUserWithEmailAndPassword(user.email, password).then(
    (_: any) => {
      db.collection("clients")
        // .doc(_.user.uid)
        .add({
          userName: user.userName,
          email: user.email,
          uid: _.user.uid,
          role: user.role,
          isOnline: false,
          typing: {
            isTyping: false,
            isTypingTo: "",
          },
          last_send: "",
        })
        .then(() => {
          // dispatch(setCurrentUser(new_user));
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
      db.collection("clients")
        .doc(_.user.uid)
        .update({
          isOnline: true,
        })
        .then(() => {
          return db
            .collection("clients")
            .doc(_.user.uid)
            .get()
            .then((user: any) => {
              // if () {

              // } else {

              // }
              dispatch(setCurrentUser(user.data()));
              dispatch(setIsAuthenticated(true));
              setLoadingProgress(false);
            });
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

export const sendNotification = (users: IUser): AppThunk => async (
  dispatch,
  getState
) => {
  const db = firebase.firestore();
  db.collection("notifications")
    .doc(`${users.uid}`)
    .get()
    .then((user) => {
      if (user.exists)
        db.collection("notifications")
          .doc(`${users.uid}`)
          .update({
            notification: firebase.firestore.FieldValue.arrayUnion({
              message: users.notificationMessage,
              createdAt: new Date(),
              uid: users.uid,
              from: getState().auth.currentUser.role,
              messageType: users.messageType,
            }),
          });
      else
        db.collection("notifications")
          .doc(`${users.uid}`)
          .set({
            notification: [
              {
                message: users.notificationMessage,
                createdAt: new Date(),
                uid: `${users.uid}`,
                from: getState().auth.currentUser.role,
                messageType: users.messageType,
              },
            ],
          });
    })
    .catch((err) => console.log(err.message));
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

export const updateStore = (): AppThunk => async (dispatch, getState) => {
  firebase
    .firestore()
    .collection("clients")
    .doc(`${getState().auth.currentUser.uid}`)
    .get()
    .then((user: any) => {
      dispatch(setCurrentUser(user.data()));
      dispatch(setIsAuthenticated(true));
      setLoadingProgress(false);
    })
    .catch((e) => dispatch(setLoadingProgress(false)));
};

export const updadteUserProfile = (user: IUser): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingProgress(true));
  try {
    firebase
      .firestore()
      .collection("clients")
      .doc(`${getState().auth.currentUser.uid}`)
      .update({
        companyName: user.companyName,
        companyUrl: user.companyUrl,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        subCity: user.subCity,
        password: user.password,
      })
      .then(() => {
        dispatch(updateStore());
        dispatch(setLoadingProgress(false));
      })
      .catch((e) => {
        dispatch(setLoadingProgress(false));
        throw new Error("Error");
      });
  } catch (err) {}
};
