/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';

class Profile extends Component {
  componentDidMount() {
    const {
      getUser,
      match: { params },
    } = this.props;
    getUser(params);
  }

  render() {
    const { user, errorMessage } = this.props;

    if (errorMessage) return <Container>{errorMessage}</Container>;
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
                      <th>Date</th>
                      <th>Room</th>
                      <th>Workspace</th>
                      <th>Booked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                        <td>{booking.workspace.room.name}</td>
                        <td>{booking.workspace.name}</td>
                        <td>
                          {booking.bookedAM && booking.bookedPM ? (
                            <Badge pill variant="success">
                              DAY
                            </Badge>
                          ) : booking.bookedAM ? (
                            <Badge pill variant="primary">
                              AM
                            </Badge>
                          ) : (
                            <Badge pill variant="secondary">
                              PM
                            </Badge>
                          )}
                        </td>
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

function mapStateToProps(state) {
  return { user: state.users.user, errorMessage: state.users.errorMessage };
}

export default compose(connect(mapStateToProps, actions))(Profile);
