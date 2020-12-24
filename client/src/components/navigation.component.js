import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faBriefcase,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      authenticated && (
        <>
          <Navbar expand="lg" bg="primary" variant="dark" sticky="top">
            <Navbar.Brand as={NavLink} to="/">
              <FontAwesomeIcon icon={faBriefcase} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
              <Nav>
                <Nav.Link as={NavLink} to="/rooms">
                  <FontAwesomeIcon icon={faDoorOpen} />
                  {' '}
                  Rooms
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/profile">
                  <FontAwesomeIcon icon={faUserCircle} />
                  {' '}
                  {authenticated.username || localStorage.getItem('user')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  {' '}
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
