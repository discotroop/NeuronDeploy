import React from "react";
import logo from "./NeuronLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroadcastTower,
  faUserAstronaut,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";


class FrontendNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-1">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/build">
                <img className="img" src={logo}></img>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                How it Works
              </a>
            </li>
          </ul>
        </nav>
    );
  }
}

export default FrontendNav;