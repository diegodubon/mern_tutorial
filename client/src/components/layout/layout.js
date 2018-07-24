import React, { Component } from "react";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import NavBar from "./Navbar";
import Landing from "./Landing";
import Footer from "./Footer";
import Rtn from "../apps/Rtn";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { setCurrentUser, loginUser } from "../../actions/authActions";

if (localStorage.jwt_decode) {
  setAuthToken(localStorage.jwt_decode);
  //get user info
  const decoded = jwt_decode(localStorage.jwt_decode);
  store.dispatch(setCurrentUser(decoded));

  //check expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(loginUser());

    window.location.href = "/login";
  }
}
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      env: props.env
    };
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/rtn" component={Rtn} />
            </div>
            <Footer env={this.state.env} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Layout;
