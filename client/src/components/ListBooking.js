import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export class ListBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            bookings: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch("/api/user?email=" + this.state.email, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ bookings: data });
            });
    }

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
                                {booking.experiment_code} -{" "}
                                {booking.booking_date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ListBooking;
