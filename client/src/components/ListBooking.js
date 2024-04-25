import React, { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../actions/authSlice";

import { Navbar, Nav } from "react-bootstrap";

export class ListBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.user.access}`,
            },
        };

        fetch("/api/user", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ bookings: data });
            });
    }

    handleLogout = () => {
        this.props.dispatch(logout());
        this.props.dispatch(reset());
        this.props.history("/");
    };

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand
                        className="mr-auto"
                        style={{ fontSize: "24px", fontWeight: "bold" }}
                    >
                        Remote Labs
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" style={{ fontSize: "18px" }}>
                            <Nav.Link>
                                {localStorage.getItem("username")}
                            </Nav.Link>
                            <Nav.Link onClick={this.handleLogout}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    <h1>Your Bookings</h1>
                    <ul>
                        {this.state.bookings.map((booking) => (
                            <li key={booking.booking_id}>
                                {booking.experiment_name} - {booking.slot_date}{" "}
                                - {booking.slot_time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default (props) => (
    <ListBooking
        history={useNavigate()}
        dispatch={useDispatch()}
        user={useSelector((state) => state.auth.user)}
    />
);
