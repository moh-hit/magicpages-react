import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  ADDCOMPANY,
  ADDCOMPANY_SUCCESS,
  ADDCOMPANY_FAILURE,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOADER_TRUE,
  LOADER_FALSE
} from "../constant";

export default class AuthAction {
  static Signup() {
    return {
      type: SIGNUP
    };
  }

  static SignupSuccess(payload) {
    return {
      type: SIGNUP_SUCCESS,
      payload
    };
  }

  static SignupFailure(error) {
    return {
      type: SIGNUP_FAILURE,
      error
    };
  }
  static AddCompany() {
    return {
      type: ADDCOMPANY
    };
  }

  static AddCompanySuccess(payload) {
    return {
      type: ADDCOMPANY_SUCCESS,
      payload
    };
  }

  static AddCompanyFailure(error) {
    return {
      type: ADDCOMPANY_FAILURE,
      error
    };
  }

  static Signin() {
    return {
      type: SIGNIN
    };
  }

  static SigninSuccess(payload) {
    return {
      type: SIGNIN_SUCCESS,
      payload
    };
  }

  static SigninFailure(error) {
    return {
      type: SIGNIN_FAILURE,
      error
    };
  }
  static LoaderTrue() {
    return {
      type: LOADER_TRUE
    };
  }

  static LoaderFalse() {
    return {
      type: LOADER_FALSE
    };
  }
}
