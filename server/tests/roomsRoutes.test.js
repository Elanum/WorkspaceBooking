import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Users from '../src/models/users.model';
import Rooms from '../src/models/rooms.model';

const dbConnection = 'mongodb://localhost:27017/';
const user = { username: 'user', password: 'password', email: 'user@test.com' };
const room = { name: 'room' };
let token;

beforeAll(async (done) => {
  await mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'roomsRoutes',
  });
  await new Users(user).save();
  await new Rooms(room).save();
  request(app)
    .post('/api/login')
    .send(user)
    .end((error, response) => {
      if (error) return done(error);
      token = response.body.token;
      return done();
    });
});

afterAll(async (done) => {
  await mongoose.connection.dropDatabase();
  mongoose.disconnect(done);
});

describe('GET /api/rooms', () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/rooms')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an array', (done) => {
    request(app)
      .get('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        done();
      });
  });
});

describe('GET /api/rooms/1', () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/rooms/1')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an JSON Object', (done) => {
    request(app)
      .get('/api/rooms/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const parseJSON = () => {
          const json = JSON.stringify(response.body);
          JSON.parse(json);
        };
        expect(parseJSON).not.toThrow();
        done();
      });
  });

  test('It shoud have the room data', (done) => {
    request(app)
      .get('/api/rooms/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        const { body } = response;
        expect(body.name).toBe('room');
        expect(typeof body.roomId).toBe('number');
        done();
      });
  });
});
