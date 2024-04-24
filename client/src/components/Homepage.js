import React, { Component } from "react";
import { Card, Nav, Button, Row, Navbar, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./homepage.css";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            experimentData: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch("/api/exp", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ experimentData: data });
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

    render() {
        console.log("Rendering homepage");
        console.log(this.state);

        if (!this.state.username) {
            return <Navigate to="/login" />;
        }

        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand
                            className="mr-auto"
                            style={{ fontSize: "24px", fontWeight: "bold" }}
                        >
                            Remote Labs
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link style={{ fontSize: "18px" }}>
                                    {this.state.username}
                                </Nav.Link>
                                {/* Add your logout functionality here */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <div className="d-flex flex-wrap justify-content-between">
                            {this.state.experimentData.map((card, index) => (
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

export default (props) => <Homepage history={useNavigate()} />;
