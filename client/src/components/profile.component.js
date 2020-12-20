import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    console.log(currentUser);

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Container text style={{ paddingTop: '7em' }}>
        <h3>
          <strong>{currentUser.username}</strong>
          {' '}
          Profile
        </h3>
        <p>
          <strong>Token:</strong>
        </p>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Profile));
