import React, { Component } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            re_password: "",
        };
    }

    handleFirstNameChange = (e) => {
        this.setState({ first_name: e.target.value });
    };

    handleLastNameChange = (e) => {
        this.setState({ last_name: e.target.value });
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleRePasswordChange = (e) => {
        this.setState({ re_password: e.target.value });
    };

    handleLogin = () => {
        this.props.history("/login");
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.re_password) {
            alert("Passwords do not match");
        } else {
            const userData = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                re_password: this.state.re_password,
            };

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            };

            fetch("/auth/users/", requestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    render() {
        return (
            <div className="login-signup-container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.handleFirstNameChange}
                        />
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.handleLastNameChange}
                        />
                    </div>
                    <div className="input">
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.re_password}
                            onChange={this.handleRePasswordChange}
                        />
                    </div>
                </div>
                <div className="login">
                    Already have an account?{" "}
                    <span onClick={this.handleLogin}>Log In</span>
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={this.handleSubmit}>
                        Register
                    </div>
                </div>
            </div>
        );
    }
}

export default (props) => <Signup history={useNavigate()} />;
