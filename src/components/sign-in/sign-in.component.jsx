import React, { useState } from 'react';

import { connect } from "react-redux";

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';


import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async event => {
        event.preventDefaul();
        const { email, password } = credentials;
        
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({...credentials, [name]: value });
    };

    return(
        <div className="sign-in">
            <h2>I alreday have an account</h2>
            <span>Sign in with your email account</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email"
                    type="email"
                    value={credentials.email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput 
                    name="password"
                    type="password"
                    value={credentials.password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);