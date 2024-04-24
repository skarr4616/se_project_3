import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/containers/Homepage";
import Login from "./components/containers/Login";
import Signup from "./components/containers/Signup";
import ResetPassword from "./components/containers/ResetPassword";
import ResetPasswordConfirm from "./components/containers/ResetPasswordConfirm";
import Activate from "./components/containers/Activate";
import Nav from "./components/Navbar";
import Dashboard from "./components/containers/Dashboard";

// src/App.js or your main index file

// import { Provider } from "react-redux";
// import store from "./store";

export class App extends Component {
    render() {
        return (
            <>
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Router>
                {/* <ToastContainer /> */}
            </>
        );
    }
}

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);
export default App;

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

// function App() {
//     return (
//       <>
//         <Router>
//           <Nav />
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Signup />} />
//             <Route path="/activate/:uid/:token" element={<Activate />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </Router>
//         {/* <ToastContainer /> */}
//       </>
//     )
//   }

// export default App;
