import * as actions from "./actionTypes";

//signup action creater
export const signUp = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actions.AUTH_START });
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    //send the verification email

    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();

    await firestore
      .collection("users")
      .doc(res.user.uid)
      .set({
        firstName: data.firstName,
        lastName: data.lastName
      });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

//Log out action creater
export const signOut = () => async (dispatch, getSate, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

//Login action creater
export const singIn = data => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

//clean up messages

export const clean = () => ({
  type: actions.CLEAN_UP
});

//verify email actiontypes
export const verifyEmail = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.VERIFY_START });
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: actions.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
  }
};

//send recover password
export const recoverPassword = data => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.RECOVERY_START });
  try {
    //send email here
    await firebase.auth().sendPasswordResetEmail(data.email);

    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
  }
};

//Edit profile
export const editProfile = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;

  dispatch({ type: actions.PROFILE_EDIT_START });
  try {
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }

    await firestore
      .collection("users")
      .doc(userId)
      .set({
        firstName: data.firstName,
        lastName: data.lastName
      });
    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }

    //edit the user profile
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};
