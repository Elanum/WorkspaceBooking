import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';

import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';

import { logout } from './actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;

    return (
      <BrowserRouter>
        <div>
          <nav>
            <Link to="/">
              bezKoder
            </Link>
            <div>
              <li>
                <Link to="/home">
                  Home
                </Link>
              </li>

              {currentUser && (
                <li>
                  <Link to="/user">
                    {currentUser.username}
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div>
                <li>
                  <Link to="/profile">
                    {currentUser.username}
                  </Link>
                </li>
                <li>
                  <a href="/login" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div>
            <Switch>
              <Route exact path={['/', '/home']} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
