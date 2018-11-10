import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/css/styles.css';
import './styles/css/bootstrap.min.css';
// import './styles/css/fontawesome.min.css';

import store from './store';
import PrivateRoute from '../src/components/shared/private-route';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Welcome from './components/auth/welcome';
import Verification from './components/auth/verify-account';
import Dashboard from './components/dashboard/dash';
import CreateProfile from './components/dashboard/create-profile';
import Settings from './components/dashboard/settings';

import setAuthToken from './utils/setAuthToken';
import { logOutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import RestaurantProfile from './components/public-restaurant/restaurant';
import NotFound from './components/shared/404';

if (localStorage.jwtToken) {
  //set header auth
  setAuthToken(localStorage.jwtToken);

  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(clearCurrentProfile());

  //check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    alert('Please Login again');
    store.dispatch(logOutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/welcome" component={Welcome} />
              <Route component={NotFound} />

              <Route path="/restaurant" component={RestaurantProfile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute
                path="/profile/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute path="/profile/settings" component={Settings} />
              {/* <Route
                exact
                path="/primary-user/accounts/verification/:activationcode"
                component={Verification}
              /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
