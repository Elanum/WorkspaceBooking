/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import reducers from './reducers';
import PrivateRoute from './auth.route';
import App from './components/app.component';
import Login from './views/login.view';
import Logout from './components/logout.component';
import Profile from './views/profile.view';
import Rooms from './views/rooms.view';
import Workspaces from './views/workspaces.view';
import Bookings from './views/bookings.view';
import NotFound from './views/notfound.view';

const user = JSON.parse(localStorage.getItem('user'));

const store = createStore(
  reducers,
  { auth: { authenticated: user } },
  applyMiddleware(reduxThunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <PrivateRoute exact path="/profile/:username" component={Profile} />
          <PrivateRoute exact path="/rooms" component={Rooms} />
          <PrivateRoute exact path="/workspaces" component={Workspaces} />
          <PrivateRoute exact path="/bookings" component={Bookings} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Redirect
            exact
            from="/"
            to={user ? `/profile/${user.username}` : '/login'}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
