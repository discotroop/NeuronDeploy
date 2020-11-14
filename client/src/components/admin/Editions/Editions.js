import React from "react";
import apiCalls from "../../../api/apiCalls";
import AddEdition from "./AddEdition";
import EditionDeleteButton from "./EditionDeleteButton";

class Editions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Editions: []
    };
    // bind delete for passing down
    this.handleEditionDelete = this.handleEditionDelete.bind(this);
  }
  // Call api for Editions
  getData() {
    apiCalls
      .getAllEditions()
      .then(editions => {
        this.setState({
          Editions: editions.data.data
        });
      })
      .catch(errors => console.log(errors));
  }
  // Get data when component loads
  componentDidMount() {
    this.getData();
  }

  handleEditionDelete(id) {
    apiCalls
      .deleteEditionById(id)
      .then(() => this.getData())
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="editions">
        <div className="editions-header">Editions</div>
        {/* allows flexibility on how add edition works */}
        {/* <AddEdition update={() => this.getData()} /> */}
        <div>
          {" "}
          <BuildEditionTable
            editions={this.state.Editions}
            handleDelete={this.handleEditionDelete}
          />{" "}
        </div>
      </div>
    );
  }
}

// Should probably be in its own file but this is fine
class BuildEditionTable extends React.Component {
  render() {
    return (
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Delete</th>
            </tr>
            {this.props.editions.map(edition => (
              <tr className="table-light" key={edition._id}>
                <th scope="row">{edition.title}</th>
                <td>
                  <button> hi </button>
                </td>
                <td>
                  <button> by </button>
                </td>
                <td>
                  <EditionDeleteButton
                    handleDelete={this.props.handleDelete}
                    id={edition._id}
                  />
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

export default Editions;
