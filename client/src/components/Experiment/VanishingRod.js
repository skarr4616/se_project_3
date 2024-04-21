import React, { Component } from "react";
import {useNavigate} from "react-router-dom";


class VanishingRod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rod_state: "up",
        };

        this.handleControlClick = this.handleControlClick.bind(this);

        // this.exp_id = props.props.exp_id;
    }
    handleControlClick(e) {
        // Add your logic to control the experiment here
        console.log("Control button clicked: " + e.target.value);
        if (e.target.value === "Up") {
            this.setState({ rod_state: "up" });
        } else if (e.target.value === "Down") {
            this.setState({ rod_state: "down" });
        } else if (e.target.value === "Exit") {
            // Add your logic to exit the experiment here
            console.log("Exiting experiment");
            this.props.history("/");
        }
    }


    render() {
        return (
            <>
                <div>
                    <div>
                        <div>
                            {/* Text column */}
                            <p>Vanishing Rod Experiment</p>
                        </div>
                        <div>
                            {/* Video embedding column */}
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=SiXViXzuqsNumNzw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        <div>
                            {/* Buttons and other controls column */}
                            <button value='Up' onClick={this.handleControlClick}>Up</button>
                            <button value='Down' onClick={this.handleControlClick}>Down</button>
                            {/* Add more buttons and controls as needed */}
                        </div>
                        <div>
                            <button value='Exit' onClick={this.handleControlClick}>Exit</button>
                        </div>
                    </div>

                </div>
            </>

        );
    }
}

export default (props) => (
    <VanishingRod history={useNavigate()} />
  );