import React from "react";
import apiCalls from "../../../api/apiCalls";

// Delete button should call function passed down from admin
class AddEdition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editionInputHandler(string) {
    this.setState({ newEdition: string });
  }
  editionUrlInputHandler(string) {
    this.setState({ newsletterURL: string });
  }
  editionIdInputHandler(string) {
    this.setState({ newsletterID: string });
  }

  handleInput(e) {
    this.editionInputHandler(e.target.value);
  }
  handleUrlInput(e) {
    this.editionUrlInputHandler(e.target.value);
  }
  handleIdInput(e) {
    this.editionIdInputHandler(e.target.value);
  }

  handleSubmit() {
    apiCalls
      .addEdition({
        title: this.state.newEdition,
        newsletter_URL: this.state.newsletterURL,
        newsletter_id: this.state.newsletterID
      })
      .then(() => this.props.update());
    console.log(
      this.state.newEdition,
      this.state.newsletterURL,
      this.state.newsletterID
    );
  }

  render() {
    return (
      <div>
        {" "}
        change this
        <input
          placeholder="issue month/week"
          type="text"
          name="title"
          id="newEdition"
          onInput={e => this.handleInput(e)}
        ></input>
        <input
          placeholder="newsletter url"
          type="text"
          name="edition_type"
          id="editionType"
          onInput={e => this.handleUrlInput(e)}
        ></input>
        <input
          placeholder="news letter id"
          type="text"
          name="edition_type"
          id="editionType"
          onInput={e => this.handleIdInput(e)}
        ></input>
        <button onClick={() => this.handleSubmit()}> Add edition </button>
      </div>
    );
  }
}

export default AddEdition;
