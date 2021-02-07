import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Users from '../src/models/users.model';
import Rooms from '../src/models/rooms.model';
import Workspaces from '../src/models/workspaces.model';

const dbConnection = 'mongodb://localhost:27017/';
const user = { username: 'user', password: 'password', email: 'user@test.com' };
const room = { _id: mongoose.mongo.ObjectID(), name: 'room' };
const workspace = { room: room._id, name: 'workspace' };
let token;

beforeAll(async (done) => {
  await mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'workspacesRoutes',
  });
  await new Users(user).save();
  await new Rooms(room).save();
  await new Workspaces(workspace).save();
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

describe('GET /api/workspaces', () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/workspaces')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an array', (done) => {
    request(app)
      .get('/api/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        done();
      });
  });
});

describe('POST /api/workspaces', () => {
  test('It should require authorization', (done) => {
    request(app)
      .post('/api/workspaces')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should insert a workspace', (done) => {
    request(app)
      .post('/api/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({ room: room._id, name: 'newWorkspace' })
      .expect(201)
      .then((response) => {
        const { body } = response;
        expect(body.name).toBe('newWorkspace');
        expect(typeof body.workspaceId).toBe('number');
        done();
      });
  });
});

describe('GET /api/workspaces/1', () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/workspaces/1')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an JSON Object', (done) => {
    request(app)
      .get('/api/workspaces/1')
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

  test('It shoud have the workspace data', (done) => {
    request(app)
      .get('/api/workspaces/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        const { body } = response;
        expect(body.name).toBe('workspace');
        expect(typeof body.workspaceId).toBe('number');
        done();
      });
  });
});
