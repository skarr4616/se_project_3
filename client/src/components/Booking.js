import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import dayjs from "dayjs";
import Sidebar from "./Sidebar";
import { Navbar } from "react-bootstrap";
import TimeSlots from "./TimeSlots";

export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            date: dayjs(new Date()),
            time: null,
            selectedOption: "Experiment 6",
            bookedSlots: [],
            experimentList: [
                "Experiment 1",
                "Experiment 2",
                "Experiment 3",
                "Experiment 4",
                "Experiment 5",
                "Experiment 6",
            ],
            navigate: false,
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slot_date: this.state.date.format("YYYY-MM-DD"),
            }),
        };

        fetch("/api/list", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const newBookedSlots = data.map((slot) => slot.slot_time);
                this.setState({ bookedSlots: newBookedSlots });
            });
    }

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };

    handleDateChange = (e) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slot_date: e.format("YYYY-MM-DD"),
            }),
        };

        fetch("/api/list", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const newBookedSlots = data.map((slot) => slot.slot_time);
                this.setState({
                    date: e,
                    time: null,
                    bookedSlots: newBookedSlots,
                });
            })
            .then(() => {
                return <Navigate to="/login" />;
            });
    };

    handleButtonClick = (e) => {
        this.setState({ time: e.target.innerText });
    };

    handleBookingConfirmation = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                slot_date: this.state.date.format("YYYY-MM-DD"),
                slot_time: this.state.time,
                experiment: this.state.selectedOption,
            }),
        };

        fetch("/api/book", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState((prevState) => {
                    return {
                        time: null,
                        bookedSlots: [...prevState.bookedSlots, data.slot_time],
                        navigate: true,
                    };
                });
            });
    };

    render() {
        console.log(this.state);

        if (this.state.email === null) {
            return <Navigate to="/login" />;
        }

        if (this.state.navigate) {
            return <Navigate to="/" />;
        }

        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand
                        className="mr-auto"
                        style={{ fontSize: "24px", fontWeight: "bold" }}
                    >
                        Remote Labs
                    </Navbar.Brand>
                </Navbar>
                <Sidebar
                    date={this.state.date}
                    handleDateChange={this.handleDateChange}
                    selectedOption={this.state.selectedOption}
                    experimentList={this.state.experimentList}
                    handleOptionChange={this.handleOptionChange}
                />
                <TimeSlots
                    selectedDate={this.state.date}
                    selectedTime={this.state.time}
                    bookedSlots={this.state.bookedSlots}
                    handleButtonClick={this.handleButtonClick}
                    handleBookingConfirmation={this.handleBookingConfirmation}
                />
            </div>
        );
    }
}

export default Booking;
