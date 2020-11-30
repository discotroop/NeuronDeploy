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
  handleInput(e) {
    this.props.input(e.target.value);
  }
  render() {
    return (
        <form class="form-inline d-flex justify-content-center">
          <div class="input-group mb-3">
            <input type="email" name="email" id="email" type="text" class="form-control" placeholder="example@email.com" aria-label="Submit" aria-describedby="basic-addon1" onInput={e => this.handleInput(e)}></input>
            <div class="input-group-append">
              <button
                className="btn btn-warning btn-block"
                onClick={() => this.handleSubmit()}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </form>
    );
  }
}

export default SubmitButton;
