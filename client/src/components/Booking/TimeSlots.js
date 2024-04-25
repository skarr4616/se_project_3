import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./timeslots.css";
import Time from "./Time";

export class TimeSlots extends Component {
    checkTime = (time) => {
        const currentTime = new Date();
        const currentTimeString = `${currentTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${currentTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        return currentTimeString > time;
    };

    generateGrid = () => {
        const grid = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                grid.push(
                    <Time
                        key={`${hour}-${minute}`}
                        date={this.props.date}
                        time={time}
                        isDisabled={
                            this.props.bookedSlots.includes(time + ":00") ||
                            this.checkTime(time)
                        }
                        handleButtonClick={this.props.handleButtonClick}
                        selectedTime={this.props.selectedTime}
                    />
                );
            }
        }

        return grid;
    };

    render() {
        return (
            <div className="main">
                <Container>
                    <Row>{this.generateGrid()}</Row>
                </Container>
                <div>
                    <Button
                        className="book"
                        onClick={this.props.handleBookingConfirmation}
                    >
                        Book
                    </Button>
                </div>
            </div>
        );
    }
}

export default TimeSlots;
