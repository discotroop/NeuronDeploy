import React from "react";
import apiCalls from "../../../api/apiCalls";
import AddUser from "./AddUser";
import UserDeleteButton from "./UserDeleteButton";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: []
    };
    // bind delete for passing down
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }
  // Call api for Users
  getData() {
    apiCalls
      .getAllUsers()
      .then(users => {
        this.setState({
          Users: users.data.data
        });
      })
      .catch(errors => console.log(errors));
  }
  // Get data when component loads
  componentDidMount() {
    this.getData();
  }

  handleUserDelete(id) {
    apiCalls.deleteUserById(id).then(() => this.getData());
  }

  render() {
    return (
      <div className="users">
        <div className="users-header">Users</div>
        {/* allows flexibility on how add user works */}
        {/* <AddUser update={() => this.getData()} /> */}
        <div>
          {" "}
          <BuildUserTable
            users={this.state.Users}
            handleDelete={this.handleUserDelete}
          />{" "}
        </div>
      </div>
    );
  }
}

// Should probably be in its own file but this is fine
class BuildUserTable extends React.Component {
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
            {this.props.users.map(user => (
              <tr className="table-light" key={user._id}>
                <th scope="row">{user.name}</th>
                <td>{user.email}</td>
                <td>{user.user_type}</td>
                <td>
                  <UserDeleteButton
                    handleDelete={this.props.handleDelete}
                    id={user._id}
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

export default Users;
