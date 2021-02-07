import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Users from '../src/models/users.model';

const dbConnection = 'mongodb://localhost:27017/';
const user = { username: 'user', password: 'password', email: 'user@test.com' };
let token;

beforeAll(async (done) => {
  await mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'usersRoutes',
  });
  await new Users(user).save();
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

describe('GET /api/users', () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/users')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an array', (done) => {
    request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        done();
      });
  });
});

describe(`GET /api/users/${user.username}`, () => {
  test('It should require authorization', (done) => {
    request(app)
      .get('/api/users/user')
      .expect(401)
      .then(() => {
        done();
      });
  });

  test('It should response an JSON Object', (done) => {
    request(app)
      .get('/api/users/user')
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

  test('It shoud have the user data', (done) => {
    request(app)
      .get('/api/users/user')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        const { body } = response;
        expect(body.username).toBe('user');
        expect(body.email).toBe('user@test.com');
        expect(typeof body.userId).toBe('number');
        done();
      });
  });
});
