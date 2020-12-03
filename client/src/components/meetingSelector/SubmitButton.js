import React from "react";

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outline: "btn-outline-warning" };
  }
  // See MeetingSelector.js for dismiss() and submit()
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dismiss();
    this.props.submit();
  };
  handleInput(e) {
    this.props.input(e.target.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} class="form-inline d-flex justify-content-center">
        <div class="input-group mb-3">
          <input type="email" name="email" id="email" type="text" class="form-control" placeholder="me@email.com" aria-label="Submit" aria-describedby="basic-addon1" onInput={e => this.handleInput(e)}></input>
          <div class="input-group-append">
            <button
              className="btn btn-warning btn-block"
            >
              {" "}Submit{" "}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SubmitButton;
