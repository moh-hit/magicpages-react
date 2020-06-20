import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
} from "reactstrap";

import AuthMiddleware from "../../store/middlewares/AuthMiddleware";
import AddCompany from "./AddCompany";
import axios from "axios";

class SignUpPage extends React.Component {
  state = {
    fullNameFocus: false,
    emailFocus: false,
    businessFocus: false,
    passwordFocus: false,
    companyFocus: false,
    company: "",
    fullName: "",
    email: "",
    password: "",
    modal: false,
    companies: [],
  };

  SignUp = (e, fullName, email, password, company) => {
    console.log("SIGN UP FUNCTION");
    console.log(fullName, email, password, company);

    e.preventDefault();
    if (fullName && email && password && company) {
      this.props.SignUp(fullName, email, password, company);
    }
  };

  componentDidMount() {
    axios.get("http://magicpages.propstory.com/getCompanies").then((res) => {
      this.setState({ companies: res.data.companies });
    });
  }

  render() {
    const {
      fullName,
      email,
      password,
      company,
      emailFocus,
      passwordFocus,
      modal,
    } = this.state;
    return (
      <>
        <div className="container-login100">
          <div className="wrap-login100 p-b-160 p-t-50 pl-5 pr-5">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43">
                Sign up your account
              </span>
              <div
                className="signupwrap-input100 rs1 validate-input"
                data-validate="Name is required"
              >
                <input
                  placeholder="Enter Full Name"
                  onFocus={() => this.setState({ fullNameFocus: true })}
                  onBlur={() => this.setState({ fullNameFocus: false })}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                  className="input100"
                  type="text"
                  name="Name"
                />
              </div>
              <div
                className="signupwrap-input100  validate-input"
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
                className="signupwrap-input100  validate-input"
                data-validate="Company is required"
              >
                <Input
                  type="select"
                  onFocus={() => this.setState({ companyFocus: true })}
                  onBlur={() => this.setState({ companyFocus: false })}
                  onChange={(e) => this.setState({ company: e.target.value })}
                  className="companyDrop"
                  name="Company"
                  id="exampleSelect"
                >
                  <option value="">-- Select Company --</option>
                  {this.state.companies &&
                    this.state.companies.map((company) => {
                      return (
                        <option value={company._id}>{company.name}</option>
                      );
                    })}
                </Input>
                {/* <input
                  placeholder="Enter Company Name"
                  onFocus={() => this.setState({ companyFocus: true })}
                  onBlur={() => this.setState({ companyFocus: false })}
                  onChange={(e) => this.setState({ company: e.target.value })}
                  className="input100"
                  type="text"
                  name="Company"
                /> */}
              </div>
              <div
                className="signupwrap-input100 rs2 validate-input"
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
                  onClick={(e) =>
                    this.SignUp(e, fullName, email, password, company)
                  }
                  to="/login-page"
                >
                  Sign up
                </button>
              </div>
              <div className="text-center w-full p-t-23">
                <a href="/login-page" className="txt1">
                  Already have an account? Sign in!
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
    SignUp: (fullName, email, password, company) => {
      dispatch(AuthMiddleware.SignUp(fullName, email, password, company));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
