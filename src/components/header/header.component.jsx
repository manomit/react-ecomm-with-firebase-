import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import "./header.styles.scss";

import { 
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink 
} from "./header.styles";

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';

import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">SHOP</OptionLink>
            <OptionLink to="/shop">CONTACT</OptionLink>

            {
                currentUser ? 
                (<OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>)
                :
                (<OptionLink to="/sign-in">SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropDown />
        }
        
    </HeaderContainer>
);

// const mapStateToProps = ({ user: { currentUser}, cart: { hidden } }) => ({
//     currentUser,
//     hidden
// });

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);