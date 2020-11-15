import React from "react";

// Delete button should call function passed down from admin
class ArticleDeleteButton extends React.Component {
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

export default ArticleDeleteButton;
