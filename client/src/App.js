import React from "react";
import "./App.css";
import TestAPI from "./testAPI";
import MeetingSelector from "./components/meetingSelector/MeetingSelector";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";
import Homepage from "./components/homepage/Homepage";
import Admin from "./components/admin/Admin";
import NewsletterForm from "./components/newsletterform/NewsletterForm";
import Faq from "./components/faq/Faq";
import Login from "./components/homepage/Login";
import { useAuthDataContext } from "./components/utils/Auth";
import Verify from "./components/utils/Verify";
import Chat from "./components/video-daily/Chat";


const PrivateRoute = ({ component, ...options }) => {
  const auth = Verify();
  console.log("auth", auth);

  let finalComponent = component;
  if (auth === false) {
    finalComponent = Login;
  }

  return <Route {...options} component={finalComponent} />;
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect exact="true" from="/" to="/home" />
          <Route exact path="/directory" component={Directory} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route path="/testAPI" component={TestAPI} />
          <Route path="/video" component={Chat} />
          <Route path="/chat/:chatID" component={Chat} />
          <Route
            path="/:NewsletterName/:Edition/:Article/:someEmail"
            component={MeetingSelector}
          />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route path="/select/:article" exact component={MeetingSelector} />
          <PrivateRoute path="/build" exact component={NewsletterForm} />
          <Route path="/faq" exact component={Faq} />
          {/* <Route path="/login" component={Login} /> */}
          }/>
        </Switch>
      </div>
    );
  }
}

export const Directory = () => (
  <div>
    <h1> Page Directory </h1>
    <div>
      <ul>
        <li>
          <Link to="/directory">Directory</Link>
        </li>
        <li>
          <Link to="/home">Sample Homepage</Link>
        </li>
        <li>
          <Link to="/testAPI">Test API connection</Link>
        </li>
        <li>
          <Link to="/NewsletterName/Edition/someEmail">Sample Date Picker</Link>
        </li>
        <li>
          <Link to="/admin">Sample Admin</Link>
        </li>
        <li>
          <Link to="/build"> Add Newsletter + articles </Link>
        </li>
        <li>
          <Link to="/faq"> Faq </Link>
        </li>
        <li>
          <Link to="/login"> Login </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default App;