import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import CustomButton from "../custom-button/custom-button.component";

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems  } from '../../redux/cart/cart.selectors';

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-dropdown.styles.scss";

const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                cartItems.map(cartItem => (<CartItem key={cartItems.id} item={cartItem} />))
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={() => {
            history.push("/checkout");
            dispatch(toggleCartHidden());
        }}>GO TO CHECKOUT</CustomButton>
    </div>
);

// mapStateToProps will call each and everytime , when state changes, like when login, logout, everytime, so we are using memoized selector

// const mapStateToProps = ({ cart: { cartItems }}) => ({
//     cartItems
// });

// const mapStateToProps = state => ({
//     cartItems: selectCartItems(state)
// });

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown))