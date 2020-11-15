import React from "react";
import logo from "./howitworks.png";


class MeetingDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render meetin Description section with name, newsletter, edition, and date range
  // all passed in from MeetingSelector.js
  render() {
    return (
      <div>
        <h2><b>Choose your availability</b></h2>
        <p className="text-secondary">
          {" "}
          Please select at least 2. Times are local to you.{" "}
        </p>
      </div>
    );
  }
}

export default MeetingDescription;
