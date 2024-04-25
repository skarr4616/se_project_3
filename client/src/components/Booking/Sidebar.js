import React, { Component } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./sidebar.css";

export class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="calender">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={this.props.date}
                            onChange={this.props.handleDateChange}
                            views={["year", "month", "day"]}
                            disablePast={true}
                        />
                    </LocalizationProvider>
                </div>
                <div className="experiment">
                    <select
                        value={this.props.selectedOption}
                        onChange={this.props.handleOptionChange}
                    >
                        {this.props.experimentList.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default Sidebar;
