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

export default class DataBaseAction {
  static GetTemplates() {
    return {
      type: GETTEMPLATES
    };
  }

  static GetTemplatesSuccess(payload) {
    return {
      type: GETTEMPLATES_SUCCESS,
      payload
    };
  }

  static GetTemplatesFailure(error) {
    return {
      type: GETTEMPLATES_FAILURE,
      error
    };
  }
  static UploadTemplates() {
    return {
      type: UPLOADTEMPLATES
    };
  }

  static UploadTemplatesSuccess(payload) {
    return {
      type: UPLOADTEMPLATES_SUCCESS,
      payload
    };
  }

  static UploadTemplatesFailure(error) {
    return {
      type: UPLOADTEMPLATES_FAILURE,
      error
    };
  }
  static GetPages(){
    return {
      type: GETPAGES
    };
  }

  static GetPagesSuccess(payload) {
    return {
      type: GETPAGES_SUCCESS,
      payload
    };
  }

  static GetPagesFailure(error) {
    return {
      type: GETPAGES_FAILURE,
      error
    }
  }
}
