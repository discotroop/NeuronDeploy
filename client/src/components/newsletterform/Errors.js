import React from "react";

class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "d-none" };
  }

  // See MeetingSelector.js for dismiss() functionality
  render() {
    return (
      <div
        className={`alert alert-primary alert-dismissible fade show ${this.props.display} w-50 mx-auto mt-3`}
      >
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="close"
          onClick={() => this.props.dismiss()}
        >
          &times;
        </button>
        <strong>Whoops</strong>! {this.props.errors}
      </div>
    );
  }
}

export default Errors;
