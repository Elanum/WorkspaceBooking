import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { connect } from 'react-redux';
import { login } from '../actions/auth';

const required = (value) => !value && <div>This field is Required</div>;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;
    const { username, password } = this.state;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          history.push('/profile');
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

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    const { isLoggedIn, message } = this.props;
    const { username, password, loading } = this.state;

    if (isLoggedIn) return <Redirect to="/profile" />;

    return (
      <div>
        <Form
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c;
          }}
        >
          <Input
            type="text"
            name="username"
            value={username}
            onChange={this.onChangeUsername}
            validations={[required]}
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.onChangePassword}
            validations={[required]}
          />
          <button disabled={loading} type="submit">
            {loading && <span>Loading...</span>}
            <span>Login</span>
          </button>
          {message && <div>{message}</div>}
          <CheckButton
            style={{ display: 'none' }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
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

export default connect(mapStateToProps)(Login);
