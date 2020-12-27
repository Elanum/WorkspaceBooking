import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import * as actions from '../actions';

class Bookings extends Component {
  componentDidMount() {
    const { getAllBookings } = this.props;
    getAllBookings();
  }

  render() {
    const { bookings, errorMessage } = this.props;

    if (errorMessage) return <Container>{errorMessage}</Container>;
    if (!bookings) return <Container>Loading...</Container>;

    return (
      <Container>
        <Table striped hover bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Workspace</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.bookingId}</td>
                <td>{booking.workspace.room.name}</td>
                <td>{booking.workspace.name}</td>
                <td>{booking.user.username}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookings: state.bookings.bookings,
    errorMessage: state.bookings.errorMessage,
  };
}

export default compose(connect(mapStateToProps, actions))(Bookings);
