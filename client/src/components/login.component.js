import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
      errors: [],
    };
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;
    const { username, password } = this.state;
    const errors = [];

    if (username.length === 0) errors.push('username');
    if (password.length === 0) errors.push('password');

    this.setState({
      errors,
    });

    if (errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;
    this.setState(obj);
  }

  hasError(key) {
    const { errors } = this.state;
    return errors.indexOf(key) !== -1;
  }

  render() {
    const { isLoggedIn, message } = this.props;
    const { username, password, loading } = this.state;

    if (isLoggedIn) return <Redirect to="/profile" />;

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Login to your Account
          </Header>
          <Form size="large" onSubmit={this.handleLogin}>
            <Segment>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleInputChange}
                value={username}
                error={
                  this.hasError('username') && { content: 'Username required' }
                }
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleInputChange}
                value={password}
                error={
                  this.hasError('password') && { content: 'Password required' }
                }
              />
              <Form.Button
                fluid
                color="teal"
                size="large"
                type="submit"
                loading={loading}
              >
                Login
              </Form.Button>
            </Segment>
          </Form>
          {message && <Message error>{message}</Message>}
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
