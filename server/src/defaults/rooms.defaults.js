import Room from '../models/rooms.model';

const rooms = [
  {
    name: 'Room A',
  },
  {
    name: 'Room B',
  },
];

Room.findOne().then((room) => {
  if (!room) {
    rooms.forEach((element) => {
      const newRoom = new Room(element);
      newRoom.save();
    });
  }
});
