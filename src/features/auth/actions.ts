import { AppThunk, RootState } from "../../app/store";
import { IPayemntInfo, IUser, UserRole } from "./types/index";
import firebase from "../../firebase/firebase";
import { UserStatus } from "./types";
import { setLoadingProgress, setClients } from ".";
import { query } from "express";

// create new user
export const createNewUser = (user: IUser): AppThunk => async (dispatch) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const password = `${user.companyName}@2F123`;
  auth.createUserWithEmailAndPassword(user.email, password).then(
    (_) => {
      db.collection("clients")
        .doc(_.user.uid)
        .set({
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

export const signInUser = (user: IUser): AppThunk => async (dispatch) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  auth.signInWithEmailAndPassword(user.email, user.password).then(
    (_) => {
      console.log(_.user);
    },
    (err) => {
      console.log("error", err.t, err.message);
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
            interface IPaymentIndex {
              [index: string]: {};
            }
            let allPayment: IPaymentIndex[] = [];

            snapshots.forEach((doc) => {
              allPayment[doc.id] = ({
                id: doc.id,
                ...doc.data(),
              } as unknown) as IPayemntInfo;
            });

            allData = allData.map((user) => ({
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
        let allData: IUser[] = [];
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

export const paymentOfUser = (data): AppThunk => async (dispatch) => {
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
          // dispatch(getUser())
        },
        (err) => console.log(err)
      );
  } catch (err) {
    throw err;
  }
};

export const cronSchdule = () => {
  //   firebase
  //     .firestore()
  //     .collection("paymentStatus")
  //     .get()
  //     .then((querySnapshot) => {
  //       let allData: IUser[] = [];
  //       querySnapshot.forEach((doc) => {
  //         allData.push(({ ...doc.data(), id: doc.id } as unknown) as IUser);
  //       });
  //       console.log(allData, "snapshot");
  //     });
};

export const sendVerification = (user: IUser): AppThunk => async (dispatch) => {
  const auth = firebase.auth;
  var actionCodeSettings = {
    url: "https://user-management-ee9c6.web.app/",
    handleCodeInApp: true,
  };
  firebase
    .firestore()
    .collection("clients")
    .get()
    .then((querySnapshot) => {
      let allData: IUser[] = [];
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
        .then((hello) => {});
    });
};
