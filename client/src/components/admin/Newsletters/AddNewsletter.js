import React from "react";
import apiCalls from "../../../api/apiCalls";

// Delete button should call function passed down from admin
class AddNewsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  newsletterInputHandler(string) {
    this.setState({ newNewsletter: string });
  }

  handleInput(e) {
    this.newsletterInputHandler(e.target.value);
  }

  handleSubmit() {
    apiCalls
      .addNewsletter({ title: this.state.newNewsletter })
      .then(() => this.props.update());
  }

  render() {
    return (
      <div>
        <input
          type="title"
          name="title"
          id="newNewsletter"
          onInput={e => this.handleInput(e)}
        ></input>
        <button onClick={() => this.handleSubmit()}> Add newsletter </button>
      </div>
    );
  }
}

// {this.state.apiResponse.name}

export default AddNewsletter;
