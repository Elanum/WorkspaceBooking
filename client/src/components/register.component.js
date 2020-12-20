import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { connect } from 'react-redux';
import { register } from '../actions/auth';

const required = (value) => !value && <div>This field is required</div>;

const validEmail = (value) => !isEmail(value) && <div>This is not a valid email.</div>;

const validUsername = (value) => (value.length < 3 || value.length > 20) && (
<div>The username must be between 3 and 20 characters.</div>
);

const validPassword = (value) => (value.length < 6 || value.length > 40) && (
<div>The password must be between 6 and 40 characters.</div>
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      username: '',
      password: '',
      email: '',
      success: false,
    };
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      success: false,
    });

    this.form.validateAll();

    const { dispatch } = this.props;
    const { username, password, email } = this.state;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          this.setState({
            success: true,
          });
        })
        .catch(() => {
          this.setState({
            success: false,
          });
        });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    const { message } = this.props;
    const {
      username, password, email, success,
    } = this.state;

    return (
      <div>
        <Form
          onSubmit={this.handleRegister}
          ref={(c) => {
            this.form = c;
          }}
        >
          {success && (
            <>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={this.onChangeUsername}
                validations={[required, validUsername]}
              />
              <Input
                type="text"
                name="email"
                value={email}
                onChange={this.onChangeEmail}
                validations={[required, validEmail]}
              />
              <Input
                type="password"
                name="password"
                value={password}
                onChange={this.onChangePassword}
                validations={[required, validPassword]}
              />
              <button type="submit">Sign Up</button>
            </>
          )}
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
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
