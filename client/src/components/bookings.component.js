import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import BookingsService from '../services/bookings.service';

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    BookingsService.getAllBookings()
      .then((response) => {
        this.setState({
          bookings: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
        });
      });
  }

  render() {
    const { bookings, error } = this.state;

    if (error) return <Container>{error.message}</Container>;
    if (!bookings) return <Container>Loading...</Container>;

    // TODO: Filter Option
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
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.bookingId}</td>
                <td>{booking.workspace.room.name}</td>
                <td>{booking.workspace.name}</td>
                <td>{booking.user.username}</td>
                <td>{new Date(booking.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Bookings;
