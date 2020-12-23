import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import * as actions from '../../actions';

class Logout extends Component {
  componentDidMount() {
    const { logout, history } = this.props;
    logout();
    history.push('/login');
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default connect(null, actions)(Logout);
