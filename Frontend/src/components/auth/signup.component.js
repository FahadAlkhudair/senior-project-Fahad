import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import { isEmail } from "validator";
import config from '../../config';
import AuthService from '../../services/auth.service';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const role = value => {
    if (config.selfServiceRoles.indexOf(value) === -1) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid role.
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const password = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const roles = [];
config.selfServiceRoles.forEach((value, idx)=>{
    roles.push(<option key={idx} value={value}>{value}</option>);
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            role: "",
            email: "",
            password: "",
            message: "",
            isLoading: false,
            isSuccess: false
        };
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
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

    register(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            isSuccess: false,
            message: ""
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.signup(this.state.role, this.state.email, this.state.password)
                .then(res => {
                    this.setState({
                        message: res.data.message,
                        isSuccess: true,
                        isLoading: false
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
                            isSuccess: false,
                            message: errorMessage
                        });
                    });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        return (
            <div className="container">
                <Form className="container auth-form py-3 rounded"
                    onSubmit={this.register}
                    ref={c => {
                        this.form = c;
                    }}>
                    {!this.state.isSuccess && (
                        <div className="px-4">
                            <h3 className="title mb-1">Sign Up</h3>
                            <div className="form-group mt-3">
                                <label>Role</label>
                                <Select
                                    type="text"
                                    name="role"
                                    className="form-control mt-1"
                                    placeholder="Enter role"
                                    value={this.state.role}
                                    onChange={this.onChangeRole}
                                    validations={[role]}
                                >
                                    <option>Please Select</option>
                                    {roles}                                    
                                </Select>
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <Input
                                    type="email"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required, email]}
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
                                    validations={[required, password]}
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
                                    <span>Sign Up</span>
                                </button>
                            </div>
                        </div>)}

                    {this.state.message && (
                        <div className="form-group">
                            <div
                                className={
                                    this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
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
    };
}

export default SignUp;