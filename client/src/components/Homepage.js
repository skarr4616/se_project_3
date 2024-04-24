import React, { Component } from "react";
import {
    Card,
    Nav,
    Button,
    Row,
    Navbar,
    Container,
    Form,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./homepage.css";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experimentData: [],
            displayData: [],
            searchString: "",
        };
    }

    componentDidMount() {
        // const requestOptions = {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        // };

        // fetch("/api/exp?action=list", requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         this.setState({ experimentData: data, displayData: data });
        //     });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.user}`,
            },
        };

        fetch("/auth/users/me/", config)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    handleBookButton = (e) => {
        this.props.history("/book");
    };

    handleStartButton = (e) => {
        switch (e.target.value) {
            case "YQIBZF":
                const requestOptions = {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                };

                fetch("/api/exp?exp_code=YQIBZF&action=status", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data == "1") {
                            console.log("Entering Experiment");
                            this.props.history("/experiment/1");
                        } else {
                            alert("Experiment is Offline");
                        }
                    });
                break;
        }
    };

    handleSearchChange = (e) => {
        const searchString = e.target.value;
        this.setState({ searchString });

        if (searchString === "") {
            this.setState({ displayData: this.state.experimentData });
            return;
        }

        const filteredData = this.state.experimentData.filter(
            (card) =>
                card.experiment_name
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) ||
                card.experiment_description
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
        );

        this.setState({ displayData: filteredData });
    };

    listUserBookings = () => {
        this.props.history("/bookings");
    };

    handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        this.props.history("/login");
    };

    render() {
        console.log("Rendering homepage");
        console.log(this.state);

        if (!this.props.user) {
            return <Navigate to="/login" />;
        }

        return (
            <>
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
                            <Nav.Link>{this.state.username}</Nav.Link>
                            <Nav.Link onClick={this.handleLogout}>
                                Logout
                            </Nav.Link>
                            <Nav.Link onClick={this.listUserBookings}>
                                My Bookings
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={this.state.searchString}
                            onChange={this.handleSearchChange}
                        />
                    </Form>
                </Navbar>
                <div>
                    <Container>
                        <Row>
                            <div className="d-flex flex-wrap justify-content-between">
                                {this.state.displayData.map((card, index) => (
                                    <Card
                                        key={index}
                                        style={{
                                            width: "30%",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title>
                                                {card.experiment_name}
                                            </Card.Title>
                                            <Card.Text>
                                                {card.experiment_description}
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                className="mr-2"
                                                value={card.experiment_code}
                                                onClick={this.handleStartButton}
                                            >
                                                Start
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Row>
                    </Container>
                </div>
                <div className="book-button-div">
                    <Button
                        className="book-button"
                        onClick={this.handleBookButton}
                    >
                        Book a Slot
                    </Button>
                </div>
            </>
        );
    }
}

export default (props) => (
    <Homepage history={useNavigate()} user={localStorage.getItem("access")} />
);
