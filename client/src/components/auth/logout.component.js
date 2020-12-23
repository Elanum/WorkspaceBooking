import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends Component {
  componentDidMount() {
    const { logout, history } = this.props;
    logout();
    setTimeout(() => history.push('/login'), 3000);
  }

  render() {
    return <div>Bye!</div>;
  }
}

export default connect(null, actions)(Logout);
