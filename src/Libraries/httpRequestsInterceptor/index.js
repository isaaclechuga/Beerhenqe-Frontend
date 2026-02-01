/*import fetchIntercept from "fetch-intercept";
import { showHideLoader } from "./utils";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../../React/constants";
import history from "../History";
import Login from "../Login/";

var reqsTotal = 0;
var reqsCompleted = 0;

function setComplete() {
  reqsTotal = 0;
  reqsCompleted = 0;
}
export const register = fetchIntercept.register({
  request: function (url, config) {
    reqsTotal++;
    showHideLoader(0);
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    //console.log("RESPONSE DESDE EL INTERCEPTOR", response);
    reqsCompleted++;
    if (reqsCompleted >= reqsTotal) {
      //debugger
      showHideLoader(1);
      setComplete();
    }
    //var decoded = decode(localStorage.getItem("Zermat.Token"), {complete: true});
    //console.log("DECODED", decoded)
    if (!response.ok && response.status >= 400 && response.status <= 600) {
      if (localStorage.getItem("Zermat.Token"))
        verify(
          localStorage.getItem("Zermat.Token"),
          SECRET_KEY,
          function (err, decoded) {
            if (err) {
              //Vaciar el localStorage y redireccionar al Login
              Login.logOut();
              localStorage.clear();
              history.push("/Login");
            } else {
              return Promise.reject(response);
            }
          }
        );
      else history.push("/Login");
    }
    return response;
  },

  responseError: function (error) {
    reqsCompleted++;
    if (reqsCompleted >= reqsTotal) {
      //debugger
      showHideLoader(1);
      setComplete();
    }
    // Handle an fetch error
    return Promise.reject(error);
  },
});

//// Call fetch to see your interceptors in action.
//fetch('http://google.com');

//// Unregister your interceptor
//register();

//Example
//import {register} from 'fetchIntercept'
*/
