import React from "react";

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outline: "btn-outline-warning" };
  }
  // See MeetingSelector.js for dismiss() and submit()
  handleSubmit = () => {
    this.props.dismiss();
    this.props.submit();
  };
  render() {
    return (
      <div className="m-4">
        <button
          className="btn btn-warning btn-block w-50 mx-auto"
          onClick={() => this.handleSubmit()}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    );
  }
}

export default SubmitButton;
