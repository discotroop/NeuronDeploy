import React from "react";

// Delete button should call function passed down from admin
class EditionDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDelete = () => {
    console.log(this.props.id);
    this.props.handleDelete(this.props.id);
  };

  render() {
    return <button onClick={() => this.handleDelete()}> X </button>;
  }
}

export default EditionDeleteButton;
