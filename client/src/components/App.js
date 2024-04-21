import React, { Component } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Experiment from "./Experiment/Experiment";
import VanishingRod from "./Experiment/VanishingRod";
import Homepage from "./Homepage/Homepage";

export class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route path='/experiment/1' element={<VanishingRod/>} />
                    <Route path='/experiment/2' element={<Experiment props={{exp_id:2}}/>} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
