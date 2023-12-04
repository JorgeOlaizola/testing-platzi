const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('tests for /users', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);

    await upSeed();
  });

  describe('GET /users', () => {});

  describe('GET /users/{id}', () => {
    test('Should return a user', async () => {
      const user = await models.User.findByPk('1');
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toBe(user.email);
    });
  });

  describe('POST /users', () => {
    test('Should return a 400 Bad Request when sending a wrong password', async () => {
      const inputData = {
        email: 'jorge@mail.com',
        password: '----',
      };
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });
    test('Should return a 400 Bad Request when sending a wrong email', async () => {
      const inputData = {
        email: '----',
        password: 'qwerty123',
      };
      const response = await api.post('/api/v1/users').send(inputData);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(/email/);
    });

    test('Should return a new user', async () => {
      const inputData = {
        email: 'pepito@mail.com',
        password: 'sofex1234',
      };
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      expect(statusCode).toEqual(201);
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual('admin');
      expect(user.email).toEqual(inputData.email);
    });
  });

  describe('PUT /users', () => {});

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
