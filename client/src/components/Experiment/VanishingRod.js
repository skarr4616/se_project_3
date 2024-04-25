import React, { Component } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./vanish.css";
import {
    Card,
    Button,
    Nav,
    Row,
    Navbar,
    Col,
    Container,
} from "react-bootstrap";

class VanishingRod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: "00:00:00",
        };
        this.Ref = React.createRef();
    }

    componentDidMount() {
        if (!this.props.user) {
            return <Navigate to="/login" />;
        }

        let start_time = localStorage.getItem("timer");
        let deadline = new Date(start_time);
        deadline.setSeconds(deadline.getSeconds() + 10);
        this.clearTimer(deadline);
    }

    getRemainingTime = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    startTimer = (e) => {
        const { total, hours, minutes, seconds } = this.getRemainingTime(e);
        if (total >= 0) {
            this.setState({
                timer:
                    (hours > 9 ? hours : "0" + hours) +
                    ":" +
                    (minutes > 9 ? minutes : "0" + minutes) +
                    ":" +
                    (seconds > 9 ? seconds : "0" + seconds),
            });
        } else {
            clearInterval(this.Ref.current);
            this.handleExit();
        }
    };

    clearTimer = (deadline) => {
        this.setState({ timer: "00:00:00" });

        const id = setInterval(() => {
            this.startTimer(deadline);
        }, 1000);

        this.Ref.current = id;
    };

    handleControlClick = (e) => {
        if (e.target.value === "Up") {
            const resuestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.props.user.access}`,
                },
                body: JSON.stringify({
                    exp_id: "YQIBZF",
                    action: "v3",
                    value: "0",
                    method: "blynk",
                }),
            };
            fetch("/api/exp", resuestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));
        } else if (e.target.value === "Down") {
            const resuestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.props.user.access}`,
                },
                body: JSON.stringify({
                    exp_id: "YQIBZF",
                    action: "v3",
                    value: "1",
                    method: "blynk",
                }),
            };
            fetch("/api/exp", resuestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));
        } else {
            console.log("Invalid Input");
        }
    };

    handleExit = () => {
        console.log("Exiting experiment");
        const resuestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.user.access}`,
            },
            body: JSON.stringify({
                exp_id: "YQIBZF",
                action: "status",
                value: "exit",
                method: "status",
            }),
        };

        fetch("/api/exp", resuestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));

        this.props.history("/");
    };

    render() {
        if (!this.props.user) {
            return <Navigate to="/login" />;
        }

        return (
            <div id='bb'>
                <nav role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />

                        <span></span>
                        <span></span>
                        <span></span>

                        <ul id="menu">
                            <div class="up_half">
                                <h2>How to use this dashboard</h2>
                            </div>

                            <li>
                                Use the Up and Down arrows in the control widget
                                to control the position of the glass rods. You
                                can do this multiple times to see the rod
                                vanishing in the left beaker containing
                                sunflower oil while it remains clearly visible
                                in the right beaker containing water.
                            </li>
                        </ul>
                    </div>
                    <label id="inst">Instructions</label>
                </nav>
                <div class="range1">
                    <nav class="navbar" id="navs">
                        <a id="focal_head" href="#focal">
                            Vanishing Rod
                        </a>
                        <a id="session" type="button" onClick={this.handleExit}>
                            Leave Session
                        </a>
                        <a id="demo">{this.state.timer}</a>
                    </nav>
                    <div class="slidervalue1">
                        <span id="us">0</span>
                    </div>

                    <div class="field1">
                        <div class="value left">Up</div>
                        <div class="value right">Down</div>
                    </div>
                    <button
                        type="button"
                        value="Down"
                        onClick={this.handleControlClick}
                        class="btn_plus"
                        id="btn_plus1"
                    >
                        ▼
                    </button>   
                    <button
                        type="button"
                        value="Up"
                        onClick={this.handleControlClick}
                        class="btn_minus"
                        id="btn_minus1"
                    >
                        ▲
                    </button>
                    <div class="stream">
                        <iframe
                            width="640"
                            height="360"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=SiXViXzuqsNumNzw&autoplay=1"
                            title="YouTube video player"
                            frameborder="0"
                            allow="autoplay; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default (props) => (
    <VanishingRod
        history={useNavigate()}
        user={useSelector((state) => state.auth.user)}
    />
);
