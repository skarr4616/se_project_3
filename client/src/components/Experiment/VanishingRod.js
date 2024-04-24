import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./vanish.css";

class VanishingRod extends Component {
    constructor(props) {
        super(props);
        this.Ref = React.createRef();

        // The state for our timer
        this.state = {
            timer: "00:00:00",
        };


    }

    getTimeRemaining = (e) => {
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
        let { total, hours, minutes, seconds } = this.getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            this.setState({
                timer:
                    (hours > 9 ? hours : "0" + hours) +
                    ":" +
                    (minutes > 9 ? minutes : "0" + minutes) +
                    ":" +
                    (seconds > 9 ? seconds : "0" + seconds),
            });
        }
        else {
            clearInterval(this.Ref.current);
            this.handleExit();

        }
    };

    clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        this.setState({ timer: "00:00:00" });
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec

        const id = setInterval(() => {
            this.startTimer(e);
        }, 1000);

        this.Ref.current = id;

    };

    // We can use componentDidMount so that when the component
    // mount the timer will start as soon as possible
    componentDidMount() {
        let start_time = localStorage.getItem("timer");
        let deadline = new Date(start_time);
        deadline.setSeconds(deadline.getSeconds() + 10);
        this.clearTimer(deadline);
    }

    handleExit = (e) => {
        console.log("Exiting experiment");
        const resuestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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
    handleControlClick = (e) => {
        if (e.target.value === "Up") {
            const resuestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    exp_id: "YQIBZF",
                    action: "v3",
                    value: "0",
                    method: 'blynk',
                }),
            };
            fetch("/api/exp", resuestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));

        } else if (e.target.value === "Down") {
            const resuestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    exp_id: "YQIBZF",
                    action: "v3",
                    value: "1",
                    method: 'blynk',
                }),
            };
            fetch("/api/exp", resuestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));

        } else {
            console.log("Invalid Input");
        }
    };

    render() {
        return (
            <>

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

                            <li>Use the Up and Down arrows in the control widget to control the position of the glass rods.
                                You can do this multiple times to see the rod vanishing in the left beaker containing
                                sunflower oil while it remains clearly visible in the right beaker containing water.</li>
                        </ul>
                    </div>
                    <label id="inst">Instructions</label>
                </nav>
                <div class="range1">
                    <nav class="navbar">
                        <a id="focal_head" href="#focal">Vanishing Rod</a>
                        <a id="session" type="button" onClick={this.handleExit} >Leave Session</a>
                        <a id="demo">{this.state.timer}</a>
                    </nav>
                    <div class="slidervalue1">
                        <span id="us">0</span>
                    </div>

                    <div class="field1">
                        <div class="value left">Up</div>
                        <div class="value right">Down</div>
                    </div>
                    <button type="button" value="Down" onClick={this.handleControlClick} class="btn_plus" id="btn_plus1">▼</button>
                    <button type="button" value="Up" onClick={this.handleControlClick} class="btn_minus" id="btn_minus1">▲</button>
                    <div class="stream">
                        <iframe
                            width="640" height="360"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=SiXViXzuqsNumNzw&autoplay=1"
                            title="YouTube video player"
                            frameborder="0"
                            allow="autoplay; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>

                    </div>
                </div>
            </>
        );
    }
}

export default (props) => <VanishingRod history={useNavigate()} />;
