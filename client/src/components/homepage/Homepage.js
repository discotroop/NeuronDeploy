import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Safe } from "react-safe";
// import Chat from "../chat/chat";
// import { Home } from "../../App";

// To do
// build out smaller components for greater control
// populate items from state

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div className="homepage">
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-0">
          <a className="navbar-brand" href="/home">
            <FontAwesomeIcon icon={faBroadcastTower} size="1.5x" />
          </a>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/faq">
                FAQ
              </a>
            </li>
            {/* add more links later */}
          </ul>
          <div className="my-lg-0">
            <a className="btn btn-secondary btn-sm" href="/login">
              {" "}
              Login{" "}
            </a>
          </div>
        </nav>

        <div className="home-card-container py-3">
          <div className="row mx-auto">
            <div className="col-md-8 m-auto center-block">
              <div className="card card-body text-center">
                <div className="text-center mx-auto">
                  <FontAwesomeIcon icon={faBroadcastTower} size="5x" />
                </div>
                <h3 className="text-center mb-3 text-warning font-weight-bold">
                  {" "}
                  Neuron{" "}
                </h3>
                <hr></hr>
                <div className="about">
                  <h4 className="font-weight-bold"> About </h4>
                  <p className="text-dark">
                    {" "}
                    Neuron is helping curious people engage with each other on
                    the topics they care about ... Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.{" "}
                  </p>
                </div>
                <hr></hr>
                <div className="how-it-works">
                  <h5 className="text-center font-weight-bold">
                    {" "}
                    How it works{" "}
                  </h5>
                  <div className="jumbotron"> graphic </div>
                  <p>
                    {" "}
                    Possible further explanation of the graph ... Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// {this.state.apiResponse.name}

export default Homepage;
