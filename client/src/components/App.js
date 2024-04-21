import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar";
// src/App.js or your main index file


export class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </Router>
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
