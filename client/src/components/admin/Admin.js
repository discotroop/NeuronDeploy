import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroadcastTower,
  faUserAstronaut,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Admin.css";
import Users from "./Users/Users";
import apiCalls from "../../api/apiCalls";
import Newsletters from "./Newsletters/Newsletters";
import Editions from "./Editions/Editions";
import Articles from "./Articles/Articles";
import { getFromStorage } from "../utils/storage";
import logo from "./NeuronLogo.png";

// To Do:
// handle newsletter creation
// hanlde page refresh failure on delete

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsletters: [],
      users: "",
      currentComponent: "Newsletters"
    };
  }

  /// Handle API calls and setting Data ///

  // Make API calls and set State
  getData() {
    apiCalls.getAllNewsletters().then(newsletters => {
      this.setState({
        newsletters: newsletters.data.data
      });
    });
  }
  // Call for data on component will mount
  componentWillMount() {
    this.getData();
  }

  /// Handle swapping components ///

  // Swap components based on user clicks or default views
  getComponent() {
    let component;
    switch (this.state.currentComponent) {
      case "Users":
        component = <Users />;
        break;
      case "Newsletters":
        component = <Newsletters newsletters={this.state.newsletters} />;
        break;
      case "Editions":
        component = <Editions />;
        break;
      case "Articles":
        component = <Articles />;
        break;
      default:
        component = <Users />;
    }
    return component;
  }
  // Swap table to users
  handleUserClick() {
    this.setState({
      currentComponent: "Users"
    });
  }
  // Swap table to newsletters
  handleNewsletterClick() {
    this.setState({
      currentComponent: "Newsletters"
    });
  }
  // Swap table to editions
  handleEditionClick() {
    this.setState({
      currentComponent: "Editions"
    });
  }
  // Swap table to articles
  handleArticleClick() {
    this.setState({
      currentComponent: "Articles"
    });
  }

  /// Pass everything to the DOM and hand down relevant functions + data ///

  render() {
    return (
      <div className="homepage">
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-0">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a className="nav-link" href="home">
                <img className="img" href="/home" src={logo}></img>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faUserAstronaut} size="1x" />
                Brendan
              </a>
            </li>
            <li className="nav-item">
              <a class="nav-link" href="/build">
                Build Links
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar border-right py-2">
          <ul className="sidebar-nav">
            <li className="nav-title border-bottom pb-2"> Menu</li>

            <li className="nav-item py-2">
              <a
                className="text-success"
                onClick={() => this.handleUserClick()}
              >
                {" "}
                Users{" "}
              </a>
            </li>
            <li className="nav-item py-2">
              <a
                className="text-success"
                onClick={() => this.handleNewsletterClick()}
              >
                {" "}
                Newsletters{" "}
              </a>
            </li>
            <li className="nav-item py-2">
              <a
                className="text-success"
                onClick={() => this.handleEditionClick()}
              >
                {" "}
                Editions{" "}
              </a>
            </li>
            <li className="nav-item py-2">
              <a
                className="text-success"
                onClick={() => this.handleArticleClick()}
              >
                {" "}
                Articles{" "}
              </a>
            </li>
          </ul>
        </div>
        <div className="content">
          <div>{this.getComponent()}</div>
        </div>
      </div>
    );
  }
}

// {this.state.apiResponse.name}

export default Admin;
