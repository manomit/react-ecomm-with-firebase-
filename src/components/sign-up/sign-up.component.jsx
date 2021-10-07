import React, { useState } from 'react';

import { connect } from 'react-redux';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { signupStart } from "../../redux/user/user.actions";

const SignUp = ({ signupStart, signInWithGoogle }) => {

    const [credentials, setCredentials] = useState({ 
        email: '', 
        password: '',
        displayName: '',
        confirmPassword: '' 
    });

    const { displayName, email, password, confirmPassword} = credentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }
        signupStart({displayName, email, password});
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({...credentials,  [name]: value });
    }
    
    return(
        <div className="sign-up">
            <h2 className="title">I don not have an account</h2>
            <span>Signup with your email and password</span>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                    name="displayName"
                    type="text"
                    value={displayName}
                    handleChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput 
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput 
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput 
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    handleChange={handleChange}
                    label="Confirm Password"
                    required
                />

                <div className="buttons">
                    <CustomButton type="submit">Sign Up</CustomButton>
                </div>
            </form>
        </div>
    )
}

mapDispatchToProps = dispatch => ({
    signupStart: credential => dispatch(signupStart(credential)),
});

export default connect(null, mapDispatchToProps)(SignUp);