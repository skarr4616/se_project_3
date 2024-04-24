import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Activate from "./containers/Activate";

import Layout from "./Layout";
// src/App.js or your main index file

import { Provider } from "react-redux";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;

// export class App extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <Router>
//                     <Layout>
//                         <Routes>
//                             <Route path="/" element={<Home />} />
//                             <Route path="/login" element={<Login />} />
//                             <Route path="/signup" element={<Signup />} />
//                             <Route path="/reset-password" element={<ResetPassword />} />
//                             <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
//                             <Route path="/activate/:uid/:token" element={<Activate />} />
//                         </Routes>
//                     </Layout>
//                 </Router>
//             </Provider>
//         );
//     }
// }

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);

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
