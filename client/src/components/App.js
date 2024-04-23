import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar";
import { useState } from "react";
import cookies from "universal-cookie";
import Home from "./Homepage/Homepage";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import ResetPassword from "../containers/ResetPassword";
import ResetPasswordConfirm from "../containers/ResetPasswordConfirm";



import Layout from "../Layout";
// src/App.js or your main index file

import { Provider } from "react-redux";
import store from "../store";

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                            <Route path="/activate/:uid/:token" element={<Activate />} />
                        </Routes>
                    </Layout>
                </Router>
            </Provider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

// export default function App(){
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Navbar />} />
//             </Routes>
//         </Router>
//     );
// };

// // export default App;
