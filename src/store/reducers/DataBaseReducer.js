import {
  GETTEMPLATES,
  GETTEMPLATES_SUCCESS,
  GETTEMPLATES_FAILURE,
  UPLOADTEMPLATES,
  UPLOADTEMPLATES_SUCCESS,
  UPLOADTEMPLATES_FAILURE,
  GETPAGES,
  GETPAGES_SUCCESS,
  GETPAGES_FAILURE
} from "../constant";

const initialStates = {
  templates: [],
  uploadedTemplate: {},
  pages: [],
  loader: false
};

export default function DataBaseReducer(state = initialStates, action) {
  switch (action.type) {
    case GETTEMPLATES:
      state = {
        ...state,
        templates: {},
        error: {},
        loader: true
      };
      break;

    case GETTEMPLATES_SUCCESS:
      state = {
        ...state,
        templates: action.payload,
        error: {},
        loader: false
      };
      break;

    case GETTEMPLATES_FAILURE:
      state = {
        ...state,
        templates: {},
        error: action.error,
        loader: false
      };
      break;
    case UPLOADTEMPLATES:
      state = {
        ...state,
        uploadedTemplate: {},
        error: {},
        loader: true
      };
      break;

    case UPLOADTEMPLATES_SUCCESS:
      console.log("Add template payload", action.payload);
      state = {
        ...state,
        uploadedTemplate: action.payload,
        error: {},
        loader: false
      };
      break;

    case UPLOADTEMPLATES_FAILURE:
      state = {
        ...state,
        uploadedTemplate: {},
        error: action.error,
        loader: false
      };
      break;

    case GETPAGES:
      state = {
        ...state,
        pages: {},
        error: {},
        loader: true
      };
      break;

    case GETPAGES_SUCCESS:
      state = {
        ...state,
        pages: action.payload,
        error: {},
        loader: false
      };
      break;
    case GETPAGES_FAILURE:
      state = {
        ...state,
        pages: {},
        error: action.error,
        loader: false
      };
      break;
    default:
      break;
  }
  return state;
}
