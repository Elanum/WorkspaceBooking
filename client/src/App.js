import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

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
        <Menu fixed="top">
          <Menu.Item as={Link} to="/" header>
            Workspace Booking
          </Menu.Item>
          <Menu.Menu position="right">
            {currentUser ? (
              <>
                <Menu.Item as={Link} to="/profile">
                  <Icon name="user circle" />
                </Menu.Item>
                <Menu.Item as="a" onClick={this.logOut}>
                  <Icon name="sign out" />
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item as={Link} to="/register">
                  <Icon name="signup" />
                </Menu.Item>
                <Menu.Item as={Link} to="/login">
                  <Icon name="sign in" />
                </Menu.Item>
              </>
            )}
          </Menu.Menu>
        </Menu>
        <>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </>
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
