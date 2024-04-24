import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import Signup from "./Signup";
import Login from "./Login";
import Activate from "./Containers/Activate";
import ResetPassword from "./Containers/ResetPassword";
import ResetPasswordConfirm from "./Containers/ResetPasswordConfirm";
import Booking from "./Booking/Booking";
import ListBooking from "./ListBooking";
import VanishingRod from "./Experiment/VanishingRod";

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/book" element={<Booking />} />
                    <Route path="/bookings" element={<ListBooking />} />
                    <Route path="/experiment/1" element={<VanishingRod />} />
                </Routes>
            </Router>
        );
    }
}

export default App;

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);
