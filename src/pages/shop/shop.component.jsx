import React from 'react';

import { connect } from "react-redux";

import { Route } from 'react-router-dom';


import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CategoryOverviewContainer from '../category/category.component';

import { fetchCollectionStart } from '../../redux/shop/shop.saga';



class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionStart } = this.props;
        fetchCollectionStart();
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
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);