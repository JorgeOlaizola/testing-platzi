const request = require('supertest');
const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(9000);
    api = request(app);
  });

  test('GET /', async () => {
    const response = await api.get('/');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hola mi server en express');
    // expect(response.headers['content-type']).toMatch(/json/);
  });

  describe('GET /nueva-ruta', () => {
    test('Should return 401 when not sending api key', async () => {
      const { statusCode } = await api.get('/nueva-ruta');
      expect(statusCode).toEqual(401);
    });

    test('Should return 401 when apikey isnt valid', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({ api: '1212' });
      expect(statusCode).toEqual(401);
    });

    test('Should return 200 when apikey is valid', async () => {
      const { statusCode } = await api
        .get('/nueva-ruta')
        .set({ api: config.apiKey });
      expect(statusCode).toEqual(200);
    });
  });

  afterAll(() => {
    server.close();
  });
});
