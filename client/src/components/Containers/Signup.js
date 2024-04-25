import React, { Component } from "react";

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
            <div className="signup-container">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="First Name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        value={this.state.first_name}
                        onChange={this.handleFirstNameChange}
                        required
                    />
                    <label htmlFor="Last Name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={this.state.last_name}
                        onChange={this.handleLastNameChange}
                        required
                    />
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
                    <label htmlFor="password">Retype Password:</label>
                    <input
                        type="password"
                        id="re_password"
                        value={this.state.re_password}
                        onChange={this.handleRePasswordChange}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Signup;
