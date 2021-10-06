import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from "../../components/sign-up/sign-up.component";

import "./user.styles.scss";

const UserPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>
);

export default UserPage;