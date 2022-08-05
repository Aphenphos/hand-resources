const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('gets all people', async () => {
    const resp = await request(app).get('/peoples');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([ 
      {
        id: '1',
        name: 'William',
        age: '3'
      },
      {
        id: '2',
        name: 'Billiam',
        age: '4'
      },
      {
        id: '3',
        name: 'Cilliam',
        age: '5'
      }
    ]);
  });
  it('gets specific people', async () => {
    const resp = await request(app).get('/peoples/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Billiam',
      age: '4'
    });
  });
  it('makes new people', async () => {
    const newPeople = {
      name: 'Dilliam',
      age: '6'
    };
    const resp = await request(app).post('/peoples').send(newPeople);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPeople
    });
  });
  it('updates a people', async () => {
    const resp = await request(app).put('/peoples/1').send({
      name: 'Shmilliam',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Shmilliam');
  });
  it('deletes a people', async () => {
    const resp = await request(app).delete('/peoples/1');
    expect(resp.status).toBe(200);

    const peopleResp = await request(app).get('/peoples/1');
    expect(peopleResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
