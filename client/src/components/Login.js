import React, { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        };

        fetch("/api/login", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Login successful");
                    return response.json();
                }
                else {
                    console.log("Login failed");
                    alert("Login failed");
                }
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                this.props.history("/");
            });
    };

    render() {
        if (localStorage.getItem("username") !== null) {
            return <Navigate to="/" />;
        }

        return (
            <div className="login-container">
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default (props) => <Login history={useNavigate()} />;
