import React from 'react';

import { connect } from 'react-redux';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { signupStart } from "../../redux/user/user.actions";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }
        this.props.signupStart({displayName, email, password});
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }
    
    render() {
        return(
            <div className="sign-up">
                <h2 className="title">I don not have an account</h2>
                <span>Signup with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="displayName"
                        type="text"
                        value={this.state.displayName}
                        handleChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput 
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput 
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput 
                        name="confirmPassword"
                        type="password"
                        value={this.state.confirmPassword}
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

mapDispatchToProps = dispatch => ({
    signupStart: credential => dispatch(signupStart(credential)),
});

export default connect(null, mapDispatchToProps)(SignUp);