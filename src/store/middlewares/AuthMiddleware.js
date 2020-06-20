import { AuthAction } from "../actions";
import API from "../../config/api";
import History from "../../config/history";

export default class AuthMiddleware {
  static SignUp(fullName, email, password, company) {
    
    return dispatch => {
      dispatch(AuthAction.Signup());

      API.post("user", {
        name: fullName,
        email: email,
        password: password,
        company: company
      })
        .then(succes => {
          dispatch(
            AuthAction.SignupSuccess({
              id: succes.data.user._id,
              name: succes.data.user.name,
              email: succes.data.user.email,
              comapny: succes.data.user.comapny,
              createdDate: succes.data.user.created_date
            })
          );
        })
        .catch(err => {
          dispatch(AuthAction.SignupFailure(err));
        });
    };
  }

  static AddCompany(companyName, reraNo, gstin, email, user_id) {    
    return dispatch => {
      dispatch(AuthAction.AddCompany());

      API.post("company", {
        "name": companyName,
        "rerano": reraNo,
        "gstin": gstin,
        "email": email
      })
        .then(result => {
          dispatch(
            AuthAction.AddCompanySuccess({
              name: result.data.company.name,
              rerano: result.data.company.rerano,
              gstin: result.data.company.gstin,
              email: result.data.company.email
            })
          );
          API.post("user/updateCompany", {
            "user_id": user_id,
            "company_id": result.data.company._id,
            "enabled": true
          }).then((res) => {
            console.log("Company updated successfully",res)
          }).catch((err)=> {
            console.log(err)
          })

          History.push("/login-page");
        })
    };
  }

  static SignIn(email, password) {
    return dispatch => {
      dispatch(AuthAction.Signin());

      API.post("user/login", {
        email: email,
        password: password
      })
        .then(result => {
          dispatch(
            AuthAction.SigninSuccess({
              id: result.data.user._id,
              name: result.data.user.name,
              email: result.data.user.email,
              createdDate: result.data.user.created_date
            }),
            localStorage.setItem('userId',result.data.user._id)

          );
          History.push("/admin/dashboard");
        })
        .catch(err => {
          dispatch(AuthAction.SigninFailure(err));
        });
    };
  }
}
