import React, { Component } from "react";
import { Card, Nav, Button, Row, Navbar, Container } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import "./homepage.css";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            navigateBook: false,
        };
    }

    cardsData = [
        {
            title: "Experiment 1",
            description: "Description for card 1",
        },
        {
            title: "Experiment 2",
            description: "Description for card 2",
        },
        {
            title: "Experiment 3",
            description: "Description for card 3",
        },
        {
            title: "Experiment 4",
            description: "Description for card 4",
        },
        {
            title: "Experiment 5",
            description: "Description for card 5",
        },
        {
            title: "Experiment 6",
            description: "Description for card 6",
        },
    ];

    handleBookButton = (e) => {
        this.setState({
            navigateBook: true,
        });
    };

    render() {
        console.log("Rendering homepage");

        if (!this.state.username) {
            return <Navigate to="/login" />;
        }

        if (this.state.navigateBook) {
            return <Navigate to="/book" />;
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
                            {this.cardsData.map((card, index) => (
                                <Card
                                    key={index}
                                    style={{
                                        width: "30%",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Text>
                                            {card.description}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            className="mr-2"
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

export default Homepage;
