import React from "react";
import apiCalls from "../../../api/apiCalls";
import NewsletterDeleteButton from "./NewsletterDeleteButton";
import AddNewsletter from "./AddNewsletter";

// see buildNewsletter table around line 42
class Newsletters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // bind functions to this
    this.handleNewsletterDelete = this.handleNewsletterDelete.bind(this);
    this.getData = this.getData.bind(this);
  }

  // Call api route and set state to returned data
  getData() {
    apiCalls
      .getAllNewsletters()
      .then(newsletters => {
        this.setState({
          Newsletters: newsletters.data.data
        });
      })
      .catch(errors => console.log(errors));
  }
  // Get data when component loads
  componentDidMount() {
    this.getData();
  }

  handleNewsletterDelete(id) {
    // Call api to delete
    // geez just took an arrow function!
    apiCalls.deleteNewsletterById(id).then(() => this.getData());
  }

  render() {
    return (
      <div className="Newsletters">
        <div className="Newsletters-header">Newsletters</div>
        {/* <AddNewsletter update={() => this.getData()} /> */}
        {this.state.Newsletters ? (
          <div>
            {" "}
            <BuildNewsletterTable
              Newsletters={this.state.Newsletters}
              handleDelete={this.handleNewsletterDelete}
            />{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

// May split this into it's own file for maintainability later
class BuildNewsletterTable extends React.Component {
  render() {
    return (
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">URL</th>
              <th scope="col">ID</th>
              <th scope="col">Editions</th>
              <th scope="col">Subscribers</th>
              <th scope="col">Delete</th>
            </tr>
            {this.props.Newsletters.map(newsletter => (
              <tr className="table-light" key={newsletter._id}>
                <th scope="row">{newsletter.title}</th>
                <td>
                  <button> Contact </button>
                </td>
                <td>{newsletter.newsletter_URL}</td>
                <td>{newsletter._id}</td>
                <td>
                  <button>tbd</button>
                </td>
                <td>
                  <button>Subscribers</button>
                </td>
                <td>
                  <NewsletterDeleteButton
                    handleDelete={this.props.handleDelete}
                    id={newsletter._id}
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

// {this.state.apiResponse.name}

export default Newsletters;
