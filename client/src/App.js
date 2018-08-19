import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, loginUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Rtn from "./components/apps/Rtn";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profiles from "./components/profiles/Profiles";

import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import "./App.css";

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	//get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	//check expired token

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(loginUser());
		store.dispatch(clearCurrentProfile());
		window.location.href = "/login";
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<NavBar />

						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
							<Switch>
								<PrivateRoute
									exact
									path="/dashboard"
									component={Dashboard}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/add-experience"
									component={AddExperience}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									exact
									path="/add-education"
									component={AddEducation}
								/>
							</Switch>
							<Route exact path="/rtn" component={Rtn} />
						</div>

						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
