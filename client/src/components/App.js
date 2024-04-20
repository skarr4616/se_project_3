import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";

export class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
