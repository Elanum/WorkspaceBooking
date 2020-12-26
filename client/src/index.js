/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import PrivateRoute from './auth.route';
import reducers from './reducers';
import App from './components/app.component';
import Home from './components/home.component';
import Login from './components/auth/login.component';
import Logout from './components/auth/logout.component';
import Profile from './components/profile.component';
import Rooms from './components/rooms.component';
import Workspaces from './components/workspaces.component';
import Bookings from './components/bookings.component';
import NotFound from './components/notfound.component';

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token') } },
  applyMiddleware(reduxThunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/profile/:username" component={Profile} />
          <PrivateRoute exact path="/rooms" component={Rooms} />
          <PrivateRoute exact path="/workspaces" component={Workspaces} />
          <PrivateRoute exact path="/bookings" component={Bookings} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
