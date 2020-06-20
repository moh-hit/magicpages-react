import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
} from "reactstrap";
import AuthMiddleware from "../../store/middlewares/AuthMiddleware";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFocus: false,
      passwordFocus: false,
      email: "testing2@gmail.com",
      password: "testing2123",
    };
  }

  SignIn = (e, email, password) => {
    e.preventDefault();
    if (email && password) {
      this.props.SignIn(email, password);
    }
  };

  render() {
    const { email, password, emailFocus, passwordFocus } = this.state;
    return (
      <>
        {console.log(localStorage.getItem("userId"))}
        <div className="container-login100">
          <div className="wrap-login100 p-b-160 p-t-50">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43">Account Login</span>
              <div
                className="wrap-input100 rs1 validate-input"
                data-validate="Email is required"
              >
                <input
                  placeholder="Enter Email"
                  onFocus={() => this.setState({ emailFocus: true })}
                  onBlur={() => this.setState({ emailFocus: false })}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  className="input100"
                  type="text"
                  name="Email"
                />
              </div>
              <div
                className="wrap-input100 rs2 validate-input"
                data-validate="Password is required"
              >
                <input
                  placeholder="Enter Password"
                  onFocus={() => this.setState({ passwordFocus: true })}
                  onBlur={() => this.setState({ passwordFocus: false })}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  className="input100"
                  type="password"
                  name="pass"
                />
              </div>
              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={(e) => this.SignIn(e, email, password)}
                  to="/admin/dashboard"
                >
                  Sign in
                </button>
              </div>

              <div className="text-center w-full p-t-23">
                <a href="/signUp-page" className="txt1">
                  Don't have an account? Create account!
                </a>
              </div>
              <div className="text-center w-full p-t-23">
                <a href="#" className="txt1">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    SignIn: (email, password) => {
      dispatch(AuthMiddleware.SignIn(email, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
