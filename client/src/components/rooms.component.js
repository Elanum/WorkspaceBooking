import React, { Component } from 'react';
import RoomsService from '../services/rooms.service';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: undefined,
    };
  }

  componentDidMount() {
    RoomsService.getAllRooms()
      .then((response) => {
        this.setState({
          rooms: response.data,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { rooms } = this.state;

    if (!rooms) return <div>Loading...</div>;

    return (
      <div>
        <h2>Rooms:</h2>
        {rooms.map((room) => (
          <p key={room.roomId}>{room.name}</p>
        ))}
      </div>
    );
  }
}

export default Rooms;
