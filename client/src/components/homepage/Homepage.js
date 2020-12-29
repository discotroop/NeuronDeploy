import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Safe } from "react-safe";
// import Chat from "../chat/chat";
// import { Home } from "../../App";
import splash from "./splash.jpg";
import howitworks from "./howitworks.png";
import FrontendNav from "../frontend_nav/FrontendNav";

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
        <div className="home-card-container">
            <img className="img-fluid" src={splash}></img>
          
            <div className="col-md-10 m-auto center-block">
              <div className="card card-body text-center">
                <h4 className="small_header">
                  {" "}
                  The internet is a lonely place 
                  {" "}
                </h4>
                <p className="body">
                  {" "}
                  It's filled with incredible content that never ends! Countless articles, blogs, YouTube videos, forums, courses, tutorials, and books about whatever you're curious about. This well of information and knowledge is why the average person spends 6 hours and 42 minutes on the internet everyday. But while there's more capivating content than you could ever absorb, it's a remarkably lonely journey. There's no one there to share your discoveries with or talk through a challenging concept with. While there are an infinite number of interesting tutorials to try, there's no one to help you debug, explain, elaborate when you get stuck. There are fascinating podcasts to listen to, but every-time you share an episode with your friends you don't get a response. We will spend a quarter of our lives on the internet, and unless something changes we will spend the majority of that quarter alone.
                  {" "}
                </p>
                <h4 className="small_header">
                  Neuron's mission is to connect people around shared interests 
                </h4>
                <div className="how-it-works py-5">
                    <img className="img-fluid" src={howitworks}></img>
                </div>

                <div className="my-lg-0 py-3">
                  <a className="btn-warning btn-primary btn-lg" href="/login">
                    {" "}
                    Creator Login{" "}
                  </a>
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
