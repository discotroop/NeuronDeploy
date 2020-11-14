import React from "react";
import { Link } from "react-router-dom";

class TestAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "no connection" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div>
        {this.state.apiResponse}

        <div>
          <Link to="/">Directory</Link>
        </div>
      </div>
    );
  }
}

export default TestAPI;
