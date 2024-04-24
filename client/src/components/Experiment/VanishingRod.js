import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
            rod_state: "up",
        };
    }

    qpiRequest(e) {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.user.access}`,
            },
            body: JSON.stringify({ exp_id: 1, action: "v3", value: "0" }),
        };
        fetch("/api/exp", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

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
                }),
            };
            fetch("/api/exp", resuestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data));
        } else if (e.target.value === "Exit") {
            console.log("Exiting experiment");
            this.props.history("/");
        }
    };

    render() {
        return (
            <>
                <div class="container d-flex justify-content-center align-items-center mh-100 bg-sucess">
                    <div class="mw-100 p-3">
                        <p>Vanishing Rod Experiment</p>
                    </div>

                    <div class="mw-100 p-3">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=SiXViXzuqsNumNzw&autoplay=1"
                            title="YouTube video player"
                            frameborder="0"
                            allow="autoplay; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div class="mw-100 p-3">
                        <Button value="Up" onClick={this.handleControlClick}>
                            Up
                        </Button>
                        <Button value="Down" onClick={this.handleControlClick}>
                            Down
                        </Button>
                    </div>
                    <div class="mw-100 p-3">
                        <Button value="Exit" onClick={this.handleControlClick}>
                            Exit
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default (props) => (
    <VanishingRod
        history={useNavigate()}
        user={useSelector((state) => state.auth.user)}
    />
);
