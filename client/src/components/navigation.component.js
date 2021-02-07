import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faBriefcase,
  faDesktop,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';

class Navigation extends Component {
  render() {
    const { authenticated } = this.props;

    const profile = authenticated && authenticated.username;

    return (
      authenticated && (
        <>
          <Navbar
            expand="lg"
            bg="primary"
            variant="dark"
            fixed="top"
            collapseOnSelect
          >
            <Navbar.Brand>
              <FontAwesomeIcon icon={faBriefcase} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
              <Nav>
                <Nav.Link
                  exact
                  as={NavLink}
                  to={`/profile/${profile}`}
                  eventKey="3"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                  {' '}
                  {profile}
                </Nav.Link>
                <Nav.Link
                  exact
                  as={NavLink}
                  to="/workspaces"
                  eventKey="1"
                >
                  <FontAwesomeIcon icon={faDesktop} />
                  {' '}
                  Workspaces
                </Nav.Link>
                <Nav.Link
                  exact
                  as={NavLink}
                  to="/bookings"
                  eventKey="2"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  {' '}
                  Bookings
                </Nav.Link>
              </Nav>
              <Nav.Item className="ml-auto">
                <Link to="/logout">
                  <Button variant="outline-light" size="sm">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    {' '}
                    Logout
                  </Button>
                </Link>
              </Nav.Item>
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

export default withRouter(connect(mapStateToProps, actions)(Navigation));
