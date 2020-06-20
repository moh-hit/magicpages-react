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

const initialStates = {
  user: {},
  companyCredentials: {},
  error: {},
  loader: false
};

export default function AuthReducer(state = initialStates, action) {
  switch (action.type) {
    case SIGNIN:
      state = {
        user: {},
        ...state,
        error: {},
        loader: true
      };
      break;

    case SIGNIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        error: {},
        loader: false
      };
      break;

    case SIGNIN_FAILURE:
      state = {
        ...state,
        user: {},
        error: action.error,
        loader: false
      };
      break;

    case SIGNUP:
      state = {
        ...state,
        user: {},
        error: {},
        loader: true
      };
      break;

    case SIGNUP_SUCCESS:
      // console.log("reducer payload", action.payload);

      state = {
       ...state,
        user: action.payload,
        error: {},
        loader: false
      };
      break;

    case SIGNUP_FAILURE:
      state = {
        ...state,
        user: {},
        error: action.error,
        loader: false
      };
      break;
    case ADDCOMPANY:
      state = {
        ...state,
        companyCredentials: {},
        error: {},
        loader: true
      };
      break;

    case ADDCOMPANY_SUCCESS:
      console.log("add company payload", action.payload);

      state = {
        ...state,
        companyCredentials: action.payload,
        error: {},
        loader: false
      };
      break;

    case ADDCOMPANY_FAILURE:
      state = {
        ...state,
        companyCredentials: {},
        error: action.error,
        loader: false
      };
      break;
    case LOADER_TRUE:
      state = {
        ...state,
        loader: true
      };
      break;

    case LOADER_FALSE:
      state = {
        ...state,
        loader: false
      };
      break;

    default:
      break;
  }
  return state;
}
