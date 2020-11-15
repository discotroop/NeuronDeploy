import React from "react";

class TimeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outline: "btn-outline-warning" };
  }

  // Handles buttons styling based on selected or not.
  toggleStyle(e) {
    if (this.state.outline === "btn-outline-warning") {
      this.setState({ outline: "btn-warning" });
    } else {
      this.setState({ outline: "btn-outline-warning" });
    }
  }

  // See MeetingSelector.js for timeHandler function.
  handleClick(e) {
    this.toggleStyle(e);
    this.props.timeHandler(
      this.props.data,
      this.props.timeslot,
      this.props.dayNumber
    );
  }
  render() {
    return (
      <button
        className={`btn btn-block ${this.state.outline}`}
        onClick={e => this.handleClick(e)}
        data={this.props.data}
        timeslot={this.props.timeslot}
      >
        {" "}
        {this.props.time}{" "}
      </button>
    );
  }
}

export default TimeButton;
