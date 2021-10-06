import React from 'react';

import { connect } from "react-redux";

import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

import CategoryPage from '../category/category.component';

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends React.Component {

    state = {
        loading: true
    };

    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snaphsot => {
            const collectionsMap = convertCollectionSnapshotToMap(snaphsot);
            updateCollections(collectionsMap);
            this.setState({ loading: false })
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapShot();
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )} />
                <Route 
                    path={`${match.path}/:categoryId`} 
                    render={props => (
                        <CategoryPageWithSpinner isLoading={loading} {...props} />
                    )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);