import React, { Component } from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import RoomsService from '../services/rooms.service';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    RoomsService.getAllRooms()
      .then((response) => {
        this.setState({
          rooms: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
        });
      });
  }

  render() {
    const { rooms, error } = this.state;

    if (error) return <Container>{error.message}</Container>;
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

export default Rooms;
