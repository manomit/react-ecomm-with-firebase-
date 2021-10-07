import { takeLatest, put, all, call } from "@redux-saga/core/effects";

import UserActionTypes from "./user.types";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

import { signInSuccess, signInError, signOutSuccess, signOutError, signupError, signupSuccess } from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()})
        )
    } catch(error) {
        yield put(
            signInError(error.message)
        )
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(
            signInError(error.message)
        )
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);

    } catch(error) {
        yield put(signInError(error.Message))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInError(error.message));
    }
}

export function* signoutStart() {
    try {
        yield auth.signOut();
        yield(put(signOutSuccess));
    } catch(error) {
        yield(put(signOutError));
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signupSuccess({ user, additionalData: { displayName }}))
    } catch(error) {
        yield put(signupError(error.message))
    }
}

export function* signInAfterSignup({payload: {email, password, displayName}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignoutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signoutStart);
}

export function* onSignupStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignupSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignup);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignoutStart),
        call(onSignupSuccess),
    ]);
}