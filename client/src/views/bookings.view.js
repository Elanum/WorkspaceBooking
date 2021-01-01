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
              <th>Room</th>
              <th>Workspace</th>
              <th>Booked AM</th>
              <th>Booked PM</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.workspace.room.name}</td>
                <td>{booking.workspace.name}</td>
                <td>{booking.bookedAM ? booking.bookedAM.username : '' }</td>
                <td>{booking.bookedPM ? booking.bookedPM.username : '' }</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
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
