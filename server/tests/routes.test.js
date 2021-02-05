import request from 'supertest';
import app from '../src/app';
import mongoDB from '../src/config/mongoose.config';

const {
  ADMIN_USER = 'admin',
  ADMIN_PWD = 'rootpwd',
  ADMIN_MAIL = 'admin@workspace-booking.de',
} = process.env;

let token;

beforeAll((done) => {
  request(app)
    .post('/api/login')
    .send({
      username: ADMIN_USER,
      password: ADMIN_PWD,
      email: ADMIN_MAIL,
    })
    .end((error, response) => {
      if (error) return done(error);
      token = response.body.token;
      return done();
    });
});

describe('GET Users', () => {
  test('It should response an array', (done) => {
    request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        done();
      });
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });
});
