import React, { Component } from 'react';
import {
  Alert, Card, Col, Container, Row, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import UsersService from '../services/users.service';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    UsersService.getUser(params.username)
      .then((response) => {
        const futureBookings = response.data.bookings.filter(
          (bookings) => new Date(bookings.date).getTime() > Date.now(),
        );
        response.data.bookings = futureBookings;
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
        });
      });
  }

  render() {
    const { user, error } = this.state;

    if (error) return <Container>{error.message}</Container>;
    if (!user) return <Container>Loading...</Container>;

    return (
      <Container>
        <Row>
          <Col md="4" className="mb-3">
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://placeimg.com/640/480/people"
              />
              <Card.Body>
                <Card.Title>
                  <strong>{user.username}</strong>
                </Card.Title>
                {(user.firstname || user.lastname) && (
                  <Card.Subtitle>
                    {user.firstname && (
                    <>
                      {user.firstname}
                      {' '}
                    </>
                    )}
                    {user.lastname && <>{user.lastname}</>}
                  </Card.Subtitle>
                )}
                <Card.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                  {' '}
                  {user.email}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Link>Edit</Card.Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="8">
            {user.bookings.length === 0 ? (
              <Alert variant="primary">Currently No Bookings</Alert>
            ) : (
              <Card>
                <Table hover striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Room</th>
                      <th>Workspace</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.workspace.room.name}</td>
                        <td>{booking.workspace.name}</td>
                        <td>{new Date(booking.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
