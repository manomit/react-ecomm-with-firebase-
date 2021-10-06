import React from 'react';

import { connect } from "react-redux";

import { Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

import CategoryPage from '../category/category.component';

import { fetchCollectionRunning } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionRunning } = this.props;
        fetchCollectionRunning();
    }

    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                    )} />
                <Route 
                    path={`${match.path}/:categoryId`} 
                    render={props => (
                        <CategoryPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionRunning: () => dispatch(fetchCollectionRunning())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);