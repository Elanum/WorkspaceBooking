import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends Component {
  onSubmit = (props) => {
    const { login, history } = this.props;
    login(props, () => {
      history.push('/profile');
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <Field
            name="username"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="username"
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
            placeholder="password"
          />
        </fieldset>
        <div>{errorMessage}</div>
        <button type="submit">Sign In!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'login' }),
)(Login);
