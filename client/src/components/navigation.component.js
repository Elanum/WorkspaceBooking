import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
  renderLinks() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <div>
          <Link to="/logout">Logout</Link>
          <Link to="/profile">Profile</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <Link to="/">Redux Auth</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
