import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import profileService from '../../services/profile.service';
import UserContext from '../../UserContext';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            email: "",
            password: "",
            message: "",
            isLoading: false,
            isloggedIn: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    login(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            message: ""
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.signin(this.state.email, this.state.password)
                .then((data) => {
                    // Retrieve Auth Info
                    this.context.updateUser(data);

                    // Retrieve Profile Info
                    profileService
                    .getProfile()
                    .then(profile=>{
                        this.context.updateUsername(profile.name);
                        this.setState({
                            isloggedIn: true
                        });
                        console.log("Successfully logged in");
                    });
                },
                    error => {
                        const errorMessage = (
                            error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            isLoading: false,
                            message: errorMessage,
                            isloggedIn: false
                        });
                    });
        } else {
            this.setState({
                isLoading: false,
                isloggedIn: false
            });
        }
    }

    render() {
        let { isloggedIn } = this.state;
        let {isAdministrator, isHealthProvider}= this.context.user;
        return (
            <div className="container">
                {isloggedIn && (
                    <Navigate to={(isAdministrator || isHealthProvider)?"/donations":'/'} replace={true} />
                )}
                <Form className="container auth-form py-3 rounded"
                    onSubmit={this.login}
                    ref={c => {
                        this.form = c;
                    }}>
                    <div className="px-4">
                        <h3 className="title mb-1">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <Input
                                type="email"
                                name="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <Input
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.isLoading}>
                                {this.state.isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign In</span>
                            </button>
                        </div>
                        {/* <p className="forgot-password text-right mt-2">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </div>
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}

SignIn.contextType = UserContext;

export default SignIn;
