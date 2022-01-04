import request from 'supertest';
import Url from './models/url';
import app from './app';

describe('GET /url/list', () => {
  beforeAll(() => {
    const dbRespose = [
      {
        _id: '5db9f32e367a343d30cd2a49',
        full: 'https://example.com',
        short: 'abcdef12',
        date: '2022-01-03T15:33:21.801',
        __v: 0,
      },
      {
        _id: '5dbff89109dee20b1a091e3c',
        full: 'https://example2.com',
        short: 'a1b2cdef',
        date: '2022-01-03T15:31:19.978',
        __v: 0,
      },
    ];
    Url.find = jest.fn().mockImplementationOnce(() => 
      ({ sort: jest.fn().mockResolvedValueOnce(dbRespose) }));
  });

  it('should respond with expected result (status, content type, data)', async () => {
    try {
      const response = await request(app).get('/url/list');
      const successResponse = {
        data: [
          {
            full: 'https://example.com',
            short: 'https://pbid.io/abcdef12',
          },
          {
            full: 'https://example2.com',
            short: 'https://pbid.io/a1b2cdef',
          },
        ],
        error: null as null,
        success: true,
      };

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toStrictEqual(successResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

describe('POST /url/add', () => {
  beforeAll(() => {
    const dbRespose = {
      _id: '5db9f32e367a343d30cd2a49',
      full: 'https://example.com',
      short: 'abcdef12',
      date: '2022-01-03T15:33:21.801',
      __v: 0,
    };
    Url.create = jest.fn().mockResolvedValueOnce(dbRespose);
  });

  it('should respond with expected result (status, content type, data)', async () => {
    try {
      const response = await request(app).post('/url/add').send({url: 'https://example.com'});
      const successResponse = {
        data: {
          full: 'https://example.com',
          short: 'https://pbid.io/abcdef12',
        },
        error: null as null,
        success: true,
      };

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toStrictEqual(successResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  it('should respond with 400 status and `invalid URL` message)', async () => {
    try {
      const response = await request(app).post('/url/add').send({url: 'example.com'});
      const failedResponse = {
        data: null as null,
        error: {
          message: 'Invalid URL',
          status: 400,
        },
        success: false,
      };

      expect(response.statusCode).toBe(400);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toStrictEqual(failedResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

describe('all the rest of routes (defaultController)', () => {
  it('`GET /` should respond with 404 status and `Resource not found` message)', async () => {
    try {
      const response = await request(app).get('/');
      const failedResponse = {
        data: null as null,
        error: {
          message: 'Resource not found',
          status: 404,
        },
        success: false,
      };

      expect(response.statusCode).toBe(404);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toStrictEqual(failedResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  });
  
  it('`POST /` should respond with 404 status and `Resource not found` message)', async () => {
    try {
      const response = await request(app).post('/');
      const failedResponse = {
        data: null as null,
        error: {
          message: 'Resource not found',
          status: 404,
        },
        success: false,
      };

      expect(response.statusCode).toBe(404);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toStrictEqual(failedResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  });
});
