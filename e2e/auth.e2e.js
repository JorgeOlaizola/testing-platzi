const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

const mockSendMail = jest.fn();

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockImplementation(() => {
      return {
        sendMail: mockSendMail,
      };
    }),
  };
});

describe('tests for /auth', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);

    await upSeed();
  });

  describe('POST /login', () => {
    test('Should return a 401 unauthorized when sending bad data', async () => {
      const inputData = {
        email: 'fakeemail@fake.com',
        password: '-----',
      };
      const { statusCode } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      expect(statusCode).toEqual(401);
    });

    test('Should return a 200', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData);
      expect(statusCode).toEqual(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(user.email);
      expect(body.user.password).toBeUndefined();
    });
  });

  describe('POST /recovery', () => {
    beforeAll(() => {
      mockSendMail.mockClear();
    });

    test('Should return 401 when sending an inexistent email', async () => {
      const inputData = {
        email: 'emailfake@gmail.com',
      };
      const { statusCode } = await api
        .post('/api/v1/auth/recovery')
        .send(inputData);
      expect(statusCode).toBe(401);
    });

    test('Should send recovery email', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
      };
      mockSendMail.mockResolvedValue(true);
      const { statusCode, body } = await api
        .post('/api/v1/auth/recovery')
        .send(inputData);
      expect(statusCode).toBe(200);
      expect(body.message).toEqual('mail sent');
      expect(mockSendMail).toHaveBeenCalled();
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
