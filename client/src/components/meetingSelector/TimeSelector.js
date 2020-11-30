import React from "react";
import TimeColumn from "./TimeColumn";

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this is redundant ? just use this.props.dates.first ?
  getData() {
    this.setState({
      dates: this.props.dates
    });
  }

  componentWillMount() {
    this.getData();
  }
  render() {
    return (
      <div className="time-selection pb-5">
        <div className="container">
          <div className="row">
            <TimeColumn
              date={this.state.dates.first}
              timeHandler={this.props.timeHandler}
            />
            <TimeColumn
              date={this.state.dates.second}
              timeHandler={this.props.timeHandler}
            />
            <TimeColumn
              date={this.state.dates.third}
              timeHandler={this.props.timeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSelector;
