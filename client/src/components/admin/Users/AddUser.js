import React from "react";
import apiCalls from "../../../api/apiCalls";

// Delete button should call function passed down from admin
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userInputHandler(string) {
    this.setState({ newUser: string });
  }
  userTypeInputHandler(string) {
    this.setState({ userType: string });
  }

  handleInput(e) {
    this.userInputHandler(e.target.value);
  }
  handleTypeInput(e) {
    this.userTypeInputHandler(e.target.value);
  }

  handleSubmit() {
    apiCalls
      .addUser({ email: this.state.newUser, user_type: this.state.userType })
      .then(() => this.props.update());
  }

  render() {
    return (
      <div>
        {" "}
        change this
        <input
          placeholder="email"
          type="email"
          name="title"
          id="newUser"
          onInput={e => this.handleInput(e)}
        ></input>
        <input
          placeholder="participant, author or admin"
          type="text"
          name="user_type"
          id="userType"
          onInput={e => this.handleTypeInput(e)}
        ></input>
        <button onClick={() => this.handleSubmit()}> Add user </button>
      </div>
    );
  }
}

export default AddUser;
