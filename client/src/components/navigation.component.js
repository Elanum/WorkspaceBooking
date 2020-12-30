import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faBriefcase,
  faDoorOpen,
  faDesktop,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';

class Navigation extends Component {
  render() {
    const {
      authenticated,
      getUser,
      getAllRooms,
      getAllWorkspaces,
      getAllBookings,
    } = this.props;

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
                  onClick={() => getUser({ username: profile })}
                  eventKey="3"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                  {' '}
                  {profile}
                </Nav.Link>
                <Nav.Link
                  exact
                  as={NavLink}
                  to="/rooms"
                  onClick={() => getAllRooms()}
                  eventKey="0"
                >
                  <FontAwesomeIcon icon={faDoorOpen} />
                  {' '}
                  Rooms
                </Nav.Link>
                <Nav.Link
                  exact
                  as={NavLink}
                  to="/workspaces"
                  onClick={() => getAllWorkspaces()}
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
                  onClick={() => getAllBookings()}
                  eventKey="2"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  {' '}
                  Bookings
                </Nav.Link>
              </Nav>
              <Nav.Item className="ml-auto">
                <Link to="/logout">
                  <Button variant="outline-light">
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

export default connect(mapStateToProps, actions)(Navigation);
