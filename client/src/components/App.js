import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import Signup from "./Signup";
import Login from "./Login";
import Booking from "./Booking/Booking";
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
                    <Route path="/experiment/1" element={<VanishingRod />} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
