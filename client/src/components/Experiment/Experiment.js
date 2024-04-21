import React, { Component } from "react";


class Experiment extends Component {
    constructor(props) {
        super(props);
        this.exp_id = props.props.exp_id;
    }

    render() {
        return (
            <>
                <div>
                    <div>
                        <div>
                            {/* Text column */}
                            <p>Experiment {this.exp_id}</p>
                        </div>
                        <div>
                            {/* Video embedding column */}
                            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            {/* Buttons and other controls column */}
                            <button>Button 1</button>
                            <button>Button 2</button>
                            {/* Add more buttons and controls as needed */}
                        </div>
                    </div>

                </div>
            </>

        );
    }
}

export default Experiment;