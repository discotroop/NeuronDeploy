import React from "react";
import apiCalls from "../../../api/apiCalls";

// Delete button should call function passed down from admin
class NewsletterDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.id);
  };

  render() {
    return <button onClick={() => this.handleDelete()}> X </button>;
  }
}

// {this.state.apiResponse.name}

export default NewsletterDeleteButton;
