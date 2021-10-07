import React from 'react';

import { connect } from "react-redux";

import { Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CategoryOverviewContainer from '../category/category.component';

import { fetchCollectionRunning } from '../../redux/shop/shop.actions';



class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionRunning } = this.props;
        fetchCollectionRunning();
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer} 
                    />
                <Route 
                    path={`${match.path}/:categoryId`} 
                    component={CategoryOverviewContainer}
                />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionRunning: () => dispatch(fetchCollectionRunning())
})

export default connect(null, mapDispatchToProps)(ShopPage);