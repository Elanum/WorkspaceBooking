import mongoose from 'mongoose';
import Users from '../models/users.model';
import Rooms from '../models/rooms.model';
import Workspaces from '../models/workspaces.model';

const users = [
  {
    username: process.env.ADMIN_USER || 'admin',
    password: process.env.ADMIN_PWD || 'rootpwd',
    email: process.env.ADMIN_MAIL || 'admin@workspace-booking.de',
  },
];

const rooms = [
  {
    _id: mongoose.mongo.ObjectID(),
    name: 'Room A',
  },
  {
    _id: mongoose.mongo.ObjectID(),
    name: 'Room B',
  },
];

const addUsers = () => {
  Users.findOne().then(async (u) => {
    if (!u) {
      await Users.create(users, (error) => {
        if (error) throw error.message;
      });
    }
  });
};

const addRooms = () => {
  Rooms.findOne().then(async (r) => {
    if (!r) {
      await Rooms.create(rooms, (error) => {
        if (error) throw error.message;
      });
    }
  });
};

const addWorkspaces = () => {
  const workspaces = [];
  Workspaces.find().then(async (w) => {
    if (w.length < 1) {
      rooms.forEach((room) => {
        for (let i = 1; i < 5; i += 1) {
          workspaces.push({
            room: room._id,
            name: `Workspace ${room.name.split(' ').splice(-1)}-${i}`,
          });
        }
      });
      await Workspaces.create(workspaces, (error) => {
        if (error) throw error.message;
      });
    }
  });
};

addUsers();
addRooms();
addWorkspaces();
