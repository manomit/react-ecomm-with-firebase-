import UserActionTypes  from './user.types';
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInError = (errorMessage) => ({
    type: UserActionTypes.SIGN_IN_ERROR,
    payload: errorMessage
});

export const emailSignInStart = (credential) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: credential
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutError = (errorMessage) => ({
    type: UserActionTypes.SIGN_OUT_ERROR,
    payload: errorMessage
});

export const signupStart = (credential) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: credential
});

export const signupError = (errorMessage) => ({
    type: UserActionTypes.SIGN_UP_ERROR,
    payload: errorMessage
});

export const signupSuccess = ({user, additionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});
