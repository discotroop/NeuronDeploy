import React from "react";
import logo from "./howitworks.png";


class Graphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render meetin Description section with name, newsletter, edition, and date range
  // all passed in from MeetingSelector.js
  //w-100
  render() {
    return (
      
      <div className="meeting selection">
        <h2><b>How it works</b></h2>
        <img className="img-fluid" src={logo}></img>
      </div>
    );
  }
}

export default Graphic;
