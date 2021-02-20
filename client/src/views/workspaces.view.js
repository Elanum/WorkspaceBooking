/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Badge, Card, Container, Col, Row, Form,
} from 'react-bootstrap';
import * as actions from '../actions';
import NewBooking from '../components/newbooking.component';

const today = new Date().toISOString().slice(0, 10);

class Workspaces extends Component {
  constructor(props) {
    super(props);
    this.getRooms = this.getRooms.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      rooms: [],
      date: today,
      room: 'All Rooms',
    };
  }

  componentDidMount() {
    const { getWorkspaces } = this.props;
    getWorkspaces(() => {
      const { workspaces } = this.props;
      this.getRooms(workspaces);
      this.setFilter();
    });
  }

  getRooms = (workspaces) => {
    const map = new Map();
    const rooms = [];
    workspaces.forEach((workspace) => {
      if (!map.has(workspace.room._id)) {
        map.set(workspace.room._id, true);
        rooms.push(workspace.room);
      }
    });
    rooms.sort((a, b) => (a.name < b.name ? -1 : 1));
    this.setState({ rooms });
  };

  setFilter = (event) => {
    const { workspaces, filterWorkspaces } = this.props;
    const room = event ? event.target.value : 'All Rooms';
    this.setState({ room });
    filterWorkspaces(workspaces, room);
  };

  render() {
    const { workspaces, errorMessage, filter } = this.props;
    const { rooms, date, room } = this.state;

    if (errorMessage) return <Container>{errorMessage}</Container>;
    if (!workspaces || !filter) return <Container>Loading...</Container>;

    return (
      <Container>
        <Row>
          <Col md>
            <Form.Group>
              <Form.Control as="select" onChange={this.setFilter}>
                <option>All Rooms</option>
                {rooms.length > 0
                  && rooms.map((r) => <option key={r._id}>{r.name}</option>)}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Control
                name="date"
                type="date"
                value={date}
                min={today}
                onChange={(event) => {
                  this.setState({ date: event.target.value });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Row>
          {filter.workspaces.map((workspace) => (
            <Col key={workspace._id} md="4" className="mb-3">
              <Card className="shadow">
                <Card.Header>{workspace.room.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{workspace.name}</Card.Title>
                  {workspace.bookings.length > 0
                  && workspace.bookings.filter((booking) => booking.date === date).length > 0 ? (
                      workspace.bookings
                        .filter((booking) => booking.date === date)
                        .map((booking) => (
                          <div key={booking._id}>
                            {booking.bookedState === 0 ? (
                              <Badge pill variant="info">
                                Free PM
                              </Badge>
                            ) : booking.bookedState === 1 ? (
                              <Badge pill variant="danger">
                                Occupied
                              </Badge>
                            ) : (
                              <Badge pill variant="warning">
                                Free AM
                              </Badge>
                            )}
                          </div>
                        ))
                    ) : (
                      <Badge pill variant="success">
                        Free
                      </Badge>
                    )}
                </Card.Body>
                <Card.Footer>
                  <NewBooking workspace={workspace} date={date} room={room} />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaces.workspaces,
    errorMessage: state.workspaces.errorMessage,
    filter: state.workspaces.filter,
  };
}

export default compose(connect(mapStateToProps, actions))(Workspaces);
