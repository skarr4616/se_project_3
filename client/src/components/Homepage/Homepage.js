import React, { Component } from "react";
import {useNavigate} from "react-router-dom";

import {
    Card,
    Button,
    Nav,
    Row,
    Navbar,
    Col,
    Container,
} from "react-bootstrap";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.exp_id= "0";
        
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick(e){
        this.exp_id = e.target.value;
        console.log("Starting experiment with id: "+this.exp_id);
        this.props.history("/experiment/"+this.exp_id);

    }
    cardsData = [
        {  
            id: "1",
            title: "Experiment 1",
            description: "Description for card 1",
        },
        {
            id: "2",
            title: "Experiment 2",
            description: "Description for card 2",
        },
        {
            id: "3",
            title: "Experiment 3",
            description: "Description for card 3",
        },
        {
            id: "4",
            title: "Experiment 4",
            description: "Description for card 4",
        },
        {
            id: "5",
            title: "Experiment 5",
            description: "Description for card 5",
        },
        {
            id: "6",
            title: "Experiment 6",
            description: "Description for card 6",
        },
    ];

    render() {
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
                                    Profile
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
                                            value = {card.id}
                                            onClick={this.handleButtonClick}
                                        >
                                            Start
                                        </Button>
                                        <Button variant="secondary">
                                            Book a Slot
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default (props) => (
    <Homepage history={useNavigate()} />
  );