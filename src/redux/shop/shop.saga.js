import { takeLatest, call, put, all } from "@redux-saga/core/effects";
import { convertCollectionSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { fetchCollectionError, fetchCollectionSuccess } from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionRunning() {
    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionError(error.message));
    }
    
}

export function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionRunning
    )
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}