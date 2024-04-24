import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import "./time.css";

export class Time extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col>
                <Button
                    className={
                        this.props.selectedTime === this.props.time
                            ? "selected"
                            : "time"
                    }
                    disabled={this.props.isDisabled}
                    onClick={this.props.handleButtonClick}
                >
                    {this.props.time}
                </Button>
            </Col>
        );
    }
}

export default Time;
