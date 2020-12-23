import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      authenticated && (
        <Navbar expand="lg" bg="light" sticky="top">
          <Navbar.Brand as={NavLink} to="/">
            Workspace Booking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/profile">
                <FontAwesomeIcon icon={faUserCircle} />
                <span className="d-lg-none ml-2">{authenticated.username}</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className="d-lg-none ml-2">Logout</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
