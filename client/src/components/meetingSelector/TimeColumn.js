import React from "react";
import TimeButton from "./TimeButton";

class TimeColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({
      day: this.props.date.day.weekday,
      date1: this.props.date.times.data[0],
      date2: this.props.date.times.data[1],
      date3: this.props.date.times.data[2]
    });
  }
  render() {
    return (
      <div className="col-sm-6 col-md-6 col-lg-4 mt-1">
        <div className="col">
          {" "}
          <h6 className="text-center"> {this.props.date.shortName}</h6>{" "}
        </div>
        <div className="col">
          {" "}
          <TimeButton
            time={this.props.date.times.strings[0]}
            timeslot={1}
            dayNumber={this.state.day}
            data={this.state.date1}
            timeHandler={this.props.timeHandler}
            index={0}
          />
          <TimeButton
            time={this.props.date.times.strings[1]}
            timeslot={2}
            dayNumber={this.state.day}
            data={this.state.date2}
            timeHandler={this.props.timeHandler}
            index={1}
          />
          <TimeButton
            time={this.props.date.times.strings[2]}
            timeslot={3}
            dayNumber={this.state.day}
            data={this.state.date3}
            timeHandler={this.props.timeHandler}
            index={2}
          />
        </div>
      </div>
    );
  }
}

export default TimeColumn;
