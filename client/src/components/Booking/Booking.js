import React, { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Navbar } from "react-bootstrap";

import Sidebar from "./Sidebar";
import TimeSlots from "./TimeSlots";

export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            date: dayjs(new Date()),
            time: null,
            selectedOption: "Vanishing Rod",
            bookedSlots: [],
            experimentList: [
                "Vanishing Rod",
                "Conservation of Mechanical Energy",
                "Focal Length",
                "Titration",
                "Kirchhoff's Voltage Law",
                "Simple Pendulum",
            ],
            navigate: false,
        };
    }

    componentDidMount() {
        const code = this.getExperimentCode(this.state.selectedOption);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slot_date: this.state.date.format("YYYY-MM-DD"),
                experiment_code: code,
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
        this.getBookedSlots(e.target.value, this.state.date);
    };

    handleDateChange = (e) => {
        this.getBookedSlots(this.state.selectedOption, e);
    };

    handleButtonClick = (e) => {
        this.setState({ time: e.target.innerText });
    };

    handleBookingConfirmation = () => {
        const code = this.getExperimentCode(this.state.selectedOption);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                slot_date: this.state.date.format("YYYY-MM-DD"),
                slot_time: this.state.time,
                experiment_code: code,
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
            })
            .then(() => {
                this.props.history("/");
            });
    };

    getBookedSlots = (selectedOption, date) => {
        const code = this.getExperimentCode(selectedOption);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slot_date: date.format("YYYY-MM-DD"),
                experiment_code: code,
            }),
        };

        fetch("/api/list", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const newBookedSlots = data.map((slot) => slot.slot_time);
                this.setState({
                    date: date,
                    selectedOption: selectedOption,
                    time: null,
                    bookedSlots: newBookedSlots,
                });
            });
    };

    getExperimentCode = (selectedOption) => {
        let code = null;
        switch (selectedOption) {
            case "Vanishing Rod":
                code = "YQIBZF";
                break;
            case "Conservation of Mechanical Energy":
                code = "VVDRQD";
                break;
            case "Focal Length":
                code = "VCGMVA";
                break;
            case "Titration":
                code = "IYBLWO";
                break;
            case "Kirchhoff's Voltage Law":
                code = "AKXPQY";
                break;
            case "Simple Pendulum":
                code = "DJCIOO";
                break;
        }

        return code;
    };

    render() {
        console.log(this.state);

        if (!this.props.user) {
            return <Navigate to="/login" />;
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

export default (props) => (
    <Booking history={useNavigate()} user={localStorage.getItem("user")} />
);
