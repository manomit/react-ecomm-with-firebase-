import React from 'react';

import { connect } from 'react-redux';

import { seletCategory } from '../../redux/shop/shop.selectors';

import CollectionItem from "../../components/colection-item/collection-item.component";

import "./category.styles.scss";

const CategoryPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    collection: seletCategory(ownProps.match.params.categoryId)(state)
})

export default connect(mapStateToProps)(CategoryPage);