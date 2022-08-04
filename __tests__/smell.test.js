const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('gets all smell', async () => {
    const resp = await request(app).get('/smells');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([ 
      {
        id: '1',
        name: 'garbage',
        description: 'disgusting'
      },
      {
        id: '2',
        name: 'trees',
        description: 'amazing'
      },
      {
        id: '3',
        name: 'boiled chicken',
        description: 'ew'
      }
    ]);
  });
  it('gets specific smell', async () => {
    const resp = await request(app).get('/smells/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'trees',
      description: 'amazing'
    });
  });
  it('makes new smell', async () => {
    const newSmell = {
      name: 'pitbull',
      description: 'musky'
    };
    const resp = await request(app).post('/smells').send(newSmell);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newSmell
    });
  });
  it('updates a smell', async () => {
    const resp = await request(app).put('/smells/1').send({
      name: 'the dump',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('the dump');
  });
  it('deletes a smell', async () => {
    const resp = await request(app).delete('/smells/1');
    expect(resp.status).toBe(200);

    const smellResp = await request(app).get('/smells/1');
    expect(smellResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
