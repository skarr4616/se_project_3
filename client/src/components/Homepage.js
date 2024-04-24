import React, { Component } from "react";
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

    render() {
        return (
            <>
                {/* <Container>
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
                                        <Button variant="secondary">
                                            Book a Slot
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Row>
                </Container> */}
                <div>
                    Homepage
                </div>
            </>
        );
    }
}

export default Homepage;
