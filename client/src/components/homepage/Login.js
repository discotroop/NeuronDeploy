import React from "react";
import apiCalls from "../../api/apiCalls";
import { setInStorage, getFromStorage } from "../utils/storage";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpEmail: "",
      signUpPassword: ""
    };
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleEmailInput(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  handlePasswordInput(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  componentDidMount() {
    const obj = getFromStorage("sessionToken");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      apiCalls
        .verify({ token: token })
        .then(res => {
          let data = res.data;

          return data;
        })
        .then(data => {
          if (data) {
            this.setState({
              token: token,
              isLoading: false
            });
            this.props.history.push("/admin");
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  handleSignIn() {
    const { signInEmail, signInPassword } = this.state;
    this.setState({
      isLoading: true
    });
    apiCalls
      .loginUser({ email: signInEmail, password: signInPassword })
      .then(res => {
        let data = res.data;
        return data;
      })
      .then(data => {
        if (data) {
          setInStorage("sessionToken", { token: data.token });
          this.setState({
            signInError: data.message,
            isLoading: false,
            signInPassword: "",
            signInEmail: "",
            token: data.token
          });
          this.props.history.push("/admin");
        } else {
          this.setState({
            signInError: data.message,
            isLoading: false
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (!this.state.token) {
      return (
        <div>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.handleEmailInput}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.handlePasswordInput}
            />
            <br />
            <button onClick={() => this.handleSignIn()}>Sign In</button>
          </div>
          <br />
          <br />
        </div>
      );
    }
    return (
      <div>
        <p>Signed in</p>
      </div>
    );
  }
}

export default Login;
