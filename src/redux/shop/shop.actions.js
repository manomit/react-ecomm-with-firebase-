import { convertCollectionSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// });

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionError = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_ERROR,
    payload: errorMessage
});

export const fetchCollectionRunning = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionStart());
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionsMap));
        }).catch(error => {
            dispatch(fetchCollectionError(error.message));
        })
    }
};