import Room from '../models/rooms.model';

const rooms = [
  {
    name: 'Room A',
  },
  {
    name: 'Room B',
  },
];

const addRooms = () => {
  Room.findOne().then((room) => {
    if (!room) {
      rooms.forEach((element) => {
        const newRoom = new Room(element);
        newRoom.save();
      });
    }
  });
};

export default addRooms;
