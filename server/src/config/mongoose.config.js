import mongoose from 'mongoose';
import Users from '../models/users.model';
import Rooms from '../models/rooms.model';
import Workspaces from '../models/workspaces.model';

const {
  DB_URI,
  NODE_ENV,
  ADMIN_USER = 'admin',
  ADMIN_PWD = 'rootpwd',
  ADMIN_MAIL = 'admin@workspace-booking.de',
} = process.env;

const dbConnection = NODE_ENV === 'production' || NODE_ENV === 'staging'
  ? DB_URI
  : 'mongodb://localhost:27017/';

const dbName = NODE_ENV === 'production' ? 'workspace-booking' : 'workspace-booking-dev';

const users = [
  {
    username: ADMIN_USER,
    password: ADMIN_PWD,
    email: ADMIN_MAIL,
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

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName,
    });
  }
};

const disconnect = (done) => {
  if (mongoose.connection.readyState !== 0) {
    mongoose.disconnect(done);
  }
};

const initUsers = () => {
  Users.findOne().then(async (u) => {
    if (!u) {
      await Users.create(users, (error) => {
        if (error) throw error.message;
      });
    }
  });
};

const initRooms = () => {
  Rooms.findOne().then(async (r) => {
    if (!r) {
      await Rooms.create(rooms, (error) => {
        if (error) throw error.message;
      });
    }
  });
};

const initWorkspaces = () => {
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

const initData = () => {
  initUsers();
  initRooms();
  initWorkspaces();
};

export default {
  connect,
  disconnect,
  initData,
};
