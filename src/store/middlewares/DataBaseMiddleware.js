import { DataBaseAction } from "../actions";
import API from "../../config/api";

export default class DataBaseMiddleware {
  static GetTemplates(userId) {
    return dispatch => {
      // dispatch(AuthAction.GetTemplates());
      API.post("templates", {
       "user_id": userId
      })
        .then((result) => {
          dispatch(DataBaseAction.GetTemplatesSuccess(result.data.templates));
        })
        .catch((err) => {
          dispatch(DataBaseAction.GetTemplatesFailure(err));
        });
    };
  }

  static UploadTemplates(templateName, htmlContent, user_id) {
  return dispatch => {
    // dispatch(DataBaseAction.UploadTemplates());
    API.post("template", {
      "name":templateName,
      "html": htmlContent,
      "uploaded_by": user_id,
    })
      .then((result)=> {
        dispatch(this.GetTemplates(user_id))
        dispatch(DataBaseAction.UploadTemplatesSuccess(result))
        dispatch(this.GetPages(user_id))
      })
      .catch((err) => {
        dispatch(DataBaseAction.UploadTemplatesFailure(err));
      });
  };
}

static CloneTemplates(templateName,userId,template, html) {
  console.log({
    "name": templateName,
    "html" : html,
    "user" : userId,
    "template" : template.id
  })
  return dispatch => {
    API.post("page", {
        "name": templateName,
        "html" : html,
        "user" : userId,
        "template" : template.id
    })
    .then((result) => {
      console.log(result,"clone page")
    })
    .catch((err) =>{
      console.log(err)
    })
  }
}

static GetPages(userId){
  console.log(" Getting Pages through user id ===> ", userId);
  return dispatch => {
    API.post("pages",{
      "user_id": userId
    })
    .then((result)=>{
      console.log("Result from pages===> ",result)
      dispatch(DataBaseAction.GetPagesSuccess(result.data.pages));
    })
    .catch((err)=>{
      dispatch(DataBaseAction.GetPagesFailure(err))
      console.error(err)
    })
  }
}

static DeletePages(payload) {
  console.log("Page has been deleted...");
  return dispatch => {
    API.post("page/remove",{
      "page_id": "5e15c74f970b992c428c91de"
    }).then((success) => {
      console.log(success.message);
    }).catch((err)=> {
      console.error(err)
    })
  }
}

}