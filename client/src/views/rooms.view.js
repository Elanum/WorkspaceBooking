import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import * as actions from '../actions';

class Rooms extends Component {
  componentDidMount() {
    const { getRooms } = this.props;
    getRooms();
  }

  render() {
    const { rooms, errorMessage } = this.props;

    if (errorMessage) return <Container>{errorMessage}</Container>;
    if (!rooms) return <Container>Loading...</Container>;

    return (
      <Container>
        <h2>Rooms:</h2>
        <Row>
          {rooms.map((room) => (
            <Col key={room._id} md="6" className="mb-3">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>
                    Workspaces:
                    {' '}
                    {room.workspaces.length}
                  </Card.Text>
                  <Card.Link>Details</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { rooms: state.rooms.rooms, errorMessage: state.rooms.errorMessage };
}

export default compose(connect(mapStateToProps, actions))(Rooms);
