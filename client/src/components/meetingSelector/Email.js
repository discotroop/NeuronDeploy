import React from "react";

// Spin this out into own component ?
class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sample: "hi" };
  }
  handleInput(e) {
    this.props.input(e.target.value);
  }
  render() {
    return (
      <input
        type="email"
        name="email"
        id="email"
        className="w-50 border border-primary rounded"
        onInput={e => this.handleInput(e)}
      ></input>
    );
  }
}

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outline: "btn-outline-success" };
  }
  toggleStyle(e) {
    if (this.state.outline === "btn-outline-success") {
      this.setState({ outline: "btn-success" });
    } else {
      this.setState({ outline: "btn-outline-success" });
    }
  }

  render() {
    return (
      <div className="email-input mt-4">
        <label
          htmlFor="email"
          className="mr-1 font-weight-bold text-primary"
          onFocus={() => this.props.dismiss()}
        >
          {" "}
          Email:{" "}
        </label>
        <EmailInput input={this.props.input} />
      </div>
    );
  }
}

export default Email;
