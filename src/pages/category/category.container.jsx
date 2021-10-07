import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { compose } from "redux";

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CategoryPage from '../category/category.component';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CategoryOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CategoryPage);

export default CategoryOverviewContainer;

