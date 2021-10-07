import { all, call, takeLatest, put } from "@redux-saga/core/effects";

import UserActionTypes from "../user/user.types";

import { clearCart } from "./cart.action";

export function* clearCartOnSignout() {
    yield put(clearCart());
}

export function* onSignoutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, clearCartOnSignout);
}

export function* cartSagas() {
    yield(all([call(onSignoutSuccess)]));
}